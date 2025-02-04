const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const cors = require("cors"); // Import cors
const router = express.Router();
const axios = require("axios");

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;

// Apply CORS to this route specifically
router.post("/register", cors(), async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error
    res.status(500).json({ error: "Registration failed" });
  }
});

// Apply CORS to this route specifically
router.post("/login", cors(), async (req, res) => {
  const { email, password, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ error: "Captcha verification failed" });
  }

  // Verify CAPTCHA with Google
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );

    if (!response.data.success) {
      return res.status(400).json({ error: "Captcha validation failed" });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});
module.exports = router;
