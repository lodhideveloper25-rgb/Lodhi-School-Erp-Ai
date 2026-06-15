const Student = require('../models/Student');
const Fee = require('../models/Fee');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');

// @desc    Predict Fee Defaulters based on previous fee records
// @route   GET /api/ai/fee-defaulters
// @access  Private/Admin
const predictFeeDefaulters = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;
    
    // Find all pending or overdue fees
    const pendingFees = await Fee.find({ 
      schoolId, 
      status: { $in: ['Pending', 'Overdue', 'Partial'] }
    }).populate('studentId', 'firstName lastName admissionNumber');

    // Rule-based prediction logic
    const predictions = pendingFees.map(fee => {
      let riskLevel = 'Low';
      const daysOverdue = (new Date() - new Date(fee.dueDate)) / (1000 * 60 * 60 * 24);

      if (fee.status === 'Overdue') {
        if (daysOverdue > 30) {
          riskLevel = 'High';
        } else if (daysOverdue > 10) {
          riskLevel = 'Medium';
        }
      } else if (fee.status === 'Partial') {
        riskLevel = 'Medium';
      }

      return {
        feeId: fee._id,
        student: fee.studentId ? `${fee.studentId.firstName} ${fee.studentId.lastName}` : 'Unknown',
        admissionNumber: fee.studentId ? fee.studentId.admissionNumber : 'N/A',
        amountDue: fee.amountTotal - fee.discount + fee.fine - fee.amountPaid,
        dueDate: fee.dueDate,
        daysOverdue: daysOverdue > 0 ? Math.floor(daysOverdue) : 0,
        riskLevel
      };
    });

    // Sort by highest risk first
    predictions.sort((a, b) => {
      const riskScore = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return riskScore[b.riskLevel] - riskScore[a.riskLevel];
    });

    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Student Performance Analysis
// @route   GET /api/ai/performance-analysis/:studentId
// @access  Private/Admin/Teacher
const studentPerformanceAnalysis = async (req, res) => {
  try {
    const { studentId } = req.params;
    const schoolId = req.user.schoolId;

    // Fetch marks for the student
    const marks = await Mark.find({ schoolId, studentId });
    
    if (marks.length === 0) {
      return res.json({ message: 'Not enough data for performance analysis.' });
    }

    let totalMarksObtained = 0;
    let totalMaxMarks = 0;
    const subjectPerformance = {};

    marks.forEach(mark => {
      totalMarksObtained += mark.marksObtained;
      totalMaxMarks += mark.totalMarks;

      if (!subjectPerformance[mark.subject]) {
        subjectPerformance[mark.subject] = { obtained: 0, total: 0 };
      }
      subjectPerformance[mark.subject].obtained += mark.marksObtained;
      subjectPerformance[mark.subject].total += mark.totalMarks;
    });

    // Find strong and weak subjects
    let strongSubjects = [];
    let weakSubjects = [];

    for (const [subject, data] of Object.entries(subjectPerformance)) {
      const percentage = (data.obtained / data.total) * 100;
      if (percentage >= 80) strongSubjects.push(subject);
      else if (percentage < 50) weakSubjects.push(subject);
    }

    const overallPercentage = (totalMarksObtained / totalMaxMarks) * 100;
    let resultTrend = 'Average';
    if (overallPercentage >= 80) resultTrend = 'Excellent';
    else if (overallPercentage >= 65) resultTrend = 'Good';
    else if (overallPercentage < 50) resultTrend = 'Needs Improvement';

    res.json({
      overallPercentage: overallPercentage.toFixed(2) + '%',
      resultTrend,
      strongSubjects,
      weakSubjects,
      totalExamsRecorded: marks.length
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { predictFeeDefaulters, studentPerformanceAnalysis };
