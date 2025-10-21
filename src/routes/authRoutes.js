import express from "express";
import { loginUser, logoutUser, getDashboard, registerUser, getMe } from "../controllers/authController.js";
import verifyJWT from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/login", loginLimiter, loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", verifyJWT, getDashboard);
router.post('/register', registerUser);
router.get("/me", verifyJWT, getMe);

export default router;
