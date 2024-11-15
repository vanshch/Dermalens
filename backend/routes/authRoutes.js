import express from "express";
import rateLimit from 'express-rate-limit';
import authController from "../controllers/authController.js";

const router = express.Router();

// Specific limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again after 15 minutes'
});

// Specific limiter for registration
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 registration attempts per hour
  message: 'Too many registration attempts, please try again after an hour'
});

router.post("/login", loginLimiter, authController.login);
router.post("/register", registerLimiter, authController.register);

export default router;