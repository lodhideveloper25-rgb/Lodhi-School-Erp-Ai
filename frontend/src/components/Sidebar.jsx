import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, UserSquare2, BookOpen, GraduationCap,
  CalendarCheck, CreditCard, ClipboardList, BookMarked, Settings,
  LogOut, Search, ChevronLeft, ChevronRight, MessageSquare,
  Wallet, Truck, Home, Megaphone, QrCode, Award, Badge
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuthStore();

  const normalizedRole = user?.role?.toString().toLowerCase().replace(/\s+/g, '');
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/', roles: ['superadmin', 'admin', 'principal', 'teacher', 'accountant', 'parent', 'student', 'receptionist'] },
    { name: 'Students', icon: <GraduationCap size={20} />, path: '/students', roles: ['superadmin', 'admin', 'principal', 'teacher', 'receptionist'] },
    { name: 'Teachers', icon: <Users size={20} />, path: '/teachers', roles: ['superadmin', 'admin', 'principal'] },
    { name: 'Staff', icon: <UserSquare2 size={20} />, path: '/staff', roles: ['superadmin', 'admin'] },
    { name: 'Classes', icon: <BookOpen size={20} />, path: '/classes', roles: ['superadmin', 'admin', 'principal'] },
    { name: 'Attendance', icon: <CalendarCheck size={20} />, path: '/attendance', roles: ['superadmin', 'admin', 'principal', 'teacher', 'receptionist'] },
    { name: 'Fees', icon: <CreditCard size={20} />, path: '/fees', roles: ['superadmin', 'admin', 'accountant'] },
    { name: 'Exams', icon: <ClipboardList size={20} />, path: '/exams', roles: ['superadmin', 'admin', 'principal', 'teacher'] },
    { name: 'Homework', icon: <BookMarked size={20} />, path: '/homework', roles: ['superadmin', 'admin', 'principal', 'teacher', 'student', 'parent'] },
    { name: 'Parents', icon: <Users size={20} />, path: '/parents', roles: ['superadmin', 'admin', 'principal', 'teacher'] },
    { name: 'Certificates', icon: <Award size={20} />, path: '/certificates', roles: ['superadmin', 'admin', 'principal'] },
    { name: 'ID Cards', icon: <Badge size={20} />, path: '/idcards', roles: ['superadmin', 'admin', 'principal'] },
    { name: 'Finance', icon: <Wallet size={20} />, path: '/finance', roles: ['superadmin', 'admin', 'accountant'] },
    { name: 'Inventory', icon: <Truck size={20} />, path: '/inventory', roles: ['superadmin', 'admin', 'accountant'] },
    { name: 'Library', icon: <BookOpen size={20} />, path: '/library', roles: ['superadmin', 'admin', 'librarian', 'teacher', 'student', 'parent'] },
    { name: 'Transport', icon: <Truck size={20} />, path: '/transport', roles: ['superadmin', 'admin', 'receptionist'] },
    { name: 'Notices', icon: <Megaphone size={20} />, path: '/notices', roles: ['superadmin', 'admin', 'principal', 'teacher', 'parent', 'student'] },
    { name: 'WhatsApp QR', icon: <QrCode size={20} />, path: '/whatsapp', roles: ['superadmin', 'admin'] },
    { name: 'Reports', icon: <ClipboardList size={20} />, path: '/reports', roles: ['superadmin', 'admin', 'principal', 'teacher', 'accountant'] },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings', roles: ['superadmin', 'admin'] },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.roles.includes(normalizedRole)
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-dark-sidebar border-r border-slate-800 transition-all duration-300 z-50 flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="min-w-[40px] h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
          <BookOpen className="text-white" size={24} />
        </div>
        {isOpen && (
          <span className="font-bold text-lg text-white truncate">LODH ERP AI</span>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-7 -right-3 bg-indigo-600 text-white rounded-full p-1 shadow-lg hover:bg-indigo-500 transition-colors"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Search */}
      {isOpen && (
        <div className="px-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group
              ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
            `}
          >
            <span className={isOpen ? '' : 'mx-auto'}>{item.icon}</span>
            {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-slate-800">
        {isOpen && (
          <div className="flex items-center gap-3 mb-4 p-2 bg-slate-900/50 rounded-xl">
             <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
               {user?.name?.charAt(0)}
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
               <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
             </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-4 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full ${!isOpen && 'justify-center'}`}
        >
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
