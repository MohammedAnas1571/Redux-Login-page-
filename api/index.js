import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './Router/userRouter.js';
import authRouter from './Router/authRouter.js';

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error(error.message));

// Middleware
app.use(express.json());

// CORS Configuration
app.use(cors({
  origin: process.env.ORIGIN ,
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use("/", userRoutes);
app.use("/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    message,
    success: false,
    statusCode
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
