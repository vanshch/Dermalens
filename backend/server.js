import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import testRoutes from "./routes/testRoutes.js";
// import autherizer from './middlewares/autherizer.js';
import { verifyToken } from "./middlewares/autherizer.js";

// Environment Configuration
dotenv.config({
  path: "./config.env",
});

// Express App Setup
const app = express();
app.use(express.json());
app.use(cors());

// Rate Limiter Configurations
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 50, // start blocking after 5 requests
  message:
    "Too many login attempts from this IP, please try again after an hour",
});

// Apply rate limiters
app.use(globalLimiter); // Global rate limiting
app.use("/api/auth", authLimiter); // Specific limiter for auth routes

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes); // TODO: Add autherizer middleware
app.use("/api/test", testRoutes);


// Base Route
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
