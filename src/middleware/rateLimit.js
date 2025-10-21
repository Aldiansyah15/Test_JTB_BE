import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 5,
  message: { message: "Terlalu banyak percobaan login, coba lagi nanti." },
  standardHeaders: true,
  legacyHeaders: false,
});
