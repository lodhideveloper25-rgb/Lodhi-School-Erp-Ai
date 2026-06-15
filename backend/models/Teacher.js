const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Linked user account for login
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  qualification: { type: String },
  experience: { type: String },
  joiningDate: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: { type: Date },
  phone: { type: String },
  address: { type: String },
  salary: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Teacher', teacherSchema);
