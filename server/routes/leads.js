const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

// GET /api/leads - list all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/leads - create new lead
router.post("/", async (req, res) => {
  const data = req.body;

  const requiredFields = [
    "name",
    "phone",
    "email",
    "status",
    "qualification",
    "interestField",
    "source",
    "assignedTo",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }

  try {
    const lead = await Lead.create(data);
    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; 