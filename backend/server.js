const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log("MongoDB Error:", err);
});

app.get("/", (req, res) => {
  res.send("Backend API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});