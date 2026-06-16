import React, { useState, useEffect } from 'react';
import { Building2, Users, GraduationCap, DollarSign } from 'lucide-react';
import api from '../services/api';

const SaasDashboard = () => {
  const [stats, setStats] = useState({
    totalSchools: 0,
    activeSchools: 0,
    expiredSchools: 0,
    totalStudents: 0,
    totalTeachers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/saas/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch SaaS stats", err);
        // Removed fallback mock data as requested by user
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <h1 className="text-2xl font-semibold text-white">Super Admin Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Schools */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Registered Schools</p>
              <h3 className="text-3xl font-bold text-white mt-2">{stats.totalSchools}</h3>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Building2 className="text-blue-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-400 font-medium">{stats.activeSchools} Active</span>
            <span className="text-slate-500 mx-2">|</span>
            <span className="text-red-400 font-medium">{stats.expiredSchools} Expired</span>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Global Students</p>
              <h3 className="text-3xl font-bold text-white mt-2">{stats.totalStudents}</h3>
            </div>
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <GraduationCap className="text-indigo-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-400">
            Across all tenant databases
          </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Global Teachers</p>
              <h3 className="text-3xl font-bold text-white mt-2">{stats.totalTeachers}</h3>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-400">
            Across all tenant databases
          </div>
        </div>

        {/* Monthly Revenue (Mock) */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Estimated MRR</p>
              <h3 className="text-3xl font-bold text-emerald-400 mt-2">$ {(stats.activeSchools * 99).toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <DollarSign className="text-emerald-400" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-400">
            Based on average plan value
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaasDashboard;
