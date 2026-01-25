const express = require("express");
const Ticket = require("../models/Ticket");
const { protect, adminOnly } = require("../middleware/authMiddleware");


const router = express.Router();

// CREATE TICKET (User)
router.post("/", protect, async (req, res) => {
  try {
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const ticket = await Ticket.create({
      user: req.user.id,
      subject,
      description,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET LOGGED-IN USER TICKETS
router.get("/my", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: Get all tickets
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('user', 'name email');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN: Update ticket status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = req.body.status || ticket.status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
