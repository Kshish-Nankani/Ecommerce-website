const mongoose = require("mongoose");
const ensureSeeded = require("../utils/autoSeed");

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI environment variable is missing.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    await ensureSeeded();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDb;