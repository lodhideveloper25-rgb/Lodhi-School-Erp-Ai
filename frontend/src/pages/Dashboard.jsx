import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, UserPlus, BookOpen,
  TrendingUp, Wallet, ArrowUpRight, ArrowDownRight,
  Calendar, Clock, Award, Megaphone, Backpack, ShoppingCart, 
  ThumbsUp, Eye, Search, BarChart3
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell,
  PieChart, Pie
} from 'recharts';
import api from '../services/api';

const WhiteStatCard = ({ title, value, subtext, icon, colorClass }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white ${colorClass}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-slate-600 text-[13px] font-medium">{title}</h3>
      <p className="text-xl font-bold text-slate-800">{value}</p>
      {subtext && <p className="text-[10px] text-slate-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

const ColorStatCard = ({ title, value, subtext, icon, bgClass, extra }) => (
  <div className={`${bgClass} p-5 rounded-xl shadow-sm text-white flex flex-col justify-between hover:-translate-y-1 transition-transform`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="opacity-80">{icon}</div>
        <h3 className="text-[15px] font-medium opacity-90">{title}</h3>
      </div>
    </div>
    <div className="mt-2">
      <p className="text-2xl font-bold mb-1 tracking-wide">{value}</p>
      {subtext && <p className="text-[11px] opacity-80">{subtext}</p>}
      {extra && <div className="mt-3">{extra}</div>}
    </div>
  </div>
);

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [notices, setNotices] = useState([]);
  const [exams, setExams] = useState([]);
  const [areaData, setAreaData] = useState([
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Present', value: 85, color: '#6366f1' },
    { name: 'Absent', value: 10, color: '#f43f5e' },
    { name: 'Late', value: 5, color: '#f59e0b' },
  ]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [{ data: metricsData }, { data: noticesData }, { data: examsData }] = await Promise.all([
          api.get('/dashboard'),
          api.get('/notices'),
          api.get('/exams')
        ]);

        setMetrics(metricsData);
        setNotices(noticesData.slice(0, 3));
        setExams(examsData.slice(0, 3));

        setAreaData([
          { name: 'Jan', income: metricsData.monthlyFeeCollection || 0, expense: metricsData.totalExpenses || 0 },
          { name: 'Feb', income: metricsData.monthlyFeeCollection || 0, expense: metricsData.totalExpenses || 0 },
          { name: 'Mar', income: metricsData.monthlyFeeCollection || 0, expense: metricsData.totalExpenses || 0 },
          { name: 'Apr', income: metricsData.monthlyFeeCollection || 0, expense: metricsData.totalExpenses || 0 },
          { name: 'May', income: metricsData.monthlyFeeCollection || 0, expense: metricsData.totalExpenses || 0 },
          { name: 'Jun', income: metricsData.monthlyFeeCollection || 0, expense: metricsData.totalExpenses || 0 },
        ]);

        setPieData([
          { name: 'Present', value: metricsData.presentStudents || 0, color: '#6366f1' },
          { name: 'Absent', value: metricsData.absentStudents || 0, color: '#f43f5e' },
          { name: 'Late', value: Math.max(0, 100 - ((metricsData.presentStudents || 0) + (metricsData.absentStudents || 0))), color: '#f59e0b' },
        ]);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-light text-slate-800 tracking-wide">Smart Angels</h1>
          <h1 className="text-2xl font-light text-slate-800 tracking-wide">Grammar School</h1>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center text-sm">
            <span className="text-blue-500 font-medium">Home</span>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Dashboard</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-[#007bff] hover:bg-blue-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-sm font-medium transition-colors">
              <Eye size={16} /> Show Data
            </button>
            <button className="bg-[#007bff] hover:bg-blue-600 text-white px-3 py-1.5 rounded flex items-center justify-center transition-colors">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Row 1 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WhiteStatCard 
          title="Total Classes" 
          value={metrics ? metrics.totalClasses : '****'} 
          subtext="****"
          icon={<Backpack size={28} />} 
          colorClass="bg-[#00c0ef]" 
        />
        <WhiteStatCard 
          title="Students" 
          value={metrics ? metrics.totalStudents : '****'} 
          subtext="T: **** | D: ****"
          icon={<Users size={28} />} 
          colorClass="bg-[#dd4b39]" 
        />
        <WhiteStatCard 
          title="Revenue Today" 
          value="****" 
          subtext="****"
          icon={<ShoppingCart size={28} />} 
          colorClass="bg-[#00a65a]" 
        />
        <WhiteStatCard 
          title="Staff" 
          value={metrics ? metrics.totalTeachers : '****'} 
          subtext="****"
          icon={<ThumbsUp size={28} />} 
          colorClass="bg-[#f39c12]" 
        />
      </div>

      {/* Row 2 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ColorStatCard 
          title="Net Profit" 
          value="****" 
          subtext="This Month's Balance"
          icon={<Wallet size={20} />} 
          bgClass="bg-[#28a745]" 
        />
        <ColorStatCard 
          title="Expenses" 
          value="****" 
          subtext="Total Outgoings"
          icon={<ShoppingCart size={20} />} 
          bgClass="bg-[#dc3545]" 
        />
        <ColorStatCard 
          title="Revenue this month" 
          value="****" 
          subtext="Total revenue"
          icon={<Users size={20} />} 
          bgClass="bg-[#20c997]" 
        />
        <ColorStatCard 
          title="Collection" 
          value="****" 
          icon={<BarChart3 size={20} />} 
          bgClass="bg-[#6f42c1]" 
          extra={
            <div className="space-y-1">
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[30%] rounded-full"></div>
              </div>
              <div className="text-[10px] opacity-80 flex justify-between mt-1">
                <span>Active Expected: ****</span>
              </div>
              <div className="text-[10px] opacity-80 flex justify-between">
                <span>Deactive Expected: ****</span>
              </div>
            </div>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
        {/* Main Area Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <button className="bg-slate-500 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
              Show Chart Data
            </button>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                 <div className="w-3 h-3 bg-[#6366f1] rounded-full"></div> Income
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                 <div className="w-3 h-3 bg-[#f43f5e] rounded-full"></div> Expense
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart / Attendance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Overview</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-6">
             {pieData.map((item) => (
               <div key={item.name} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                   <span className="text-sm font-medium text-slate-600">{item.name}</span>
                 </div>
                 <span className="text-sm font-bold text-slate-800">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
