const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // Admin, Accountant, Receptionist, etc.
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  salary: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', staffSchema);
