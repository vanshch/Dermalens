import express from "express";
// import { verifyToken } from "../middlewares/autherizer.js";

const router = express.Router();

// Import controller
import appointmentController from "../controllers/appointmentController.js";

console.log("Appointment routes loaded");

// Create appointment route with authentication
router.post("/create", (req, res, next) => {
  console.log("→ Appointment create route hit");
  next();
}, appointmentController.create_appointment);

export default router;

