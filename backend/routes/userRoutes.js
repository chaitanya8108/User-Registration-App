const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Add a user
router.post("/", async (req, res) => {
  const { name, email, dob } = req.body;

  try {
    const newUser = new User({ name, email, dob });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { name, email, dob } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, dob },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
