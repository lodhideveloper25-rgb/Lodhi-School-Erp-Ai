const express = require('express');
const router = express.Router();
const School = require('../models/School');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Middleware to check for superadmin
const superadminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as superadmin' });
  }
};

// @route   GET /api/saas/schools
// @desc    Get all registered schools (Superadmin only)
router.get('/schools', protect, superadminOnly, async (req, res) => {
  try {
    const schools = await School.find({}).sort('-createdAt');
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error: error.message });
  }
});

// @route   GET /api/saas/stats
// @desc    Get SaaS stats (Superadmin only)
router.get('/stats', protect, superadminOnly, async (req, res) => {
  try {
    const totalSchools = await School.countDocuments();
    const activeSchools = await School.countDocuments({ status: 'Active' });
    const expiredSchools = await School.countDocuments({ status: 'Expired' });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });

    res.json({
      totalSchools,
      activeSchools,
      expiredSchools,
      totalStudents,
      totalTeachers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SaaS stats', error: error.message });
  }
});

// @route   PUT /api/saas/schools/:id/status
// @desc    Update school status (Suspend/Activate)
router.put('/schools/:id/status', protect, superadminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const school = await School.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    
    // Optional: Also disable all users of this school if suspended
    if (status === 'Suspended') {
      await User.updateMany({ schoolCode: school.schoolCode }, { isActive: false });
    } else if (status === 'Active') {
      await User.updateMany({ schoolCode: school.schoolCode }, { isActive: true });
    }

    res.json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error updating school status', error: error.message });
  }
});

// @route   PUT /api/saas/schools/:id/plan
// @desc    Update school subscription plan
router.put('/schools/:id/plan', protect, superadminOnly, async (req, res) => {
  try {
    const { plan, expiryDays } = req.body;
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (expiryDays || 30));

    const school = await School.findByIdAndUpdate(req.params.id, { 
      plan,
      expiryDate,
      status: 'Active'
    }, { new: true });
    
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error updating school plan', error: error.message });
  }
});

// @route   DELETE /api/saas/schools/:id
// @desc    Delete a school (Superadmin only)
router.delete('/schools/:id', protect, superadminOnly, async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Delete all users associated with this school
    await User.deleteMany({ schoolCode: school.schoolCode });
    
    // Also delete the school
    await School.findByIdAndDelete(req.params.id);

    res.json({ message: 'School and all its users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting school', error: error.message });
  }
});

module.exports = router;
