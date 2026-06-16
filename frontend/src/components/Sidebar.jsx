import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen,
  CalendarCheck, CreditCard, ClipboardList, Settings,
  LogOut, Search, ChevronLeft, ChevronRight, MessageSquare,
  Wallet, Archive, Megaphone, Award, Badge, ChevronDown,
  Briefcase, Banknote, Car, Building, UserCog, UserCheck, FileText, Bell, Monitor
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenus, setExpandedMenus] = useState({
    'General Settings': false,
    'Single student': false
  });
  
  const { user, logout } = useAuthStore();

  const toggleSubmenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { 
      name: 'Billing', 
      icon: <Briefcase size={20} />, 
      path: '#',
      subItems: ['Invoices']
    },
    { 
      name: 'Other income', 
      icon: <Car size={20} />, 
      path: '#',
      subItems: ['Other Income Category', 'Add Other Income']
    },
    { name: 'Staff roles', icon: <Briefcase size={20} />, path: '/staff-roles' },
    { 
      name: 'General Settings', 
      icon: <Settings size={20} />, 
      path: '#',
      subItems: [
        'Institute Profile', 'Remove student', 'Change Password', 'Add Holidays',
        'Sessions', 'Bulk Import History', 'Student Promote', 'Grading',
        'Social Media', 'Make Exam Live', 'Fee Head', 'Gallery Parent Portal',
        'Live Attendance Machine', 'Parent Chat', 'Upload Photo', 'Speaker',
        'Voucher Head Transfer', 'Bulk Update Single Column'
      ]
    },
    { name: 'Certificate', icon: <Award size={20} />, path: '/certificates' },
    { 
      name: 'Single student', 
      icon: <UserCheck size={20} />, 
      path: '#',
      subItems: [
        'Profile', 'Collect Fee', 'Quick voucher generate', 'Voucher print',
        'Student Ledger old', 'Student Ledger new', 'Edit', 'Receipts',
        'Payment History', 'Id card', 'Attendance', 'Generate certificate',
        'Mark Sheet', 'Message', 'Family Ledger'
      ]
    },
    { name: 'Stock & inventory', icon: <Settings size={20} />, path: '/inventory' },
    { name: 'Manage Classes', icon: <Building size={20} />, path: '/classes' },
    { name: 'Family', icon: <Users size={20} />, path: '/family' },
    { name: 'Expense', icon: <CreditCard size={20} />, path: '/expense' },
    { name: 'Manage Students', icon: <Users size={20} />, path: '/students' },
    { name: 'Manage Staff', icon: <UserCog size={20} />, path: '/staff' },
    { name: 'Student Attendance', icon: <CalendarCheck size={20} />, path: '/attendance' },
    { name: 'Finance', icon: <Banknote size={20} />, path: '/finance' },
    { name: 'Message Box', icon: <MessageSquare size={20} />, path: '/messages' },
    { name: 'Exams', icon: <ClipboardList size={20} />, path: '/exams' },
    { name: 'Id cards', icon: <Badge size={20} />, path: '/idcards' },
    { name: 'Home work', icon: <BookOpen size={20} />, path: '/homework' },
    { name: 'Staff Attendance', icon: <UserCheck size={20} />, path: '/staff-attendance' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    { name: 'WhatsApp', icon: <MessageSquare size={20} />, path: '/whatsapp' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#111111] border-r border-slate-800 transition-all duration-300 z-50 flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Brand Header */}
      <div className="pt-6 pb-4 flex flex-col items-center justify-center border-b border-slate-800">
        {isOpen ? (
          <div className="text-center">
            <h1 className="text-white font-black text-xl leading-tight tracking-wide uppercase">LODHI<br/>SCHOOL ERP AI</h1>
            <div className="flex items-center justify-center gap-2 mt-2 text-white">
              <Bell size={16} />
              <Badge size={16} />
              <Monitor size={16} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-white font-black text-sm leading-tight tracking-wide">LS</h1>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -right-3 bg-slate-800 text-white rounded-full p-1 shadow-lg hover:bg-slate-700 transition-colors z-50 border border-slate-700"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Search Bar */}
      {isOpen && (
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e24] border border-slate-700 rounded py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Menu List */}
      <nav className="flex-1 overflow-y-auto px-2 pb-20 scrollbar-thin space-y-1">
        {filteredItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div 
                onClick={() => isOpen && toggleSubmenu(item.name)}
                className={`flex items-center justify-between px-3 py-2.5 rounded transition-all duration-200 cursor-pointer text-slate-300 hover:bg-[#222222] hover:text-white ${expandedMenus[item.name] ? 'bg-[#1a1a1a]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-blue-600 ${!isOpen && 'mx-auto'}`}>{item.icon}</span>
                  {isOpen && <span className="text-[13px] font-semibold">{item.name}</span>}
                </div>
                {isOpen && (
                  <span className="text-slate-500">
                    {expandedMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2.5 rounded transition-all duration-200 group
                  ${isActive ? 'bg-[#2a2a2a] text-white shadow-sm' : 'text-slate-300 hover:bg-[#222222] hover:text-white'}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-blue-600 ${!isOpen && 'mx-auto'}`}>{item.icon}</span>
                  {isOpen && <span className="text-[13px] font-semibold">{item.name}</span>}
                </div>
                {isOpen && <ChevronRight size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />}
                
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            )}

            {/* Nested Menu Items */}
            {item.subItems && isOpen && expandedMenus[item.name] && (
              <div className="ml-5 mt-1 border-l-2 border-[#1e50a6] pl-2 space-y-1">
                {item.subItems.map((sub, idx) => (
                  <NavLink
                    key={sub}
                    to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({ isActive }) => `
                      flex items-center text-[12px] py-2 px-2 rounded
                      ${isActive ? 'text-white font-medium bg-[#1e1e24]' : 'text-slate-400 hover:text-white hover:bg-[#1e1e24]'}
                    `}
                  >
                    <span className="text-[#1e50a6] font-bold mr-2">{idx + 1}</span> {sub}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      {/* Scrollbar styles specific to sidebar */}
      <style>{`
        nav::-webkit-scrollbar {
          width: 4px;
        }
        nav::-webkit-scrollbar-track {
          background: #111;
        }
        nav::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
