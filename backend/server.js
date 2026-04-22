import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";









dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});