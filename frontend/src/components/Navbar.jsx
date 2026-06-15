import React from 'react';
import { Bell, Search, Moon, Sun, Maximize, MessageSquare } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuthStore();

  return (
    <header className="h-20 glassmorphism border-0 border-b flex items-center justify-between px-6 z-40 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-xl font-bold text-white hidden md:block">
          Welcome, {user?.name.split(' ')[0]} 👋
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative hidden lg:block mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search everything..."
            className="bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white w-64 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Buttons */}
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-dark-bg"></span>
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors hidden sm:flex">
          <MessageSquare size={20} />
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors hidden sm:flex">
          <Moon size={20} />
        </button>

        <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{user?.role}</p>
          </div>
          <div className="w-10 h-10 border-2 border-indigo-600 rounded-full overflow-hidden p-[2px]">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
