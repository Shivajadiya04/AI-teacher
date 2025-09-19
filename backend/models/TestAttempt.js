// backend/models/TestAttempt.js
const mongoose = require('mongoose');

const AttemptDetailSchema = new mongoose.Schema(
  {
    label: String,       // e.g., "Section A" or "MCQs"
    score: Number,       // e.g., marks for the section
    total: Number,
  },
  { _id: false }
);

const TestAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testName: { type: String, required: true },         // e.g., "Entry Level Test"
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    takenAt: { type: Date, default: Date.now },
    details: [AttemptDetailSchema], // optional breakdown
  },
  { timestamps: true }
);

module.exports = mongoose.model('TestAttempt', TestAttemptSchema);
