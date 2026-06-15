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

module.exports = { loginUser, getMe };
