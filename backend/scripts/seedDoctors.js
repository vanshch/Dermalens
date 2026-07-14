import mongoose from "mongoose";
import dotenv from "dotenv";
import { doctors } from "../doctors.js"; // Corrected path
import Doctor from "../models/doctor.js";

const Mongo_uri =
  "mongodb+srv://Dermalens_admin:DermalensAdmin@vansh.1syrp.mongodb.net/?retryWrites=true&w=majority&appName=vansh";
// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(Mongo_uri);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
};

// Seed doctors data
const seedDoctors = async () => {
  try {
    // Delete existing doctors
    await Doctor.deleteMany({});
    console.log("Deleted existing doctors");

    // Insert new doctors
    for (const doctorData of doctors) {
      try {
        // Attempt to insert the doctor
        await Doctor.create(doctorData);
        console.log(`Successfully inserted doctor: ${doctorData.email}`);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error, update the existing document
          await Doctor.updateOne({ email: doctorData.email }, doctorData);
          console.log(`Successfully updated doctor: ${doctorData.email}`);
        } else {
          // Other error, log it
          console.error(`Error seeding doctor ${doctorData.email}:`, error);
          return false; // Stop seeding if there's an error
        }
      }
    }

    console.log(`Successfully seeded doctors`);
    return true;
  } catch (error) {
    console.error("Error seeding doctors:", error);
    return false;
  }
};

// Main function
const main = async () => {
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }

  const seeded = await seedDoctors();
  if (seeded) {
    console.log("Database seeded successfully");
  } else {
    console.log("Failed to seed database");
  }

  // Disconnect from MongoDB
  await mongoose.disconnect();
  process.exit(0);
};

// Run the script
main();
