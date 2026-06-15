const Homework = require('../models/Homework');
const School = require('../models/School');

// @desc Get homework list for the current user's school
// @route GET /api/homework
// @access Private
const getHomework = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const items = await Homework.find({ schoolId: school._id })
      .populate('classId', 'name')
      .populate('assignedBy', 'user')
      .sort({ dueDate: 1 });

    // map assignedBy to a readable name when possible
    const mapped = items.map(h => ({
      _id: h._id,
      subject: h.subject,
      title: h.title,
      className: h.classId?.name || 'N/A',
      dueDate: h.dueDate,
      assignedBy: h.assignedBy?.user || null,
      description: h.description,
      documentUrl: h.documentUrl
    }));

    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create homework
// @route POST /api/homework
// @access Private (teacher, admin, superadmin)
const createHomework = async (req, res) => {
  try {
    const { classId, sectionId, subject, title, description, dueDate, documentUrl } = req.body;
    if (!classId || !sectionId || !subject || !title || !dueDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const hw = new Homework({
      schoolId: school._id,
      classId,
      sectionId,
      subject,
      title,
      description,
      dueDate: new Date(dueDate),
      documentUrl,
      assignedBy: req.user._id
    });

    await hw.save();
    res.status(201).json(hw);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getHomework, createHomework };
