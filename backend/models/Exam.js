const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  name: { type: String, required: true }, // e.g., Mid Term, Final Term
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], // Classes participating
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
