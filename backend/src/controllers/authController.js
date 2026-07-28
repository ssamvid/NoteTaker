import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as UserModel from "../models/userModel.js";
import { sendPasswordResetEmail } from "../services/mailService.js";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function signToken(user) {
  return jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.createUser({ name, email, password: passwordHash });

    const token = signToken(user);
    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "This account has been disabled." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login." });
  }
}

export async function me(req, res) {
  return res.status(200).json({ user: req.user });
}

export async function forgotPassword(req, res) {
  const genericResponse = {
    message: "If an account with that email exists, we've sent a reset link.",
  };

  try {
    const { email } = req.body;
    const user = await UserModel.findByEmail(email);

    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(rawToken);
      const expires = new Date(Date.now() + RESET_TOKEN_TTL_MS);

      await UserModel.setResetToken(user._id, tokenHash, expires);

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
      await sendPasswordResetEmail(user.email, resetLink);
    }

    return res.status(200).json(genericResponse);
  } catch (error) {
    // Still return the generic response so we never leak whether the email
    // exists or reveal that mail delivery failed.
    return res.status(200).json(genericResponse);
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    const tokenHash = hashToken(token);

    const user = await UserModel.findByResetTokenHash(tokenHash);
    if (!user) {
      return res.status(400).json({ message: "This reset link is invalid or has expired." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await UserModel.resetPassword(user._id, passwordHash);

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reset password." });
  }
}
