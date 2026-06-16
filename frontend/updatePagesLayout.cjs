const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const newPages = [
  'Billing', 'OtherIncome', 'StaffRoles', 'Family', 'Expense', 'MessageBox', 'StaffAttendance',
  'InstituteProfile', 'RemoveStudent', 'ChangePassword', 'AddHolidays', 'Sessions', 'BulkImportHistory', 
  'StudentPromote', 'Grading', 'SocialMedia', 'MakeExamLive', 'FeeHead', 'GalleryParentPortal',
  'LiveAttendanceMachine', 'ParentChat', 'UploadPhoto', 'Speaker', 'VoucherHeadTransfer', 'BulkUpdateSingleColumn',
  'StudentProfile', 'CollectFee', 'QuickVoucherGenerate', 'VoucherPrint', 'StudentLedgerOld', 'StudentLedgerNew',
  'EditStudent', 'Receipts', 'PaymentHistory', 'StudentIdCard', 'StudentAttendanceDetails', 'GenerateCertificate',
  'MarkSheet', 'StudentMessage', 'FamilyLedger'
];

newPages.forEach(page => {
  const pageTitle = page.replace(/([A-Z])/g, ' $1').trim();
  const content = `import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';

const ${page} = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">${pageTitle}</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and view ${pageTitle.toLowerCase()} data</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search ${pageTitle.toLowerCase()}..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="text-sm text-slate-500">
            Showing 0 results
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Name / Title</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date Created</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty State */}
              <tr>
                <td colSpan="5" className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                      <Search size={24} className="text-slate-300" />
                    </div>
                    <p className="text-slate-600 font-medium text-base">No data found</p>
                    <p className="text-sm mt-1">There are no records to display in this module yet.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <div>Page 1 of 1</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${page};
`;
  const filePath = path.join(pagesDir, `${page}.jsx`);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${page}.jsx`);
  }
});
