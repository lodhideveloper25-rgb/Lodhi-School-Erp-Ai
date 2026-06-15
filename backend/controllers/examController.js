const Exam = require('../models/Exam');
const School = require('../models/School');

// @desc Get list of exams for the current user's school
// @route GET /api/exams
// @access Private
const getExams = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const exams = await Exam.find({ schoolId: school._id }).sort({ startDate: -1 });
    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a new exam
// @route POST /api/exams
// @access Private (teacher, admin, superadmin)
const createExam = async (req, res) => {
  try {
    const { name, startDate, endDate, description, classes } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const exam = new Exam({
      schoolId: school._id,
      name,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      description,
      classes: Array.isArray(classes) ? classes : []
    });

    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getExams, createExam };
