import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      // Changed to email string
      type: String,
      required: true,
    },
    doctorId: {
      // Changed to ObjectId and reference the Doctor model
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference the Doctor model
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    previousMedication: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    analysis: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
