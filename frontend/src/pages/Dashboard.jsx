import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, UserPlus, BookOpen,
  TrendingUp, Wallet, ArrowUpRight, ArrowDownRight,
  Calendar, Clock, Award, Megaphone
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell,
  PieChart, Pie
} from 'recharts';
import api from '../services/api';

const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="glassmorphism p-6 rounded-2xl relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${color}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-20 ${color} text-white`}>
        {icon}
      </div>
      {trend && (
        <span className={`flex items-center text-xs font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Real-time school performance analytics and statistics.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-colors flex items-center gap-2">
             <Calendar size={16} /> Last 30 Days
           </button>
           <button className="gradient-btn text-sm">
             Generate Report
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={metrics ? metrics.totalStudents : '...'} icon={<Users size={24} />} trend={metrics ? 12 : 0} color="bg-blue-600" />
        <StatCard title="Total Teachers" value={metrics ? metrics.totalTeachers : '...'} icon={<UserCheck size={24} />} trend={metrics ? 4 : 0} color="bg-indigo-600" />
        <StatCard title="Active Classes" value={metrics ? metrics.totalClasses : '...'} icon={<BookOpen size={24} />} trend={metrics ? 0 : 0} color="bg-purple-600" />
        <StatCard title="Monthly Revenue" value={metrics ? `$${metrics.monthlyFeeCollection}` : '...'} icon={<Wallet size={24} />} trend={metrics ? 8.2 : 0} color="bg-emerald-600" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Area Chart */}
        <div className="xl:col-span-2 glassmorphism p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Income vs Expenses</h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                 <div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Income
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                 <div className="w-3 h-3 bg-pink-600 rounded-full"></div> Expense
               </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161937', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart / Attendance */}
        <div className="glassmorphism p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-8">Attendance Overview</h3>
          <div className="h-[250px]">
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
          <div className="space-y-4 mt-4">
             {pieData.map((item) => (
               <div key={item.name} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                   <span className="text-sm text-slate-400">{item.name}</span>
                 </div>
                 <span className="text-sm font-bold text-white">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Quick Action Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glassmorphism p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-white mb-6">Recent Notices</h3>
           <div className="space-y-4">
              {notices.length > 0 ? notices.map((notice) => (
                <div key={notice._id} className="flex gap-4 p-4 bg-slate-900/40 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <div className="min-w-[48px] h-12 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{notice.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notice.description}</p>
                    <span className="text-[10px] text-slate-600 mt-2 block">{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                </div>
              )) : (
                <div className="text-slate-400">No notices available at the moment.</div>
              )}
           </div>
         </div>

         <div className="glassmorphism p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-white mb-6">Upcoming Exams</h3>
           <div className="space-y-4">
              {exams.length > 0 ? exams.map((exam) => (
                <div key={exam._id} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-600/20 text-purple-400 rounded-lg flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{exam.subject}</h4>
                      <p className="text-xs text-slate-500">{exam.className || exam.class || 'Class not set'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-indigo-400">{exam.date ? new Date(exam.date).toLocaleDateString() : 'TBD'}</p>
                    <p className="text-[10px] text-slate-600">{exam.startTime || 'Time TBD'}</p>
                  </div>
                </div>
              )) : (
                <div className="text-slate-400">No upcoming exams scheduled.</div>
              )}
           </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
