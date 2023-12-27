import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import signupValidation from "../middlewares/validation-middleware.js";
import rateLimitMiddleware from "../middlewares/ratelimit.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send("Auth Test route working");
});
router.post("/signup", rateLimitMiddleware, signupValidation, signup);
router.post("/signin", rateLimitMiddleware, signupValidation, signin);
export default router;
