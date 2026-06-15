import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import useAuthStore from './store/authStore';

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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
      </Route>
    </Routes>
  );
}

export default App;
