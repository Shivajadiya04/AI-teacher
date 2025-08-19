const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: String,
  timeline: String,
  hoursOfStudy: String,
  marksObtained: String,
  skillsHave: [String],
  skillsLack: [String],
  roadmap: String,
}, { timestamps: true });

module.exports = mongoose.model("Roadmap", roadmapSchema);
