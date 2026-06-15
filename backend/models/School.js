const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolCode: { type: String, required: true, unique: true },
  address: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  logoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('School', schoolSchema);
