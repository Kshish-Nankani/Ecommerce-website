const mongoose = require("mongoose");
const ensureSeeded = require("../utils/autoSeed");

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn("MONGO_URI environment variable is missing.");
    return;
  }
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
    await ensureSeeded();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDb;