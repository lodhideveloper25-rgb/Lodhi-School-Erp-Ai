import { useState, useEffect } from 'react';
import { PieChart, Download, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Reports = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <PieChart className="text-fuchsia-500" />
          Smart Reports & Analytics
        </h2>
        <p className="text-slate-400 text-sm mt-1">Generate AI-driven insights and school reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-2xl border border-slate-700/50 group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Student Performance</h3>
          <p className="text-sm text-slate-400 mb-6">Total Students: {metrics?.totalStudents ?? '—'}</p>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            <Download size={16}/> Generate PDF
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl border border-slate-700/50 group">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Fee Defaulter Prediction</h3>
          <p className="text-sm text-slate-400 mb-6">Pending Fees: {metrics?.pendingFees ?? '—'}</p>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            <Download size={16}/> Generate PDF
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl border border-slate-700/50 group">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <PieChart size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Monthly Financial Report</h3>
          <p className="text-sm text-slate-400 mb-6">Monthly Collected: {metrics?.monthlyFeeCollection ?? '—'}</p>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            <Download size={16}/> Generate Excel
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Reports;
