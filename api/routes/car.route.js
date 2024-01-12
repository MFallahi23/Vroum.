import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createCar,
  deleteCar,
  getCar,
  getCars,
  updateCar,
} from "../controllers/car.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createCar);
router.get("/get", getCars);
router.delete("/delete/:id", verifyToken, deleteCar);
router.post("/update/:id", verifyToken, updateCar);
router.get("/:id", getCar);

export default router;
