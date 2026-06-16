const fs = require('fs');
const path = require('path');

const appFile = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appFile, 'utf-8');

const newPages = [
  'Billing', 'OtherIncome', 'StaffRoles', 'Family', 'Expense', 'MessageBox', 'StaffAttendance',
  'InstituteProfile', 'RemoveStudent', 'ChangePassword', 'AddHolidays', 'Sessions', 'BulkImportHistory', 
  'StudentPromote', 'Grading', 'SocialMedia', 'MakeExamLive', 'FeeHead', 'GalleryParentPortal',
  'LiveAttendanceMachine', 'ParentChat', 'UploadPhoto', 'Speaker', 'VoucherHeadTransfer', 'BulkUpdateSingleColumn',
  'StudentProfile', 'CollectFee', 'QuickVoucherGenerate', 'VoucherPrint', 'StudentLedgerOld', 'StudentLedgerNew',
  'EditStudent', 'Receipts', 'PaymentHistory', 'StudentIdCard', 'StudentAttendanceDetails', 'GenerateCertificate',
  'MarkSheet', 'StudentMessage', 'FamilyLedger'
];

let importStatements = newPages.map(page => `import ${page} from './pages/${page}';`).join('\n');

const routeStatements = newPages.map(page => {
  let routePath = page.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  
  if (['InstituteProfile', 'RemoveStudent', 'ChangePassword', 'AddHolidays', 'Sessions', 'BulkImportHistory', 
  'StudentPromote', 'Grading', 'SocialMedia', 'MakeExamLive', 'FeeHead', 'GalleryParentPortal',
  'LiveAttendanceMachine', 'ParentChat', 'UploadPhoto', 'Speaker', 'VoucherHeadTransfer', 'BulkUpdateSingleColumn'].includes(page)) {
    routePath = 'general-settings/' + routePath;
  }
  
  if (['StudentProfile', 'CollectFee', 'QuickVoucherGenerate', 'VoucherPrint', 'StudentLedgerOld', 'StudentLedgerNew',
  'EditStudent', 'Receipts', 'PaymentHistory', 'StudentIdCard', 'StudentAttendanceDetails', 'GenerateCertificate',
  'MarkSheet', 'StudentMessage', 'FamilyLedger'].includes(page)) {
    routePath = 'single-student/' + routePath;
  }
  
  if (page === 'MessageBox') routePath = 'messages';
  if (page === 'StudentProfile') routePath = 'single-student/profile';
  if (page === 'StudentIdCard') routePath = 'single-student/id-card';
  if (page === 'StudentMessage') routePath = 'single-student/message';
  if (page === 'EditStudent') routePath = 'single-student/edit';

  return `        <Route path="${routePath}" element={<${page} />} />`;
}).join('\n');

// Insert imports just before "function App()"
content = content.replace('function App() {', importStatements + '\n\nfunction App() {');

// Insert routes just before "</Route>" of MainLayout
content = content.replace('      </Route>\n    </Routes>', routeStatements + '\n      </Route>\n    </Routes>');

fs.writeFileSync(appFile, content);
console.log('App.jsx updated!');
