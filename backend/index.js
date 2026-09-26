const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

const app = express();

// Ensure DB connection for every serverless function request
app.use(async (req, res, next) => {
  try {
    await connectDb();
  } catch (err) {
    console.error("DB connection error:", err);
  }
  next();
});

// Configure permissive CORS for Vercel production deployment
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