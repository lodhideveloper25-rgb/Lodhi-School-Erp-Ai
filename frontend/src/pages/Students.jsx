import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Filter, Download, MoreVertical,
  Edit, Trash2, Eye, UserPlus, GraduationCap
} from 'lucide-react';
import api from '../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = students.filter((student) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query ||
      student.name.toLowerCase().includes(query) ||
      student.admissionNo.toLowerCase().includes(query) ||
      student.parentName.toLowerCase().includes(query) ||
      student.class.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get('/students');
        const mapped = data.map(s => ({
          id: s._id,
          name: s.user?.name || '',
          admissionNo: s.admissionNo || '',
          class: s.class?.name || '',
          section: s.section || '',
          parentName: s.parentName || '',
          status: s.isActive === false ? 'Inactive' : 'Active',
          image: s.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.user?.name || '')}`
        }));
        setStudents(mapped);
      } catch (err) {
        console.error('Failed to load students', err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="text-indigo-500" size={32} />
            Student Management
          </h1>
          <p className="text-slate-400 mt-1">Manage admissions, profiles, and student records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button className="gradient-btn flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus size={18} /> New Admission
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search by name, admission no, or parent..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-all">
            <option>All Classes</option>
            <option>Class 10</option>
            <option>Class 9</option>
          </select>
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glassmorphism rounded-2xl overflow-hidden border border-slate-800/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Student</th>
                <th className="px-6 py-4 font-semibold">Admission No</th>
                <th className="px-6 py-4 font-semibold">Class / Sec</th>
                <th className="px-6 py-4 font-semibold">Parent Details</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700">
                        <img src={student.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-white group-hover:text-indigo-400 transition-colors">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{student.admissionNo}</td>
                  <td className="px-6 py-4">
                    <span className="bg-indigo-600/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
                      {student.class} - {student.section}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{student.parentName}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                         <Eye size={18} />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-600/10 rounded-lg transition-colors">
                         <Edit size={18} />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-colors">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-800/50 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing 1-10 of 120 students</p>
          <div className="flex gap-2">
             <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded hover:text-white disabled:opacity-50 text-xs">Previous</button>
             <button className="px-3 py-1 bg-indigo-600 text-white rounded text-xs">1</button>
             <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded hover:text-white text-xs">2</button>
             <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded hover:text-white text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
