const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password, schoolCode } = req.body;

  const user = await User.findOne({ email, schoolCode });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      schoolCode: user.schoolCode,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email, password or school code');
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

const School = require('../models/School');

const registerSchool = async (req, res) => {
  try {
    const { schoolName, schoolCode, principalName, email, phone, password } = req.body;

    // Check if school code or admin email already exists
    const schoolExists = await School.findOne({ schoolCode });
    if (schoolExists) {
      return res.status(400).json({ message: 'School code already exists' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // 1. Create School Record
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 14); // 14 days trial

    const school = await School.create({
      schoolName,
      schoolCode,
      principalName,
      email,
      phone,
      plan: 'Free',
      expiryDate,
      status: 'Active'
    });

    // 2. Create School Admin User
    const user = await User.create({
      name: principalName || 'Admin',
      email,
      password,
      role: 'admin',
      schoolCode
    });

    res.status(201).json({
      message: 'School registered successfully',
      school,
      admin: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolCode: user.schoolCode,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering school', error: error.message });
  }
};

module.exports = { loginUser, getMe, registerSchool };
