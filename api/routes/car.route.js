import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createCar,
  deleteCar,
  getCar,
  updateCar,
} from "../controllers/car.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createCar);
router.delete("/delete", verifyToken, deleteCar);
router.post("/update", verifyToken, updateCar);
router.get("/:id", getCar);

export default router;
