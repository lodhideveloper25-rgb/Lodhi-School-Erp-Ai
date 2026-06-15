import { Bell, Search, UserCircle, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 glass border-b border-slate-700/50 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search students, classes..." 
            className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Super Admin</p>
            <p className="text-xs text-slate-400">admin@lodherp.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white cursor-pointer hover:shadow-lg transition-shadow">
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
