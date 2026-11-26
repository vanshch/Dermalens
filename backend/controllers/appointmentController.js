import Appointment from "../models/appointment.js";
import { v4 as uuidv4 } from "uuid";
import Doctor from "../models/doctor.js";
import nodemailer from "nodemailer";

console.log("Appointment controller loaded");

// Send email function
const sendAppointmentEmail = async (recipient, subject, htmlContent) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Email notification skipped: email credentials are not configured");
      return false;
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"DermaLens" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

function parseAppointmentDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

const appointmentController = {
  create_appointment: async (req, res) => {
    console.log("→ Inside create_appointment controller");

    try {
      const {
        specialization,
        doctorId,
        appointmentDate,
        appointmentTime,
        symptoms,
        previousMedication,
        userId,
      } = req.body;

      const date = parseAppointmentDate(appointmentDate);
      if (!date) {
        return res.status(400).json({
          success: false,
          data: null,
          message: "Choose a valid appointment date in YYYY-MM-DD format.",
        });
      }

      // Create a unique appointment number
      const appointmentNumber = uuidv4().substring(0, 8).toUpperCase();

      // Function to sanitize the doctorId
      const sanitizeDoctorId = (doctorId) => {
        return doctorId.replace("^", "");
      };

      const sanitizedDoctorId = sanitizeDoctorId(doctorId);

      // Sanitize userId
      const sanitizeUserId = (userId) => {
        return userId.replace("^", "");
      };

      const sanitizedUserId = sanitizeUserId(userId);

      // Find the doctor by email
      const doctor = await Doctor.findOne({ email: sanitizedDoctorId });

      if (!doctor) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "Doctor not found with the provided email",
        });
      }

      // Use the doctor's _id from the found doctor object
      const validDoctorId = doctor._id;

      // Create appointment with userId from request body
      const newAppointment = new Appointment({
        appointmentNumber,
        userId: sanitizedUserId || "user@example.com", // Use email as userId
        doctorId: validDoctorId,
        specialization,
        date,
        appointmentTime,
        symptoms,
        previousMedication,
        status: "Pending",
      });

      await newAppointment.save();

      // Send email to doctor
      const doctorEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">New Appointment Request</h2>
          <p>Dear Dr. ${doctor.name},</p>
          <p>You have a new appointment request with the following details:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Appointment Number:</strong> ${appointmentNumber}</p>
            <p><strong>Patient:</strong> ${userId}</p>
            <p><strong>Specialization:</strong> ${specialization}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            <p><strong>Symptoms:</strong> ${symptoms}</p>
            <p><strong>Previous Medication:</strong> ${
              previousMedication || "None"
            }</p>
          </div>
          <p>Please log in to your DermaLens account to accept or reschedule this appointment.</p>
          <p>Thank you,<br>DermaLens Team</p>
        </div>
      `;

      // Send email to patient
      const patientEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">Appointment Confirmation</h2>
          <p>Dear Patient,</p>
          <p>Your appointment has been scheduled successfully. Here are the details:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Appointment Number:</strong> ${appointmentNumber}</p>
            <p><strong>Doctor:</strong> Dr. ${doctor.name}</p>
            <p><strong>Specialization:</strong> ${specialization}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
          </div>
          <p>Your appointment is currently pending confirmation from the doctor. You will receive another email once the doctor confirms the appointment.</p>
          <p>Thank you for choosing DermaLens for your healthcare needs.</p>
          <p>Best regards,<br>DermaLens Team</p>
        </div>
      `;

      // Send emails asynchronously
      sendAppointmentEmail(
        doctor.email,
        "New Appointment Request",
        doctorEmailHtml
      );
      sendAppointmentEmail(
        sanitizedUserId,
        "Appointment Confirmation",
        patientEmailHtml
      );

      res.status(201).json({
        success: true,
        data: { appointmentNumber, appointmentDate },
        message: "Appointment created successfully",
      });
    } catch (error) {
      console.error("→ ERROR in create_appointment:", error);
      res.status(500).json({
        success: false,
        data: null,
        message: "Failed to create appointment",
      });
    }
  },
};

export default appointmentController;
