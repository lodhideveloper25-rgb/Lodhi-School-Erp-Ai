const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  admissionNo: { type: String, required: true, unique: true },
  rollNo: { type: String },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String },
  parentName: { type: String },
  parentPhone: { type: String },
  address: { type: String },
  status: { type: String, enum: ['Active', 'Inactive', 'Left'], default: 'Active' },
  documents: [{ name: String, url: String }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
