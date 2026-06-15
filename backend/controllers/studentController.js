const Student = require('../models/Student');
const User = require('../models/User');

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin, Teacher, Principal)
const getStudents = async (req, res) => {
  try {
    const { classId, section, search } = req.query;
    let query = {};

    if (classId) query.class = classId;
    if (section) query.section = section;
    
    let students = await Student.find(query)
      .populate('user', 'name email profileImage')
      .populate('class', 'name');

    if (search) {
      students = students.filter(s =>
        s.user.name.toLowerCase().includes(search.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(students);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: ' + error.message);
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', '-password')
      .populate('class');

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    res.json(student);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Create student
// @route   POST /api/students
// @access  Private (Admin)
const createStudent = async (req, res) => {
  const { name, email, password, admissionNo, classId, section, rollNo, parentName, parentPhone } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: 'student',
    schoolCode: req.user.schoolCode
  });

  const student = await Student.create({
    user: user._id,
    admissionNo,
    rollNo,
    class: classId,
    section,
    parentName,
    parentPhone
  });

  res.status(201).json(student);
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin)
const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  await User.findByIdAndDelete(student.user);
  await student.deleteOne();

  res.json({ message: 'Student removed' });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
