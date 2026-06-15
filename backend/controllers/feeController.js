const Fee = require('../models/Fee');
const Student = require('../models/Student');

// @desc    Generate monthly fee for all students of a class
// @route   POST /api/fees/generate
// @access  Private (Admin, Accountant)
const generateFees = async (req, res) => {
  const { classId, month, dueDate } = req.body;

  const students = await Student.find({ class: classId, status: 'Active' }).populate('class');

  if (students.length === 0) {
    res.status(404);
    throw new Error('No active students found in this class');
  }

  const feeRecords = students.map(student => ({
    student: student._id,
    month,
    dueDate,
    amount: student.class.feeAmount,
    voucherNo: `VCH-${Date.now()}-${student._id.toString().slice(-4)}`
  }));

  await Fee.insertMany(feeRecords);

  res.status(201).json({ message: `Fees generated for ${students.length} students` });
};

// @desc    Record fee payment
// @route   PUT /api/fees/pay/:id
// @access  Private (Accountant, Admin)
const payFee = async (req, res) => {
  const { amountPaid, discount } = req.body;
  const fee = await Fee.findById(req.params.id);

  if (!fee) {
    res.status(404);
    throw new Error('Fee record not found');
  }

  fee.paidAmount += Number(amountPaid);
  fee.discount = Number(discount) || fee.discount;

  const totalPayable = fee.amount + fee.fine - fee.discount;

  if (fee.paidAmount >= totalPayable) {
    fee.status = 'Paid';
  } else if (fee.paidAmount > 0) {
    fee.status = 'Partial';
  }

  await fee.save();
  res.json(fee);
};

// @desc    Get pending fees report
// @route   GET /api/fees/pending
// @access  Private
const getPendingFees = async (req, res) => {
  const pending = await Fee.find({ status: { $ne: 'Paid' } })
    .populate({
      path: 'student',
      populate: [
        { path: 'user', select: 'name' },
        { path: 'class', select: 'name' }
      ]
    });
  res.json(pending);
};

// @desc    Get all fees
// @route   GET /api/fees
// @access  Private (Admin, Accountant, Superadmin)
const getAllFees = async (req, res) => {
  const allFees = await Fee.find({})
    .populate({
      path: 'student',
      populate: [
        { path: 'user', select: 'name' },
        { path: 'class', select: 'name' }
      ]
    });
  res.json(allFees);
};

module.exports = {
  generateFees,
  payFee,
  getPendingFees,
  getAllFees
};
