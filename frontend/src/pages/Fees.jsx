import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  CreditCard, Search, Download, Printer,
  Plus, DollarSign, AlertCircle, FileText,
  Filter, CheckCircle
} from 'lucide-react';

const Fees = () => {
   const [fees, setFees] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [statusFilter, setStatusFilter] = useState('All');

   const filteredFees = fees.filter((fee) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = !query ||
         fee.studentName.toLowerCase().includes(query) ||
         fee.admissionNo.toLowerCase().includes(query) ||
         fee.month.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'All' || fee.status === statusFilter;
      return matchesSearch && matchesStatus;
   });

   useEffect(() => {
      const fetchFees = async () => {
         try {
            const { data } = await api.get('/fees');
            // backend returns fees with populated student/user
            const mapped = data.map(f => ({
               id: f._id,
               studentName: f.student?.user?.name || 'Unknown',
               admissionNo: f.student?.admissionNo || '',
               month: f.month,
               amount: f.amount,
               paid: f.paidAmount || f.paid || 0,
               status: f.status,
               date: f.createdAt
            }));
            setFees(mapped);
         } catch (err) {
            console.error('Failed to load fees', err);
         }
      };
      fetchFees();
   }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <CreditCard className="text-indigo-500" size={32} />
            Fee Management
          </h1>
          <p className="text-slate-400 mt-1">Collect fees, generate vouchers, and track payments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
            <FileText size={18} /> Bulk Vouchers
          </button>
          <button className="gradient-btn flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus size={18} /> Collect Fee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glassmorphism p-6 rounded-2xl flex items-center gap-6">
            <div className="w-14 h-14 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
               <DollarSign size={28} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Collected</p>
               <p className="text-2xl font-bold text-white">$12,450</p>
               <span className="text-[10px] text-green-400 font-bold">+12.5% from last month</span>
            </div>
         </div>
         <div className="glassmorphism p-6 rounded-2xl flex items-center gap-6">
            <div className="w-14 h-14 bg-amber-600/20 text-amber-400 rounded-2xl flex items-center justify-center shadow-inner">
               <AlertCircle size={28} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Pending</p>
               <p className="text-2xl font-bold text-white">$4,200</p>
               <span className="text-[10px] text-amber-400 font-bold">18 students remaining</span>
            </div>
         </div>
         <div className="glassmorphism p-6 rounded-2xl flex items-center gap-6">
            <div className="w-14 h-14 bg-emerald-600/20 text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner">
               <CheckCircle size={28} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Collection Rate</p>
               <p className="text-2xl font-bold text-white">84%</p>
               <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[84%]"></div>
               </div>
            </div>
         </div>
      </div>

      <div className="glassmorphism p-4 rounded-2xl flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
           <input
             type="text"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search by name or voucher..."
             className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
           />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500"
        >
           <option value="All">Filter: Status</option>
           <option value="Paid">Paid</option>
           <option value="Unpaid">Unpaid</option>
           <option value="Partial">Partial</option>
        </select>
        <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-slate-700 hover:text-white"><Download size={20}/></button>
        <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-slate-700 hover:text-white"><Printer size={20}/></button>
      </div>

      <div className="glassmorphism rounded-2xl overflow-hidden border border-slate-800/50">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Student</th>
                  <th className="px-6 py-4 font-semibold">Month</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount</th>
                  <th className="px-6 py-4 font-semibold text-right">Paid</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
               {filteredFees.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-800/20 transition-colors">
                     <td className="px-6 py-4">
                        <div>
                           <p className="text-white font-medium">{f.student}</p>
                           <p className="text-[10px] text-slate-500">{f.admissionNo}</p>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-slate-300 text-sm">{f.month}</td>
                     <td className="px-6 py-4 text-right text-white font-bold">${f.amount}</td>
                     <td className="px-6 py-4 text-right text-indigo-400 font-bold">${f.paid}</td>
                     <td className="px-6 py-4 text-center">
                        <span className={`
                           px-3 py-1 rounded-full text-[10px] font-bold uppercase
                           ${f.status === 'Paid' ? 'bg-green-600/10 text-green-400' :
                             f.status === 'Unpaid' ? 'bg-red-600/10 text-red-400' :
                             'bg-amber-600/10 text-amber-400'}
                        `}>
                           {f.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 text-indigo-400 hover:bg-indigo-600/10 rounded-lg" title="Print Receipt"><Printer size={16} /></button>
                           <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg" title="View History"><FileText size={16} /></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default Fees;
