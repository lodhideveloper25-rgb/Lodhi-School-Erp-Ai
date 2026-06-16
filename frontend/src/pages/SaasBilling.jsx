import React, { useState } from 'react';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Download, X, Save } from 'lucide-react';

const SaasBilling = () => {
  // Mock data for SaaS Billing & Subscriptions
  const [transactions] = useState([
    { id: 'TRX-001', schoolName: 'Smart Angels Grammar School', plan: 'Premium', amount: 2000, date: '2026-06-15', status: 'Completed' },
    { id: 'TRX-002', schoolName: 'City Public School', plan: 'Basic', amount: 500, date: '2026-06-14', status: 'Completed' },
    { id: 'TRX-003', schoolName: 'Global International Academy', plan: 'Enterprise', amount: 5000, date: '2026-06-12', status: 'Pending' },
    { id: 'TRX-004', schoolName: 'Sunrise High', plan: 'Free Trial', amount: 0, date: '2026-06-10', status: 'Active' },
  ]);

  const [plans, setPlans] = useState([
    { id: 'free', name: 'Free Trial', features: '14 Days Access', price: '0', period: '' },
    { id: 'basic', name: 'Basic', features: 'Up to 500 Students', price: '500', period: '/m' },
    { id: 'premium', name: 'Premium', features: 'Up to 2000 Students', price: '2000', period: '/m' },
    { id: 'enterprise', name: 'Enterprise', features: 'Unlimited Students', price: 'Custom', period: '' }
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const openEditModal = (plan) => {
    setEditingPlan({ ...plan });
    setIsEditModalOpen(true);
  };

  const saveEdit = () => {
    setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-slate-200 relative">
      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <CreditCard size={28} className="text-emerald-400" />
          <h1 className="text-2xl font-semibold text-white">Subscriptions & Billing</h1>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Revenue Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign size={64} /></div>
          <p className="text-sm font-medium text-slate-400">Monthly Recurring Revenue (MRR)</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-2">Rs 250,000</h3>
          <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
            <ArrowUpRight size={14} /> +12% from last month
          </p>
        </div>
        
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard size={64} /></div>
          <p className="text-sm font-medium text-slate-400">Active Paid Subscriptions</p>
          <h3 className="text-3xl font-bold text-white mt-2">142 Schools</h3>
          <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
            <ArrowUpRight size={14} /> +5 new this week
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign size={64} /></div>
          <p className="text-sm font-medium text-slate-400">Pending Payments</p>
          <h3 className="text-3xl font-bold text-red-400 mt-2">Rs 15,000</h3>
          <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
            <ArrowDownRight size={14} /> 3 schools overdue
          </p>
        </div>
      </div>

      {/* Subscription Plans Configuration */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Manage Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="border border-slate-700 bg-slate-900/50 rounded-lg p-4 flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <h3 className="font-bold text-blue-400">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.features}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-white">
                  {plan.price === 'Custom' ? 'Custom' : `Rs ${plan.price}${plan.period}`}
                </span>
                <button 
                  onClick={() => openEditModal(plan)}
                  className="text-xs text-slate-300 hover:text-white hover:bg-slate-700 px-2 py-1 rounded transition-colors"
                >
                  Edit Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Recent School Payments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="p-4 font-medium">Transaction ID</th>
                <th className="p-4 font-medium">School Name</th>
                <th className="p-4 font-medium">Plan Renewed</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-800/80 transition-colors">
                  <td className="p-4 font-mono text-blue-400 text-xs">{trx.id}</td>
                  <td className="p-4 font-medium text-white">{trx.schoolName}</td>
                  <td className="p-4">{trx.plan}</td>
                  <td className="p-4 font-medium">Rs {trx.amount.toLocaleString()}</td>
                  <td className="p-4">{trx.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      trx.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      trx.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Plan Modal */}
      {isEditModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-slate-800/50">
              <h3 className="text-lg font-semibold text-white">Edit Subscription Plan</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Plan Name</label>
                <input 
                  type="text" 
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Features Description</label>
                <input 
                  type="text" 
                  value={editingPlan.features}
                  onChange={(e) => setEditingPlan({...editingPlan, features: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Up to 500 Students"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Price (Rs)</label>
                  <input 
                    type="text" 
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({...editingPlan, price: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Billing Period</label>
                  <select 
                    value={editingPlan.period}
                    onChange={(e) => setEditingPlan({...editingPlan, period: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">None (One-time/Custom)</option>
                    <option value="/m">Per Month (/m)</option>
                    <option value="/y">Per Year (/y)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-800 bg-slate-800/50 flex justify-end gap-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Save size={16} /> Update Plan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SaasBilling;
