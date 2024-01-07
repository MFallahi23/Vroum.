// Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import carRouter from "./routes/car.route.js";

dotenv.config();

// Connecting to the DataBase (mongoDb) with mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });
// App
const app = express();

// MiddleWare
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/car", carRouter);
// Error handling middleware
app.use((err, data, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const dataError = data || "";
  res.status(statusCode).json({
    success: false,
    message,
    dataError,
  });
});
// App listening to the port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
