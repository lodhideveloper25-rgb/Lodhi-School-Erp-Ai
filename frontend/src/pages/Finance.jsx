import { useState, useEffect } from 'react';
import api from '../services/api';
import { DollarSign, Plus, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchFinances = async () => {
      try {
        const { data } = await api.get('/operations/finance');
        const mapped = data.map(f => ({ _id: f._id, date: new Date(f.date).toISOString().split('T')[0], title: f.title, category: f.category, amount: f.amount, type: f.type || f.type }));
        setTransactions(mapped);
      } catch (err) {
        console.error('Failed to load finances', err);
      }
    };
    fetchFinances();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="text-emerald-500" />
            Finance & Accounting
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track school income, expenses, and net profit</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/50 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Expense
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Income
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass p-6 rounded-2xl border border-emerald-500/30 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm flex items-center gap-2"><TrendingUp size={16} className="text-emerald-400"/> Total Income</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-2">$48,500</h3>
        </div>
        <div className="glass p-6 rounded-2xl border border-red-500/30 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm flex items-center gap-2"><TrendingDown size={16} className="text-red-400"/> Total Expenses</p>
          <h3 className="text-3xl font-bold text-red-400 mt-2">$12,800</h3>
        </div>
        <div className="glass p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm flex items-center gap-2"><DollarSign size={16} className="text-blue-400"/> Net Profit</p>
          <h3 className="text-3xl font-bold text-blue-400 mt-2">$35,700</h3>
        </div>
      </div>

      <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50">
                <th className="p-4 text-sm font-medium text-slate-300">Date</th>
                <th className="p-4 text-sm font-medium text-slate-300">Title</th>
                <th className="p-4 text-sm font-medium text-slate-300">Category</th>
                <th className="p-4 text-sm font-medium text-slate-300 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={t._id} 
                  className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4 text-sm text-slate-400">{t.date}</td>
                  <td className="p-4 text-sm font-medium text-white">{t.title}</td>
                  <td className="p-4 text-sm text-slate-400">{t.category}</td>
                  <td className={`p-4 text-sm font-bold text-right ${t.type === 'Income' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
