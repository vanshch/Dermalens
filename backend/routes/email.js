import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Configure nodemailer with specific credentials
console.log("here")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vchauhan_be23@thapar.edu",
    pass: "Tell my name",
  },
});

// Email sending route
router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
