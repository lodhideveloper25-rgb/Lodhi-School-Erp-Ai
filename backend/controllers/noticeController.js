const Notice = require('../models/Notice');

const getNotices = async (req, res) => {
  const notices = await Notice.find({ schoolId: req.user.schoolId, status: 'Active' }).sort({ startDate: -1 });
  res.json(notices);
};

const createNotice = async (req, res) => {
  const { title, description, category, audience, startDate, endDate, status } = req.body;
  const notice = await Notice.create({
    schoolId: req.user.schoolId,
    title,
    description,
    category,
    audience,
    startDate,
    endDate,
    status: status || 'Active',
    createdBy: req.user._id
  });
  res.status(201).json(notice);
};

module.exports = {
  getNotices,
  createNotice
};
