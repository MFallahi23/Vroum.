import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send("User Test route working");
});

export default router;
