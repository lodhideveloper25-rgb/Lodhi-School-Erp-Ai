const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const newPages = [
  'Billing', 'OtherIncome', 'StaffRoles', 'Family', 'Expense', 'MessageBox', 'StaffAttendance',
  // General Settings
  'InstituteProfile', 'RemoveStudent', 'ChangePassword', 'AddHolidays', 'Sessions', 'BulkImportHistory', 
  'StudentPromote', 'Grading', 'SocialMedia', 'MakeExamLive', 'FeeHead', 'GalleryParentPortal',
  'LiveAttendanceMachine', 'ParentChat', 'UploadPhoto', 'Speaker', 'VoucherHeadTransfer', 'BulkUpdateSingleColumn',
  // Single Student
  'StudentProfile', 'CollectFee', 'QuickVoucherGenerate', 'VoucherPrint', 'StudentLedgerOld', 'StudentLedgerNew',
  'EditStudent', 'Receipts', 'PaymentHistory', 'StudentIdCard', 'StudentAttendanceDetails', 'GenerateCertificate',
  'MarkSheet', 'StudentMessage', 'FamilyLedger'
];

newPages.forEach(page => {
  const content = `import React from 'react';

const ${page} = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[60vh]">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">${page.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <p className="text-slate-500">This feature module is currently under development.</p>
    </div>
  );
};

export default ${page};
`;
  const filePath = path.join(pagesDir, `${page}.jsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created ${page}.jsx`);
  }
});
