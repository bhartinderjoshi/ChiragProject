import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/ConnectDB.js";
import userRouter from "./user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
ConnectDB();

// API routes
app.use("/", userRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
