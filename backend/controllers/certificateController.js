const Student = require('../models/Student');

const getCertificates = async (req, res) => {
  const students = await Student.find()
    .populate('user', 'name email phone schoolCode')
    .populate('class', 'name');

  const certificateRows = students
    .filter((s) => s.user?.schoolCode === req.user.schoolCode)
    .map((s) => ({
      id: s._id,
      name: s.user?.name || s.name,
      admissionNo: s.admissionNo,
      className: s.class?.name || 'N/A',
      section: s.section || 'N/A',
      achievement: 'Academic Excellence',
      issuer: 'Principal',
      date: new Date().toDateString(),
    }));

  res.json(certificateRows);
};

module.exports = { getCertificates };