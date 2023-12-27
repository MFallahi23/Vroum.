import rateLimit from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  message: "You have exceeded your 100 requests per 24 hrs limit.",
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimitMiddleware;
