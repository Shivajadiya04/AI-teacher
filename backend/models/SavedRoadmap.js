const mongoose = require("mongoose");

const SavedRoadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: String,
  timeline: String,
  hoursOfStudy: String,
  marksObtained: String,
  skillsHave: [String],
  skillsLack: [String],
  roadmap: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SavedRoadmap", SavedRoadmapSchema);
