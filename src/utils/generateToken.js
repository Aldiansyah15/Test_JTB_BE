import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
};
