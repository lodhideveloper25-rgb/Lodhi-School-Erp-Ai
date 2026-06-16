const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const featureConfig = {
  // Existing configs
  Students: { icon: 'Users', columns: ['Roll No', 'Name', 'Class', 'Gender', 'Contact'], fields: [{name: 'rollNo', label: 'Roll Number'}, {name: 'studentName', label: 'Student Name'}, {name: 'className', label: 'Class'}, {name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female']}, {name: 'contact', label: 'Contact'}] },
  Teachers: { icon: 'UserCircle', columns: ['Employee ID', 'Name', 'Subject', 'Phone', 'Qualification'], fields: [{name: 'empId', label: 'Employee ID'}, {name: 'teacherName', label: 'Name'}, {name: 'subject', label: 'Subject'}, {name: 'phone', label: 'Phone'}, {name: 'qualification', label: 'Qualification'}] },
  Classes: { icon: 'BookOpen', columns: ['Class Name', 'Section', 'Class Teacher', 'Capacity'], fields: [{name: 'className', label: 'Class Name'}, {name: 'section', label: 'Section'}, {name: 'classTeacher', label: 'Class Teacher'}, {name: 'capacity', label: 'Capacity', type: 'number'}] },
  Attendance: { icon: 'Calendar', columns: ['Date', 'Class', 'Total Students', 'Present', 'Absent'], fields: [{name: 'attendanceDate', label: 'Date', type: 'date'}, {name: 'className', label: 'Class'}, {name: 'totalStudents', label: 'Total Students', type: 'number'}, {name: 'present', label: 'Present Count', type: 'number'}, {name: 'absent', label: 'Absent Count', type: 'number'}] },
  Fees: { icon: 'DollarSign', columns: ['Fee Type', 'Amount', 'Frequency', 'Description'], fields: [{name: 'feeType', label: 'Fee Type'}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'frequency', label: 'Frequency', type: 'select', options: ['Monthly', 'Yearly', 'One-time']}, {name: 'description', label: 'Description'}] },
  Exams: { icon: 'FileText', columns: ['Exam Name', 'Class', 'Start Date', 'End Date'], fields: [{name: 'examName', label: 'Exam Name'}, {name: 'className', label: 'Class'}, {name: 'startDate', label: 'Start Date', type: 'date'}, {name: 'endDate', label: 'End Date', type: 'date'}] },
  Homework: { icon: 'Book', columns: ['Class', 'Subject', 'Topic', 'Assign Date', 'Due Date'], fields: [{name: 'className', label: 'Class'}, {name: 'subject', label: 'Subject'}, {name: 'topic', label: 'Topic'}, {name: 'assignDate', label: 'Assign Date', type: 'date'}, {name: 'dueDate', label: 'Due Date', type: 'date'}] },
  Parents: { icon: 'Users', columns: ['Parent Name', 'Phone', 'Email', 'Occupation'], fields: [{name: 'parentName', label: 'Parent Name'}, {name: 'phone', label: 'Phone Number'}, {name: 'email', label: 'Email'}, {name: 'occupation', label: 'Occupation'}] },
  Notices: { icon: 'Bell', columns: ['Title', 'Date', 'Target Audience', 'Description'], fields: [{name: 'title', label: 'Notice Title'}, {name: 'noticeDate', label: 'Date', type: 'date'}, {name: 'audience', label: 'Target Audience', type: 'select', options: ['All', 'Teachers', 'Students', 'Parents']}, {name: 'description', label: 'Description'}] },
  Inventory: { icon: 'Box', columns: ['Item Name', 'Category', 'Quantity', 'Unit Price'], fields: [{name: 'itemName', label: 'Item Name'}, {name: 'category', label: 'Category'}, {name: 'quantity', label: 'Quantity', type: 'number'}, {name: 'unitPrice', label: 'Unit Price ($)', type: 'number'}] },
  Library: { icon: 'Book', columns: ['Book Title', 'Author', 'ISBN', 'Available Copies'], fields: [{name: 'bookTitle', label: 'Book Title'}, {name: 'author', label: 'Author'}, {name: 'isbn', label: 'ISBN Number'}, {name: 'copies', label: 'Available Copies', type: 'number'}] },
  Transport: { icon: 'Bus', columns: ['Vehicle No', 'Route', 'Driver Name', 'Fare'], fields: [{name: 'vehicleNo', label: 'Vehicle Number'}, {name: 'route', label: 'Route Name'}, {name: 'driverName', label: 'Driver Name'}, {name: 'fare', label: 'Monthly Fare ($)', type: 'number'}] },
  OtherIncome: { icon: 'DollarSign', columns: ['Source', 'Amount', 'Date', 'Description'], fields: [{name: 'source', label: 'Income Source'}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'date', label: 'Date', type: 'date'}, {name: 'description', label: 'Description'}] },
  AddHolidays: { icon: 'Calendar', columns: ['Holiday Name', 'Start Date', 'End Date', 'Type'], fields: [{name: 'holidayName', label: 'Holiday Name'}, {name: 'startDate', label: 'Start Date', type: 'date'}, {name: 'endDate', label: 'End Date', type: 'date'}, {name: 'type', label: 'Type', type: 'select', options: ['Public', 'School', 'Emergency']}] },
  Sessions: { icon: 'Clock', columns: ['Session Name', 'Start Year', 'End Year', 'Status'], fields: [{name: 'sessionName', label: 'Session Name (e.g. 2024-2025)'}, {name: 'startYear', label: 'Start Year', type: 'number'}, {name: 'endYear', label: 'End Year', type: 'number'}, {name: 'status', label: 'Status', type: 'select', options: ['Active', 'Completed', 'Upcoming']}] },
  FeeHead: { icon: 'DollarSign', columns: ['Head Name', 'Type', 'Description'], fields: [{name: 'headName', label: 'Fee Head Name'}, {name: 'type', label: 'Type', type: 'select', options: ['Monthly', 'Annual', 'One-time']}, {name: 'description', label: 'Description'}] },
  CollectFee: { icon: 'DollarSign', columns: ['Student ID', 'Amount Paid', 'Payment Method', 'Date'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'amount', label: 'Amount Paid ($)', type: 'number'}, {name: 'method', label: 'Payment Method', type: 'select', options: ['Cash', 'Bank Transfer', 'Card']}, {name: 'date', label: 'Payment Date', type: 'date'}] },
  MakeExamLive: { icon: 'Globe', columns: ['Exam Name', 'Class', 'Publish Date'], fields: [{name: 'examName', label: 'Exam Name'}, {name: 'className', label: 'Class'}, {name: 'publishDate', label: 'Publish Date', type: 'date'}] },
  Grading: { icon: 'Award', columns: ['Grade Name', 'Min Marks', 'Max Marks', 'Remark'], fields: [{name: 'gradeName', label: 'Grade Name (e.g. A+)'}, {name: 'minMarks', label: 'Min Marks (%)', type: 'number'}, {name: 'maxMarks', label: 'Max Marks (%)', type: 'number'}, {name: 'remark', label: 'Remark'}] },

  // New specific configs added
  UploadPhoto: { icon: 'Image', columns: ['Album / Caption', 'Photo Name', 'Date'], fields: [{name: 'albumName', label: 'Album / Caption'}, {name: 'photoFile', label: 'Select Photo', type: 'file'}] },
  GalleryParentPortal: { icon: 'Image', columns: ['Event Name', 'Image File', 'Published Date'], fields: [{name: 'eventName', label: 'Event Name'}, {name: 'imageFile', label: 'Upload Image', type: 'file'}] },
  ChangePassword: { icon: 'Lock', columns: ['Username', 'Change Request Date'], fields: [{name: 'username', label: 'Username'}, {name: 'oldPassword', label: 'Old Password', type: 'password'}, {name: 'newPassword', label: 'New Password', type: 'password'}] },
  RemoveStudent: { icon: 'UserMinus', columns: ['Student ID', 'Student Name', 'Reason'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'studentName', label: 'Student Name'}, {name: 'reason', label: 'Reason for Removal', type: 'select', options: ['Graduated', 'Transferred', 'Expelled', 'Other']}] },
  InstituteProfile: { icon: 'Home', columns: ['Institute Name', 'Contact', 'Logo File'], fields: [{name: 'instituteName', label: 'Institute Name'}, {name: 'contactInfo', label: 'Contact Information'}, {name: 'logoFile', label: 'Upload Logo', type: 'file'}] },
  Speaker: { icon: 'Volume2', columns: ['Announcement Title', 'Room / Class', 'Time'], fields: [{name: 'title', label: 'Announcement Title'}, {name: 'room', label: 'Target Room/Class'}, {name: 'time', label: 'Announcement Time', type: 'time'}] },
  BulkImportHistory: { icon: 'Upload', columns: ['Import Type', 'File Name', 'Import Date', 'Status'], fields: [{name: 'importType', label: 'Import Type', type: 'select', options: ['Students', 'Staff', 'Fees']}, {name: 'csvFile', label: 'Upload CSV File', type: 'file'}] },
  StudentPromote: { icon: 'TrendingUp', columns: ['Student Name', 'From Class', 'To Class', 'Session'], fields: [{name: 'studentName', label: 'Student Name'}, {name: 'fromClass', label: 'Current Class'}, {name: 'toClass', label: 'Promote To Class'}, {name: 'session', label: 'Academic Session'}] },
  ParentChat: { icon: 'MessageCircle', columns: ['Parent Name', 'Last Message', 'Date'], fields: [{name: 'parentName', label: 'Parent Name / ID'}, {name: 'message', label: 'Message Content'}] },
  Family: { icon: 'Users', columns: ['Family ID', 'Father Name', 'Contact', 'No. of Children'], fields: [{name: 'familyId', label: 'Family ID'}, {name: 'fatherName', label: 'Father Name'}, {name: 'contact', label: 'Contact Number'}, {name: 'childrenCount', label: 'Number of Children', type: 'number'}] },
  MessageBox: { icon: 'Mail', columns: ['Recipient', 'Subject', 'Date Sent'], fields: [{name: 'recipient', label: 'Recipient'}, {name: 'subject', label: 'Message Subject'}, {name: 'body', label: 'Message Body'}] },
  StaffAttendance: { icon: 'UserCheck', columns: ['Staff Name', 'Date', 'Status'], fields: [{name: 'staffName', label: 'Staff Name'}, {name: 'date', label: 'Date', type: 'date'}, {name: 'status', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Leave']}] },
  SocialMedia: { icon: 'Globe', columns: ['Platform', 'Profile Link', 'Status'], fields: [{name: 'platform', label: 'Platform (e.g. Facebook)', type: 'select', options: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn']}, {name: 'profileLink', label: 'Profile Link URL'}] },
  LiveAttendanceMachine: { icon: 'Cpu', columns: ['Device ID', 'IP Address', 'Location', 'Status'], fields: [{name: 'deviceId', label: 'Device ID'}, {name: 'ipAddress', label: 'IP Address'}, {name: 'location', label: 'Location (e.g. Main Gate)'}] },
  VoucherHeadTransfer: { icon: 'Repeat', columns: ['From Head', 'To Head', 'Amount', 'Date'], fields: [{name: 'fromHead', label: 'Transfer From Head'}, {name: 'toHead', label: 'Transfer To Head'}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'date', label: 'Transfer Date', type: 'date'}] },
  BulkUpdateSingleColumn: { icon: 'Edit3', columns: ['Table Name', 'Column Name', 'Value Applied'], fields: [{name: 'tableName', label: 'Target Table', type: 'select', options: ['Students', 'Staff']}, {name: 'columnName', label: 'Column to Update'}, {name: 'newValue', label: 'New Value to Apply'}] },
  StudentProfile: { icon: 'User', columns: ['Roll No', 'Full Name', 'Class', 'Guardian'], fields: [{name: 'rollNo', label: 'Roll Number'}, {name: 'fullName', label: 'Full Name'}, {name: 'className', label: 'Class'}, {name: 'guardianName', label: 'Guardian Name'}] },
  QuickVoucherGenerate: { icon: 'Zap', columns: ['Voucher Type', 'Amount', 'Generated Date'], fields: [{name: 'voucherType', label: 'Voucher Type', type: 'select', options: ['Expense', 'Income', 'Journal']}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'description', label: 'Brief Description'}] },
  VoucherPrint: { icon: 'Printer', columns: ['Voucher No', 'Printed To', 'Date'], fields: [{name: 'voucherNo', label: 'Voucher Number'}, {name: 'recipient', label: 'Print For (Name/ID)'}] },
  StudentLedgerOld: { icon: 'Archive', columns: ['Student ID', 'Old Balance', 'Remarks'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'oldBalance', label: 'Old Balance Amount', type: 'number'}, {name: 'remarks', label: 'Remarks / Year'}] },
  StudentLedgerNew: { icon: 'FileText', columns: ['Student ID', 'Current Balance', 'Last Updated'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'currentBalance', label: 'Current Balance Amount', type: 'number'}] },
  EditStudent: { icon: 'Edit', columns: ['Student ID', 'Updated Field', 'Date'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'fieldToEdit', label: 'Field to Edit (e.g. Phone)'}, {name: 'newValue', label: 'New Value'}] },
  Receipts: { icon: 'CheckSquare', columns: ['Receipt No', 'Received From', 'Amount', 'Date'], fields: [{name: 'receiptNo', label: 'Receipt Number'}, {name: 'receivedFrom', label: 'Received From (Name)'}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'date', label: 'Receipt Date', type: 'date'}] },
  PaymentHistory: { icon: 'CreditCard', columns: ['Transaction ID', 'Student ID', 'Amount', 'Date'], fields: [{name: 'transactionId', label: 'Transaction ID'}, {name: 'studentId', label: 'Student ID'}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'date', label: 'Payment Date', type: 'date'}] },
  StudentIdCard: { icon: 'CreditCard', columns: ['Student ID', 'Template', 'Generated On'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'templateType', label: 'Template Design', type: 'select', options: ['Standard', 'Premium', 'Barcode']}, {name: 'issueDate', label: 'Issue Date', type: 'date'}] },
  StudentAttendanceDetails: { icon: 'Calendar', columns: ['Student ID', 'Month', 'Total Present'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'month', label: 'Month', type: 'select', options: ['January', 'February', 'March', 'April', 'May', 'June']}, {name: 'totalPresent', label: 'Total Present Days', type: 'number'}] },
  GenerateCertificate: { icon: 'Award', columns: ['Student ID', 'Certificate Type', 'Issue Date'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'certificateType', label: 'Certificate Type', type: 'select', options: ['Character', 'Transfer', 'Sports', 'Achievement']}, {name: 'issueDate', label: 'Issue Date', type: 'date'}] },
  MarkSheet: { icon: 'FileText', columns: ['Student ID', 'Exam Name', 'Total Marks', 'Obtained'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'examName', label: 'Exam Name'}, {name: 'totalMarks', label: 'Total Marks', type: 'number'}, {name: 'obtainedMarks', label: 'Obtained Marks', type: 'number'}] },
  StudentMessage: { icon: 'MessageSquare', columns: ['Student ID', 'Message Subject', 'Date Sent'], fields: [{name: 'studentId', label: 'Student ID'}, {name: 'subject', label: 'Message Subject'}, {name: 'body', label: 'Message Text'}] },
  FamilyLedger: { icon: 'BookOpen', columns: ['Family ID', 'Total Dues', 'Total Paid', 'Balance'], fields: [{name: 'familyId', label: 'Family ID'}, {name: 'totalDues', label: 'Total Dues', type: 'number'}, {name: 'totalPaid', label: 'Total Paid', type: 'number'}] },
  Staff: { icon: 'Users', columns: ['Staff ID', 'Name', 'Role', 'Department'], fields: [{name: 'staffId', label: 'Staff ID'}, {name: 'name', label: 'Full Name'}, {name: 'role', label: 'Designation / Role', type: 'select', options: ['Clerk', 'Librarian', 'Guard', 'Admin']}, {name: 'department', label: 'Department'}] },
  Certificates: { icon: 'Award', columns: ['Certificate ID', 'Title', 'Issued To'], fields: [{name: 'certId', label: 'Certificate ID'}, {name: 'title', label: 'Certificate Title'}, {name: 'issuedTo', label: 'Issued To (Name/ID)'}] },
  IDCards: { icon: 'CreditCard', columns: ['Batch Name', 'Format', 'Total Printed'], fields: [{name: 'batchName', label: 'Batch Name (e.g. Class 10)'}, {name: 'format', label: 'ID Format', type: 'select', options: ['Vertical', 'Horizontal']}, {name: 'count', label: 'Number to Print', type: 'number'}] },
  Finance: { icon: 'PieChart', columns: ['Transaction Type', 'Category', 'Amount', 'Date'], fields: [{name: 'txType', label: 'Transaction Type', type: 'select', options: ['Income', 'Expense']}, {name: 'category', label: 'Category'}, {name: 'amount', label: 'Amount ($)', type: 'number'}, {name: 'date', label: 'Date', type: 'date'}] },
  Reports: { icon: 'BarChart2', columns: ['Report Name', 'Module', 'Generated Date'], fields: [{name: 'reportName', label: 'Report Name'}, {name: 'module', label: 'Module', type: 'select', options: ['Attendance', 'Finance', 'Exams']}, {name: 'date', label: 'Date', type: 'date'}] },
  Settings: { icon: 'Settings', columns: ['Setting Name', 'Value', 'Last Updated'], fields: [{name: 'settingName', label: 'Setting Name (e.g. Currency)'}, {name: 'value', label: 'Setting Value'}] }
};

// Fallback for anything strictly missed
const defaultCols = ['Name / Title', 'Description', 'Created Date'];
const defaultFields = [{name: 'title', label: 'Title'}, {name: 'description', label: 'Description'}];

const allPages = [
  'Students', 'Teachers', 'Staff', 'Classes', 'Attendance', 'Fees', 'Exams', 'Homework', 'Parents', 
  'Notices', 'Certificates', 'IDCards', 'Finance', 'Inventory', 'Library', 'Transport', 'Reports', 'Settings',
  'OtherIncome', 'Family', 'MessageBox', 'StaffAttendance', 'InstituteProfile', 'RemoveStudent', 
  'ChangePassword', 'AddHolidays', 'Sessions', 'BulkImportHistory', 'StudentPromote', 'Grading', 
  'SocialMedia', 'MakeExamLive', 'FeeHead', 'GalleryParentPortal', 'LiveAttendanceMachine', 'ParentChat', 
  'UploadPhoto', 'Speaker', 'VoucherHeadTransfer', 'BulkUpdateSingleColumn', 'StudentProfile', 'CollectFee', 
  'QuickVoucherGenerate', 'VoucherPrint', 'StudentLedgerOld', 'StudentLedgerNew', 'EditStudent', 'Receipts', 
  'PaymentHistory', 'StudentIdCard', 'StudentAttendanceDetails', 'GenerateCertificate', 'MarkSheet', 
  'StudentMessage', 'FamilyLedger'
];

allPages.forEach(page => {
  if (['Expense', 'StaffRoles', 'Billing'].includes(page)) return; // Skip already manually customized ones

  const config = featureConfig[page] || { icon: 'Folder', columns: defaultCols, fields: defaultFields };
  const pageTitle = page.replace(/([A-Z])/g, ' $1').trim();
  
  let stateInitial = '{ ';
  config.fields.forEach(f => {
    if (f.type === 'date') stateInitial += `${f.name}: new Date().toISOString().split('T')[0], `;
    else stateInitial += `${f.name}: '', `;
  });
  stateInitial += '}';

  const content = `import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Filter, X, Trash2, ${config.icon || 'Folder'} as PageIcon, UploadCloud } from 'lucide-react';
import api from '../services/api';

const ${page} = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState(${stateInitial});
  
  // Ref for file inputs
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/data/${page}');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      // Basic validation for the first field
      const firstField = '${config.fields[0].name}';
      if (!formData[firstField]) return alert('${config.fields[0].label} is required');
      
      const payload = {
        title: formData[firstField],
        description: 'Record created dynamically',
        ...formData
      };

      await api.post('/data/${page}', payload);
      setFormData(${stateInitial});
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(\`/data/\${id}\`);
        fetchData();
      } catch (error) {
        console.error('Error deleting data', error);
      }
    }
  };

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, [fieldName]: e.target.files[0].name}); // store file name as mock
    }
  };

  const filteredData = data.filter(item => {
    const searchTarget = item.title?.toLowerCase() || '';
    return searchTarget.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">${pageTitle}</h1>
          <p className="text-slate-500 text-sm mt-1">Manage ${pageTitle.toLowerCase()} records</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Total Records: {filteredData.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold w-16">ID</th>
                ${config.columns.map(c => `<th className="p-4 font-semibold">${c}</th>`).join('\n                ')}
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="${config.columns.length + 3}" className="p-8 text-center text-slate-500">Loading data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="${config.columns.length + 3}" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <PageIcon size={24} className="text-slate-400" />
                      </div>
                      <p className="text-slate-600 font-medium text-base">No records found</p>
                      <p className="text-sm mt-1">Click "Add New" to create the first record.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-600 font-mono text-xs">#{index + 1}</td>
                    ${config.fields.map(f => {
                      if(f.type === 'file') return `<td className="p-4 text-sm text-blue-500 hover:underline cursor-pointer">{item.metadata?.${f.name} || 'File Uploaded'}</td>`;
                      if(f.type === 'date') return `<td className="p-4 text-sm text-slate-700">{item.metadata?.${f.name} ? new Date(item.metadata.${f.name}).toLocaleDateString() : 'N/A'}</td>`;
                      if(f.type === 'number') return `<td className="p-4 text-sm font-semibold text-slate-700">{item.metadata?.${f.name} || '0'}</td>`;
                      return `<td className="p-4 text-sm text-slate-700">{item.metadata?.${f.name} || item.title || 'N/A'}</td>`;
                    }).slice(0, config.columns.length).join('\n                    ')}
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Add New ${pageTitle}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
              ${config.fields.map(f => {
                if (f.type === 'select') {
                  return `<div>
                <label className="block text-sm font-medium text-slate-700 mb-1">${f.label}</label>
                <select 
                  value={formData.${f.name}}
                  onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select ${f.label}</option>
                  ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('\n                  ')}
                </select>
              </div>`;
                }
                if (f.type === 'file') {
                  return `<div>
                <label className="block text-sm font-medium text-slate-700 mb-1">${f.label}</label>
                <div 
                  onClick={() => document.getElementById('file_${f.name}').click()}
                  className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <input 
                    type="file" 
                    id="file_${f.name}" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, '${f.name}')}
                  />
                  <UploadCloud size={24} className="text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-slate-700">
                    {formData.${f.name} ? formData.${f.name} : 'Click to upload file'}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                </div>
              </div>`;
                }
                return `<div>
                <label className="block text-sm font-medium text-slate-700 mb-1">${f.label}</label>
                <input 
                  type="${f.type || 'text'}" 
                  value={formData.${f.name}}
                  onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter ${f.label}..." 
                />
              </div>`;
              }).join('\n              ')}
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50 mt-auto">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ${page};
`;
  const filePath = path.join(pagesDir, `${page}.jsx`);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
});
