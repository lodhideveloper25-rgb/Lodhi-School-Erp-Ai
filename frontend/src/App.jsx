import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import useAuthStore from './store/authStore';
import SaasLayout from './layouts/SaasLayout';
import SaasDashboard from './pages/SaasDashboard';
import SaasSchools from './pages/SaasSchools';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" />;
  return children;
};

import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Staff from './pages/Staff';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Exams from './pages/Exams';
import Homework from './pages/Homework';
import Parents from './pages/Parents';
import Notices from './pages/Notices';
import Certificates from './pages/Certificates';
import IDCards from './pages/IDCards';
import Finance from './pages/Finance';
import Inventory from './pages/Inventory';
import Library from './pages/Library';
import Transport from './pages/Transport';
import Reports from './pages/Reports';
import WhatsAppQR from './pages/WhatsAppQR';
import WhatsAppConnect from './pages/WhatsAppConnect';
import Settings from './pages/Settings';

import BillingInvoices from './pages/BillingInvoices';
import OtherIncomeCategory from './pages/OtherIncomeCategory';
import AddOtherIncome from './pages/AddOtherIncome';
import StaffRoles from './pages/StaffRoles';
import Family from './pages/Family';
import Expense from './pages/Expense';
import MessageBox from './pages/MessageBox';
import StaffAttendance from './pages/StaffAttendance';
import InstituteProfile from './pages/InstituteProfile';
import RemoveStudent from './pages/RemoveStudent';
import ChangePassword from './pages/ChangePassword';
import AddHolidays from './pages/AddHolidays';
import Sessions from './pages/Sessions';
import BulkImportHistory from './pages/BulkImportHistory';
import StudentPromote from './pages/StudentPromote';
import Grading from './pages/Grading';
import SocialMedia from './pages/SocialMedia';
import MakeExamLive from './pages/MakeExamLive';
import FeeHead from './pages/FeeHead';
import GalleryParentPortal from './pages/GalleryParentPortal';
import LiveAttendanceMachine from './pages/LiveAttendanceMachine';
import ParentChat from './pages/ParentChat';
import UploadPhoto from './pages/UploadPhoto';
import Speaker from './pages/Speaker';
import VoucherHeadTransfer from './pages/VoucherHeadTransfer';
import BulkUpdateSingleColumn from './pages/BulkUpdateSingleColumn';
import StudentProfile from './pages/StudentProfile';
import CollectFee from './pages/CollectFee';
import QuickVoucherGenerate from './pages/QuickVoucherGenerate';
import VoucherPrint from './pages/VoucherPrint';
import StudentLedgerOld from './pages/StudentLedgerOld';
import StudentLedgerNew from './pages/StudentLedgerNew';
import EditStudent from './pages/EditStudent';
import Receipts from './pages/Receipts';
import PaymentHistory from './pages/PaymentHistory';
import StudentIdCard from './pages/StudentIdCard';
import StudentAttendanceDetails from './pages/StudentAttendanceDetails';
import GenerateCertificate from './pages/GenerateCertificate';
import MarkSheet from './pages/MarkSheet';
import StudentMessage from './pages/StudentMessage';
import FamilyLedger from './pages/FamilyLedger';

import RegisterSchool from './pages/RegisterSchool';

import SaasBilling from './pages/SaasBilling';
import SaasSettings from './pages/SaasSettings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register-school" element={<RegisterSchool />} />
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="staff" element={<Staff />} />
        <Route path="classes" element={<Classes />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="fees" element={<Fees />} />
        <Route path="exams" element={<Exams />} />
        <Route path="homework" element={<Homework />} />
        <Route path="parents" element={<Parents />} />
        <Route path="notices" element={<Notices />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="idcards" element={<IDCards />} />
        <Route path="finance" element={<Finance />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="library" element={<Library />} />
        <Route path="transport" element={<Transport />} />
        <Route path="reports" element={<Reports />} />
        <Route path="whatsapp" element={<WhatsAppQR />} />
        <Route path="whatsapp/connect" element={<WhatsAppConnect />} />
        <Route path="settings" element={<Settings />} />
        <Route path="billing/invoices" element={<BillingInvoices />} />
        <Route path="other-income/other-income-category" element={<OtherIncomeCategory />} />
        <Route path="other-income/add-other-income" element={<AddOtherIncome />} />
        <Route path="staff-roles" element={<StaffRoles />} />
        <Route path="family" element={<Family />} />
        <Route path="expense" element={<Expense />} />
        <Route path="messages" element={<MessageBox />} />
        <Route path="staff-attendance" element={<StaffAttendance />} />
        <Route path="general-settings/institute-profile" element={<InstituteProfile />} />
        <Route path="general-settings/remove-student" element={<RemoveStudent />} />
        <Route path="general-settings/change-password" element={<ChangePassword />} />
        <Route path="general-settings/add-holidays" element={<AddHolidays />} />
        <Route path="general-settings/sessions" element={<Sessions />} />
        <Route path="general-settings/bulk-import-history" element={<BulkImportHistory />} />
        <Route path="general-settings/student-promote" element={<StudentPromote />} />
        <Route path="general-settings/grading" element={<Grading />} />
        <Route path="general-settings/social-media" element={<SocialMedia />} />
        <Route path="general-settings/make-exam-live" element={<MakeExamLive />} />
        <Route path="general-settings/fee-head" element={<FeeHead />} />
        <Route path="general-settings/gallery-parent-portal" element={<GalleryParentPortal />} />
        <Route path="general-settings/live-attendance-machine" element={<LiveAttendanceMachine />} />
        <Route path="general-settings/parent-chat" element={<ParentChat />} />
        <Route path="general-settings/upload-photo" element={<UploadPhoto />} />
        <Route path="general-settings/speaker" element={<Speaker />} />
        <Route path="general-settings/voucher-head-transfer" element={<VoucherHeadTransfer />} />
        <Route path="general-settings/bulk-update-single-column" element={<BulkUpdateSingleColumn />} />
        <Route path="single-student/profile" element={<StudentProfile />} />
        <Route path="single-student/collect-fee" element={<CollectFee />} />
        <Route path="single-student/quick-voucher-generate" element={<QuickVoucherGenerate />} />
        <Route path="single-student/voucher-print" element={<VoucherPrint />} />
        <Route path="single-student/student-ledger-old" element={<StudentLedgerOld />} />
        <Route path="single-student/student-ledger-new" element={<StudentLedgerNew />} />
        <Route path="single-student/edit" element={<EditStudent />} />
        <Route path="single-student/receipts" element={<Receipts />} />
        <Route path="single-student/payment-history" element={<PaymentHistory />} />
        <Route path="single-student/id-card" element={<StudentIdCard />} />
        <Route path="single-student/student-attendance-details" element={<StudentAttendanceDetails />} />
        <Route path="single-student/generate-certificate" element={<GenerateCertificate />} />
        <Route path="single-student/mark-sheet" element={<MarkSheet />} />
        <Route path="single-student/message" element={<StudentMessage />} />
        <Route path="single-student/family-ledger" element={<FamilyLedger />} />
      </Route>
      {/* SaaS Super Admin Routes */}
      <Route path="/saas" element={
        <ProtectedRoute>
          <SaasLayout />
        </ProtectedRoute>
      }>
        <Route index element={<SaasDashboard />} />
        <Route path="schools" element={<SaasSchools />} />
        <Route path="billing" element={<SaasBilling />} />
        <Route path="settings" element={<SaasSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
