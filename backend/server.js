console.log("🔥 BACKEND SERVER.JS FILE IS RUNNING");

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());

// DEBUG: log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// MongoDB (Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// mount routes
app.use("/api/users", userRoutes);

// root test
app.get("/", (req, res) => {
  res.send("Backend alive 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


