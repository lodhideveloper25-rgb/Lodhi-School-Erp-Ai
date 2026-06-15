const jwt = require('jsonwebtoken');
const User = require('../models/User');

const normalizeRole = (role) => role.toString().toLowerCase().replace(/\s+/g, '');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

const authorize = (...roles) => {
  const normalizedRoles = roles.map(normalizeRole);
  return (req, res, next) => {
    const currentRole = normalizeRole(req.user.role);
    if (!normalizedRoles.includes(currentRole)) {
      return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
    }
    next();
  };
};

module.exports = { protect, authorize };
