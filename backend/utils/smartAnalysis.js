const analyzePerformance = (marks) => {
  if (!marks || marks.length === 0) return 'Insufficient data';

  const average = marks.reduce((a, b) => a + b, 0) / marks.length;

  if (average >= 80) return 'Excellent performance. Keep it up!';
  if (average >= 60) return 'Good progress, but can improve in core subjects.';
  if (average >= 40) return 'Average performance. Needs extra attention.';
  return 'Needs urgent academic support.';
};

const calculateFeeRisk = (payments) => {
  // logic based on delay days
  const averageDelay = 5; // mock logic
  if (averageDelay > 15) return 'High Risk';
  if (averageDelay > 7) return 'Medium Risk';
  return 'Low Risk';
};

module.exports = {
  analyzePerformance,
  calculateFeeRisk
};
