const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Roadmap = require("../models/Roadmap");
const { generateLLMRoadmap } = require("../utils/llm"); // LLM helper

// 🔹 Generate and Save Roadmap
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { role, timeline, hoursOfStudy, marksObtained, skillsHave, skillsLack } = req.body;

    // Call LLM utility (ye tum utils/llm.js me banao)
    const roadmapText = await generateLLMRoadmap({
      role,
      timeline,
      hoursOfStudy,
      marksObtained,
      skillsHave,
      skillsLack,
    });

    // Save roadmap in DB
    const roadmap = new Roadmap({
      userId: req.user.id,
      role,
      timeline,
      hoursOfStudy,
      marksObtained,
      skillsHave,
      skillsLack,
      roadmap: roadmapText,
    });

    await roadmap.save();

    res.json({ roadmap: roadmapText });
  } catch (err) {
    console.error("❌ Error generating roadmap:", err);
    res.status(500).json({ message: "Error generating roadmap" });
  }
});

// 🔹 Fetch latest roadmap for logged in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!roadmap) return res.status(404).json({ message: "No roadmap found" });

    res.json(roadmap);
  } catch (err) {
    console.error("❌ Error fetching roadmap:", err);
    res.status(500).json({ message: "Error fetching roadmap" });
  }
});

module.exports = router;
