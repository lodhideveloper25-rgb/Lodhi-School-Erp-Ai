const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String},
  audience: [{ type: String }],
  status: { type: String, enum: ['Active', 'Expired', 'Draft'], default: 'Active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);
