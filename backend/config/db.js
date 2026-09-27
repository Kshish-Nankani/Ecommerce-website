const mongoose = require("mongoose");
const ensureSeeded = require("../utils/autoSeed");

let isConnecting = false;

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  if (mongoose.connection.readyState === 2 || isConnecting) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (mongoose.connection.readyState === 1) return;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is missing on Vercel!");
  }

  try {
    isConnecting = true;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    isConnecting = false;
    console.log("MongoDB connected successfully");
    await ensureSeeded();
  } catch (error) {
    isConnecting = false;
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDb;