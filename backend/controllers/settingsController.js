const School = require('../models/School');

const getSettings = async (req, res) => {
  const school = await School.findOne({ schoolCode: req.user.schoolCode });
  if (!school) {
    res.status(404);
    throw new Error('School not found');
  }
  res.json(school);
};

const updateSettings = async (req, res) => {
  const school = await School.findOne({ schoolCode: req.user.schoolCode });
  if (!school) {
    res.status(404);
    throw new Error('School not found');
  }

  const updates = {
    name: req.body.name ?? school.name,
    address: req.body.address ?? school.address,
    contactEmail: req.body.contactEmail ?? school.contactEmail,
    contactPhone: req.body.contactPhone ?? school.contactPhone,
    logoUrl: req.body.logoUrl ?? school.logoUrl,
  };

  Object.assign(school, updates);
  await school.save();
  res.json(school);
};

module.exports = { getSettings, updateSettings };