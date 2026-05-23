const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

// Example API route
app.get("/test", (req, res) => {
  res.json({ message: "Backend working fine 🔥" });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});