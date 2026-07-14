import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  credentials: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: [String],
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
