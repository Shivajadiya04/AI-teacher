const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },

  // ✅ Job & Skills info
  jobRole:   { type: String, default: "" },
  skillsHave:{ type: [String], default: [] },
  skillsLack:{ type: [String], default: [] },

  // ✅ Test info
  marksObtained: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
