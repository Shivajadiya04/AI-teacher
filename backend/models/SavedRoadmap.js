const mongoose = require('mongoose');

// 🔹 Step schema for individual tasks
const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },         // ✅ fixed typo from "tittle"
  week: { type: String },                          // optional grouping
  day: { type: String },                           // optional grouping
  done: { type: Boolean, default: false },         // checkbox status
  dueAt: { type: Date },                           // optional deadline
}, { _id: true });                                  // ensures each step has a unique ID

// 🔹 Main roadmap schema
const SavedRoadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  timeline: { type: String },
  hoursOfStudy: { type: String },
  marksObtained: { type: String },
  skillsHave: [{ type: String }],
  skillsLack: [{ type: String }],
  roadmap: { type: String, required: true },        // raw roadmap text
  savedAt: { type: Date, default: Date.now },
  steps: [stepSchema],                              // ✅ structured tasks
});

module.exports = mongoose.model('SavedRoadmap', SavedRoadmapSchema);
