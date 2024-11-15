import mongoose from "mongoose";

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected1"))
  .catch((err) => console.log("MongoDB connection error", err));
