const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Class 10
  sections: [String], // e.g., ['A', 'B']
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  subjects: [{ type: String }],
  feeAmount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
