const Class = require('../models/Class');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
const getClasses = async (req, res) => {
  const classes = await Class.find({}).populate('classTeacher', 'name');
  res.json(classes);
};

// @desc    Create a class
// @route   POST /api/classes
// @access  Private (Admin)
const createClass = async (req, res) => {
  const { name, sections, classTeacher, subjects, feeAmount } = req.body;

  const classExists = await Class.findOne({ name });
  if (classExists) {
    res.status(400);
    throw new Error('Class already exists');
  }

  const newClass = await Class.create({
    name,
    sections,
    classTeacher,
    subjects,
    feeAmount
  });

  res.status(201).json(newClass);
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private (Admin)
const updateClass = async (req, res) => {
  const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(updatedClass);
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private (Admin)
const deleteClass = async (req, res) => {
  const classObj = await Class.findById(req.params.id);
  if (!classObj) {
    res.status(404);
    throw new Error('Class not found');
  }
  await classObj.deleteOne();
  res.json({ message: 'Class removed' });
};

module.exports = {
  getClasses,
  createClass,
  updateClass,
  deleteClass
};
