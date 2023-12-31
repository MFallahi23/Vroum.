import express from "express";
import rateLimitMiddleware from "../middlewares/ratelimit.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send("User Test route working");
});
router.post("/update/:id", rateLimitMiddleware, verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
