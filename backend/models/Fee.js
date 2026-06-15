const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  month: { type: String, required: true }, // e.g., 'January 2024'
  dueDate: { type: Date },
  amount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  fine: { type: Number, default: 0 },
  status: { type: String, enum: ['Paid', 'Partial', 'Unpaid'], default: 'Unpaid' },
  voucherNo: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
