const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// @desc    Mark attendance for multiple students
// @route   POST /api/attendance
// @access  Private (Admin, Teacher)
const markAttendance = async (req, res) => {
  const { attendanceData, date } = req.body; // attendanceData: [{ studentId, status, remarks }]

  if (!attendanceData || !date) {
    res.status(400);
    throw new Error('Please provide attendance data and date');
  }

  const attendanceRecords = attendanceData.map(item => ({
    student: item.studentId,
    date: new Date(date),
    status: item.status,
    remarks: item.remarks,
    markedBy: req.user._id
  }));

  // Bulk update or insert
  for (let record of attendanceRecords) {
    await Attendance.findOneAndUpdate(
      { student: record.student, date: record.date },
      record,
      { upsert: true, new: true }
    );
  }

  res.status(200).json({ message: 'Attendance marked successfully' });
};

// @desc    Get attendance report by class and date
// @route   GET /api/attendance
// @access  Private
const getAttendanceReport = async (req, res) => {
  const { classId, date } = req.query;

  if (!classId || !date) {
    res.status(400);
    throw new Error('Class ID and Date are required');
  }

  const students = await Student.find({ class: classId }).populate('user', 'name');
  const attendance = await Attendance.find({
    date: new Date(date),
    student: { $in: students.map(s => s._id) }
  });

  const report = students.map(student => {
    const record = attendance.find(a => a.student.toString() === student._id.toString());
    return {
      studentId: student._id,
      name: student.user.name,
      status: record ? record.status : 'Not Marked',
      remarks: record ? record.remarks : ''
    };
  });

  res.json(report);
};

module.exports = {
  markAttendance,
  getAttendanceReport
};
