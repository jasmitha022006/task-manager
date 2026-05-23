const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ---------------- MONGODB CONNECTION ---------------- */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err));

/* ---------------- TASK MODEL ---------------- */
const Task = mongoose.model("Task", {
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
});

/* ---------------- ROUTES ---------------- */

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

// Test API route
app.get("/test", (req, res) => {
  res.json({ message: "Backend working fine 🔥" });
});

/* ---------------- TASK ROUTES ---------------- */

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});