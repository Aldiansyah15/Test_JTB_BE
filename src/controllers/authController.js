import pool from "../config/db.js";
import { config } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { findUserByEmail, validatePassword } from "../services/authService.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email dan password wajib diisi" });

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Email atau password salah" });

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword)
      return res.status(401).json({ message: "Email atau password salah" });

    // Buat JWT
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Simpan token ke DB
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam
    await pool.query(
      "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
      [user.id, token, expiresAt]
    );
    return res.status(200).json({
      message: "Login berhasil",
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Error login:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Logout → hapus token dari DB
export const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // result = ResultSetHeader
    const [result] = await pool.query("DELETE FROM sessions WHERE token = ?", [token]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Token tidak ditemukan atau sudah logout" });
    }

    return res.status(200).json({
      success: true,
      message: "Logout berhasil",
      alert: "Anda telah berhasil keluar dari akun Anda.",
    });
  } catch (err) {
    console.error("Error logout:", err);
    return res.status(500).json({ message: "Gagal logout" });
  }
};


export const getDashboard = (req, res) => {
  res.json({ message: `Selamat datang, ${req.user.email}!` });
};

// Register user baru
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Cek apakah email sudah terdaftar
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Kirim cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: { username, email },
    });
  } catch (err) {
    console.error('Error register:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const getMe = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, username FROM users WHERE id = ?",
      [req.user.id]
    );


    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    console.error("Error getMe:", err);
    res.status(500).json({ message: "Failed to get user" });
  }
};