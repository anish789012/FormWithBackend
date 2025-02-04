const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const pool = require("../db");
const cors = require("cors"); // Import cors
const router = express.Router();

// Apply CORS to this route specifically
router.post("/reset-password", cors(), async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    // Update user with reset token
    await pool.query(
      "UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?",
      [token, expiry, email]
    );

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error processing request", details: error.message });
  }
});

router.post("/reset-password/confirm", cors(), async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Validate input
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required." });
    }

    // Check if token and expiry are valid
    const [result] = await pool.query(
      "SELECT * FROM users WHERE reset_token = ? AND token_expiry > ?",
      [token, new Date()]
    );

    if (result.length === 0) {
      console.error("Invalid or expired token.");
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    const user = result[0];
    console.log("User found with token reset:", user.email);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("Hashed password generated");

    // Update the user's password and clear the reset token
    const [updateResult] = await pool.query(
      "UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE email = ?",
      [hashedPassword, user.email]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({ error: "Password update failed." });
    }

    console.log("Password updated successfully for:", user.email);

    res.json({ message: "Password has been successfully updated." });
  } catch (error) {
    console.error("Error processing password reset:", error);
    res
      .status(500)
      .json({ error: "Error processing the request", details: error.message });
  }
});

module.exports = router;
