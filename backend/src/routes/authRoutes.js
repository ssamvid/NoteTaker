import express from "express";
import * as AuthController from "../controllers/authController.js";
import {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  handleAuthValidation,
} from "../validator/authValidator.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/api/auth/register", registerRules, handleAuthValidation, AuthController.register);
router.post("/api/auth/login", loginRules, handleAuthValidation, AuthController.login);
router.get("/api/auth/me", requireAuth, AuthController.me);
router.post(
  "/api/auth/forgot-password",
  forgotPasswordRules,
  handleAuthValidation,
  AuthController.forgotPassword,
);
router.post(
  "/api/auth/reset-password",
  resetPasswordRules,
  handleAuthValidation,
  AuthController.resetPassword,
);

export default router;
