import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
