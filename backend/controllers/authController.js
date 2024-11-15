import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import db from "../config/db.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import Token from "../models/token.js";
import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
const dbURI = process.env.MONGO_URI;
// mongoose
//   .connect(dbURI)

//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));
// console.log(dbURI);
// console.log(`userCollection: ${userCollection}`);

const secret_key = ".env_to_be_added";
const authController = {
  login: async (req, res) => {
    try {
      console.log("login route hit");
      // Validate input
      const { email, password } = req.body;
      if (
        !email ||
        !password ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        console.log("here");
        return res.status(400).json({ message: "Invalid input format" });
      }

      // Sanitize email (convert to lowercase and trim)
      const sanitizedEmail = email.toLowerCase().trim();

      const user = await User.findOne({ email: sanitizedEmail });
      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }

      // Compare passwords using bcrypt
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      // const isValidPassword = req.body.password == user.password;
      // console.log(req.body.password);
      // console.log(user.password);
      // console.log(isValidPassword);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
        },
        secret_key
      );

      // Return token in the expected format
      res.json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (
        !name ||
        !email ||
        !password ||
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        return res.status(400).json({ message: "Invalid input format" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Sanitize inputs
      const sanitizedName = name.trim();
      const sanitizedEmail = email.toLowerCase().trim();

      // Check if user already exists with sanitized email
      const existingUser = await User.findOne({ email: sanitizedEmail });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with hashed password
      const newUser = new User({
        name: sanitizedName,
        email: sanitizedEmail,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  },
};

export default authController;
