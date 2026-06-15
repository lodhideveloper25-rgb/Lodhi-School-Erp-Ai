const Student = require('../models/Student');
const Staff = require('../models/Staff');
const School = require('../models/School');

const getIdCards = async (req, res) => {
  const school = await School.findOne({ schoolCode: req.user.schoolCode });
  if (!school) {
    return res.status(404).json({ message: 'School not found' });
  }

  const [students, staff] = await Promise.all([
    Student.find({})
      .populate('user', 'name email phone profileImage schoolCode')
      .populate('class', 'name'),
    Staff.find({ schoolId: school._id }).populate('userId', 'name email phone profileImage')
  ]);

  const studentCards = students
    .filter((s) => s.user?.schoolCode === req.user.schoolCode)
    .map((s) => ({
      id: s._id,
      type: 'student',
      name: s.user?.name || `${s.user?.firstName || ''} ${s.user?.lastName || ''}`.trim() || 'Student',
      role: 'Student',
      idNo: s.admissionNo || s._id,
      className: s.class?.name || 'N/A',
      bloodGroup: s.bloodGroup || 'N/A',
      phone: s.parentPhone || s.user?.phone || 'N/A',
      profileImage: s.user?.profileImage || null,
    }));

  const staffCards = staff.map((member) => ({
    id: member._id,
    type: 'staff',
    name: member.userId?.name || `${member.firstName || ''} ${member.lastName || ''}`.trim() || 'Staff Member',
    role: member.role || 'Staff',
    idNo: member.employeeId || member._id,
    className: member.department || member.role || 'N/A',
    bloodGroup: 'N/A',
    phone: member.phone || member.userId?.phone || 'N/A',
    profileImage: member.userId?.profileImage || null,
  }));

  const cards = [...studentCards, ...staffCards].sort((a, b) => a.name.localeCompare(b.name));
  res.json(cards);
};

module.exports = { getIdCards };