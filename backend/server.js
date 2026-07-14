import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { verifyToken } from "./middlewares/autherizer.js";

// Environment Configuration
dotenv.config({
  path: "./config.env",
});

// Add security checks
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables");
  process.exit(1);
}

// Express App Setup
const app = express();
app.use(express.json());
app.use(cors());

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

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    console.log("MongoDB URI:", process.env.MONGO_URI); // Output the URI
  } catch (error) {
    console.error("the process env is ", process.env.MONGO_URI);
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes); // TODO: Add autherizer middleware
app.use("/api/test", testRoutes);
app.use("/api/appointment", appointmentRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
