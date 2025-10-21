import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import pool from "../config/db.js"

export default async function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Cek apakah token masih valid di DB
    const [rows] = await pool.query("SELECT * FROM sessions WHERE token = ?", [token]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(403).json({ message: "Token tidak valid" });
  }
}
