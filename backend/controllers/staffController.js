const Staff = require('../models/Staff');
const School = require('../models/School');

// @desc    Get all staff for current user's school
// @route   GET /api/staff
// @access  Private
const getStaff = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const staff = await Staff.find({ schoolId: school._id })
      .populate('userId', 'name email profileImage')
      .sort({ createdAt: -1 });

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getStaff };
