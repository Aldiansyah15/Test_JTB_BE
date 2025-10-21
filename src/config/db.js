// config/db.js
import mysql from "mysql2/promise";
import { config } from "./config.js";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

try {
  const connection = await pool.getConnection();
  console.log("✅ Connected to MySQL");
  connection.release();
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
}

export default pool;
