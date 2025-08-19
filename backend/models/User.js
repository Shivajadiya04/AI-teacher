const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  marksObtained: { type: Number, default: null },
  password: String,

  // ✅ Job & Skills info
  jobRole: { type: String, default: "" },
  skillsHave: { type: [String], default: [] },
  skillsLack: { type: [String], default: [] },


  // ✅ Test info
  marksObtained: { type: String, default: "" }
});

module.exports = mongoose.model('User', userSchema);
