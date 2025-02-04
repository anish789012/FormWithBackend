const express = require("express");
const cors = require("cors"); // Import cors
require("dotenv").config();

const app = express();

// Use CORS middleware globally
app.use(
  cors({
    origin: "*", // Allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies (optional)
  })
);

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/email", require("./routes/email"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
