const User = require('../models/User');

// @desc Get all parent users for the school
// @route GET /api/parents
// @access Private
const getParents = async (req, res) => {
  try {
    const parents = await User.find({ role: 'parent', schoolCode: req.user.schoolCode }).select('-password');
    res.json(parents);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getParents };
