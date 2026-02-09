console.log("🔥 BACKEND SERVER.JS FILE IS RUNNING");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ ADD THIS
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

// ✅ MIDDLEWARE (ORDER MATTERS)
app.use(cors()); // ✅ MUST BE BEFORE ROUTES
app.use(express.json());

// DEBUG: log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

// root test
app.get("/", (req, res) => {
  res.send("Backend alive 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


