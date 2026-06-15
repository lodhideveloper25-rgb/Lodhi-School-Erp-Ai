import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background glow effects for premium look */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10 mix-blend-screen pointer-events-none"></div>
        
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
