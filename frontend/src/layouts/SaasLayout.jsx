import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Server, Users, Settings, LogOut, Activity, CreditCard } from 'lucide-react';
import useAuthStore from '../store/authStore';

const SaasLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-200">
      
      {/* SaaS Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
            <Server size={24} className="text-white" />
          </div>
          <h1 className="font-black text-xl text-white tracking-wider">LODHI SAAS</h1>
          <p className="text-xs text-blue-400 font-medium">Super Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/saas" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Activity size={18} /> Dashboard
          </NavLink>
          <NavLink to="/saas/schools" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Users size={18} /> Registered Schools
          </NavLink>
          <NavLink to="/saas/billing" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <CreditCard size={18} /> Subscriptions & Billing
          </NavLink>
          <NavLink to="/saas/settings" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
            <Settings size={18} /> Global Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} /> Logout Super Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* SaaS Header */}
        <header className="h-16 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between px-8 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">System Monitor</h2>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm font-medium bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SaasLayout;
