const User = require('../models/User');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private
const getTeachers = async (req, res) => {
  const teachers = await User.find({ role: 'teacher', schoolCode: req.user.schoolCode }).select('-password');
  res.json(teachers);
};

// @desc    Add a teacher
// @route   POST /api/teachers
// @access  Private (Admin)
const createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const teacher = await User.create({
    name,
    email,
    password,
    role: 'teacher',
    schoolCode: req.user.schoolCode
  });

  res.status(201).json(teacher);
};

module.exports = {
  getTeachers,
  createTeacher
};
