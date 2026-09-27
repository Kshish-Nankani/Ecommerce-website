const mongoose = require("mongoose");
const ensureSeeded = require("../utils/autoSeed");

const FALLBACK_URI = "mongodb+srv://shopnestUser:ShopNest12345@cluster0.ihfa08c.mongodb.net/shopnest?retryWrites=true&w=majority";

let isConnecting = false;

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  if (mongoose.connection.readyState === 2 || isConnecting) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (mongoose.connection.readyState === 1) return;
  }

  let mongoUri = process.env.MONGO_URI || FALLBACK_URI;

  // Auto-correct invalid cluster hostname z2g3w to active cluster ihfa08c
  if (mongoUri.includes("z2g3w")) {
    console.log("Auto-correcting invalid cluster hostname z2g3w -> ihfa08c");
    mongoUri = mongoUri.replace("z2g3w", "ihfa08c");
  }

  try {
    isConnecting = true;
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    isConnecting = false;
    console.log("MongoDB connected successfully");
    await ensureSeeded();
  } catch (error) {
    isConnecting = false;
    console.error("Primary MongoDB connection error:", error.message);

    // Fallback to active cluster URI if primary failed
    if (mongoUri !== FALLBACK_URI) {
      try {
        console.log("Attempting fallback connection to active MongoDB cluster...");
        await mongoose.connect(FALLBACK_URI, {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
        });
        console.log("Fallback MongoDB connected successfully");
        await ensureSeeded();
        return;
      } catch (fallbackErr) {
        console.error("Fallback MongoDB connection error:", fallbackErr.message);
        throw fallbackErr;
      }
    }
    throw error;
  }
};

module.exports = connectDb;