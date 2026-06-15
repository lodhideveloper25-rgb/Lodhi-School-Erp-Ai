const Attendance = require('../models/Attendance');
const Class = require('../models/Class');
const Fee = require('../models/Fee');
const Homework = require('../models/Homework');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const Exam = require('../models/Exam');

const getDashboardMetrics = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const totalStudents = await Student.countDocuments();
  const totalTeachers = await Teacher.countDocuments();
  const totalStaff = await User.countDocuments({ role: { $in: ['admin', 'accountant', 'receptionist'] } });
  const totalClasses = await Class.countDocuments();
  const todayAttendance = await Attendance.countDocuments({ date: { $gte: today, $lt: tomorrow } });
  const presentStudents = await Attendance.countDocuments({ date: { $gte: today, $lt: tomorrow }, status: 'Present' });
  const absentStudents = await Attendance.countDocuments({ date: { $gte: today, $lt: tomorrow }, status: 'Absent' });
  const monthlyFeeCollection = await Fee.aggregate([
    { $match: { status: 'Paid', createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
    { $group: { _id: null, total: { $sum: '$paidAmount' } } }
  ]);
  const pendingFees = await Fee.countDocuments({ status: { $in: ['Unpaid', 'Partial'] } });
  const todayRevenue = monthlyFeeCollection[0]?.total || 0;
  const totalExpenses = 0;
  const netProfit = todayRevenue - totalExpenses;
  const homeworkPending = await Homework.countDocuments({ dueDate: { $gte: today } });
  const examsScheduled = await Exam.countDocuments({ isActive: true });
  const newAdmissions = await Student.countDocuments({ createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } });

  res.json({
    totalStudents,
    totalTeachers,
    totalStaff,
    totalClasses,
    todayAttendance,
    presentStudents,
    absentStudents,
    monthlyFeeCollection: todayRevenue,
    pendingFees,
    todayRevenue,
    totalExpenses,
    netProfit,
    homeworkPending,
    examsScheduled,
    newAdmissions,
  });
};

module.exports = { getDashboardMetrics };