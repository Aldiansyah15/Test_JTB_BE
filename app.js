import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5500", // URL frontend kamu (Vite default)
  credentials: true
}));
app.use("/api", authRoutes);

app.get("/", (req, res) => res.send("API is running 🚀"));

export default app;
