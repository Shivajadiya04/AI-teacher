const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const SavedRoadmap = require("../models/SavedRoadmap");

const router = express.Router();

router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { role, timeline, hoursOfStudy, marksObtained, skillsHave, skillsLack, roadmap } = req.body;

    const newRoadmap = new SavedRoadmap({
      user: req.user.id,
      role,
      timeline,
      hoursOfStudy,
      marksObtained,
      skillsHave,
      skillsLack,
      roadmap,
    });

    await newRoadmap.save();
    res.status(201).json({ message: "✅ Roadmap saved successfully!", roadmap: newRoadmap });
  } catch (err) {
    console.error("❌ Error saving roadmap:", err);
    res.status(500).json({ message: "Server error while saving roadmap" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const roadmaps = await SavedRoadmap.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (err) {
    console.error("❌ Error fetching roadmaps:", err);
    res.status(500).json({ message: "Server error fetching roadmaps" });
  }
});

module.exports = router;
