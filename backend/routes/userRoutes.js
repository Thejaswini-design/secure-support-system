const express = require("express");
const User = require("../models/User");

console.log("✅ userRoutes loaded");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Users route working");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, phone });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;
