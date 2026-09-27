const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDb = require("./config/db");

dotenv.config();

const app = express();

// Configure permissive CORS for Vercel deployment
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("AR SUNTECH Backend API is working properly");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

// Healthcheck route to diagnose environment variables & DB connection live on Vercel
app.get("/api/health", async (req, res) => {
  let dbError = null;
  try {
    await connectDb();
  } catch (err) {
    dbError = err.message;
  }
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbState = mongoose.connection.readyState;
  res.json({
    status: dbState === 1 ? "ok" : "error",
    hasMongoUri: Boolean(process.env.MONGO_URI),
    databaseState: states[dbState] || dbState,
    dbError: dbError,
    nodeEnv: process.env.NODE_ENV || "not_set"
  });
});

// DB Connection Middleware for API routes
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    console.error("DB Middleware Error:", err.message);
    return res.status(500).json({
      message: `Database Connection Error: ${err.message}. Please check MONGO_URI in Vercel settings.`
    });
  }
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes.js"));
app.use("/api/payment", require("./routes/paymentRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes.js"));

if (process.env.NODE_ENV !== "production" || require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;