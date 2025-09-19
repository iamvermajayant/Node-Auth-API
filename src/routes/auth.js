// src/routes/auth.js
import express from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  me,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user and send verification email
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   GET /api/auth/verify/:token
 * @desc    Verify user email
 * @access  Public
 */
router.get("/verify/:token", verifyEmail);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/forgot
 * @desc    Send password reset link to email
 * @access  Public
 */
router.post("/forgot", forgotPassword);

/**
 * @route   POST /api/auth/reset/:token
 * @desc    Reset password using reset token
 * @access  Public
 */
router.post("/reset/:token", resetPassword);

/**
 * @route   GET /api/auth/me
 * @desc    Get logged in user profile
 * @access  Private (requires JWT)
 */
router.get("/me", protect, me);

export default router;
