import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Environment Configuration
dotenv.config({
  path: "./config.env",
});

// Add security checks
if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  console.error("JWT_SECRET and MONGO_URI must be set in backend/config.env");
  process.exit(1);
}

// Express App Setup
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

// Add security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Rate Limiter Configurations
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 50, // start blocking after 5 requests
  message: {
    message:
      "Too many login attempts from this IP, please try again after an hour",
  },
});

// Apply rate limiters
app.use(globalLimiter); // Global rate limiting
app.use("/api/auth", authLimiter); // Specific limiter for auth routes

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/appointment", appointmentRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Centralized error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null
  });
});

// Start serving once MongoDB is ready.
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}

const port = Number(process.env.PORT || 5000);
const server = app.listen(port, process.env.HOST, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});

export default server;
