import express from "express";
import {
  signin,
  signup,
  google,
  signOut,
} from "../controllers/auth.controller.js";
import signupValidation from "../middlewares/validation-middleware.js";
import rateLimitMiddleware from "../middlewares/ratelimit.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send("Auth Test route working");
});
router.post("/signup", rateLimitMiddleware, signupValidation, signup);
router.post("/signin", rateLimitMiddleware, signin);
router.post("/google", rateLimitMiddleware, google);
router.get("/signout", rateLimitMiddleware, signOut);
export default router;
