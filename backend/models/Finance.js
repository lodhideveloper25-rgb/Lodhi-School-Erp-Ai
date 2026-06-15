const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  type: { type: String, enum: ['Income', 'Expense'], required: true },
  category: { type: String, required: true }, // e.g., Salary, Maintenance, Events, Donation
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Bank Transfer', 'Online', 'Cheque'] },
  referenceNumber: { type: String },
  description: { type: String },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Finance', financeSchema);
