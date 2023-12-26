// Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

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

// routes
app.use("/api/auth", authRouter);

// App listening to the port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
