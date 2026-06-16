import React from 'react';
import { Bell, Search, Maximize, MessageSquare, Menu, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuthStore();

  return (
    <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile / Toggle Menu */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
          <span className="uppercase tracking-wide">Logged in as:</span>
          <span className="text-black font-bold">{user?._id?.substring(0,5) || '13588'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification Bell */}
        <button className="p-1.5 text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors relative">
          <Bell size={20} className="fill-current" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="/Focus • ↑↓ = Navigate E"
            className="bg-white border-2 border-blue-500 rounded-full py-1.5 pl-9 pr-4 text-sm text-slate-700 w-64 focus:outline-none shadow-sm focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 placeholder:text-xs font-medium"
          />
        </div>

        {/* Language Dropdown */}
        <button className="hidden sm:flex items-center gap-1 bg-white border border-slate-300 rounded px-2 py-1 text-sm font-medium hover:bg-slate-50">
          A <ChevronDown size={14} />
        </button>

        {/* Fullscreen Toggle */}
        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors hidden sm:flex">
          <Maximize size={18} />
        </button>

        {/* School Logo / Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white ml-2">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'School'}&background=fff&color=000&rounded=true&bold=true`}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
