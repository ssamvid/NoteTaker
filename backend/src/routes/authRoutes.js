import express from "express";
import * as AuthController from "../controllers/authController.js";
import { registerRules, loginRules, handleAuthValidation } from "../validator/authValidator.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/api/auth/register", registerRules, handleAuthValidation, AuthController.register);
router.post("/api/auth/login", loginRules, handleAuthValidation, AuthController.login);
router.get("/api/auth/me", requireAuth, AuthController.me);

export default router;
