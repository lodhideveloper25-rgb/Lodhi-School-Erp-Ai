import React, { useState, useEffect } from 'react';
import { Building2, Search, Edit, ShieldBan, Trash2, X, Save } from 'lucide-react';
import api from '../services/api';

const SaasSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await api.get('/saas/schools');
      setSchools(res.data);
    } catch (err) {
      console.error("Failed to fetch schools", err);
      // Removed dummy data
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to change status to ${status}?`)) return;
    try {
      await api.put(`/saas/schools/${id}/status`, { status });
      fetchSchools();
    } catch (err) {
      // For mock UI, update state directly if API fails
      setSchools(schools.map(s => s._id === id ? { ...s, status } : s));
    }
  };

  const deleteSchool = async (id) => {
    if (!window.confirm("WARNING: This will delete the school and ALL its data permanently! Proceed?")) return;
    try {
      await api.delete(`/saas/schools/${id}`);
      fetchSchools();
    } catch (err) {
      // For mock UI, update state directly if API fails
      setSchools(schools.filter(s => s._id !== id));
    }
  };

  const openEditModal = (school) => {
    setEditingSchool({ ...school });
    setIsEditModalOpen(true);
  };

  const saveEdit = async () => {
    try {
      // Calculate days difference for expiry if needed, or send raw date
      await api.put(`/saas/schools/${editingSchool._id}/plan`, { 
        plan: editingSchool.plan,
        expiryDays: 30 // Example
      });
      fetchSchools();
    } catch (err) {
      // For mock UI, update state directly if API fails
      setSchools(schools.map(s => s._id === editingSchool._id ? editingSchool : s));
    } finally {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <div className="flex items-center gap-3 text-white">
          <Building2 size={28} className="text-blue-400" />
          <h1 className="text-2xl font-semibold">Tenant Schools</h1>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search schools..." 
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="p-4 font-medium">School Code</th>
                <th className="p-4 font-medium">School Name</th>
                <th className="p-4 font-medium">Admin Email</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Expiry Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan="7" className="p-8 text-center text-slate-500">Loading schools...</td></tr>
              ) : schools.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-slate-500">No schools registered yet.</td></tr>
              ) : (
                schools.map((school) => (
                  <tr key={school._id} className="hover:bg-slate-800/80 transition-colors">
                    <td className="p-4 font-mono text-blue-400">{school.schoolCode}</td>
                    <td className="p-4 font-medium text-white">{school.schoolName}</td>
                    <td className="p-4">{school.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-medium border border-purple-500/30">
                        {school.plan}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(school.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        school.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        school.status === 'Suspended' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {school.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => openEditModal(school)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors" title="Edit School">
                          <Edit size={16} />
                        </button>
                        {school.status === 'Active' ? (
                          <button onClick={() => updateStatus(school._id, 'Suspended')} className="p-1.5 text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors" title="Suspend">
                            <ShieldBan size={16} />
                          </button>
                        ) : (
                          <button onClick={() => updateStatus(school._id, 'Active')} className="p-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors" title="Activate">
                            <ShieldBan size={16} />
                          </button>
                        )}
                        <button onClick={() => deleteSchool(school._id)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Delete Permanently">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit School Modal */}
      {isEditModalOpen && editingSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-slate-800/50">
              <h3 className="text-lg font-semibold text-white">Edit School Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">School Name</label>
                <input 
                  type="text" 
                  value={editingSchool.schoolName}
                  onChange={(e) => setEditingSchool({...editingSchool, schoolName: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Subscription Plan</label>
                <select 
                  value={editingSchool.plan}
                  onChange={(e) => setEditingSchool({...editingSchool, plan: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Free">Free Trial</option>
                  <option value="Basic">Basic Plan</option>
                  <option value="Premium">Premium Plan</option>
                  <option value="Enterprise">Enterprise Plan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  value={editingSchool.expiryDate.split('T')[0]}
                  onChange={(e) => setEditingSchool({...editingSchool, expiryDate: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
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
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SaasSchools;
