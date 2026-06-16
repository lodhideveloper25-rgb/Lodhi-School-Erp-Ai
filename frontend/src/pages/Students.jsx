import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Trash2, Edit, Eye, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Students = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Add Student Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: '', studentName: '', className: '', section: '', gender: '', contact: '', familyId: '', status: 'Active'
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetching from GenericData model where moduleName="Students"
      const response = await api.get('/data/Students');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.rollNo || !formData.studentName) return alert('Roll Number and Name are required');
    try {
      const payload = {
        title: formData.studentName,
        description: 'Student Record',
        metadata: formData,
        status: formData.status
      };
      await api.post('/data/Students', payload);
      setFormData({ rollNo: '', studentName: '', className: '', section: '', gender: '', contact: '', familyId: '', status: 'Active' });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/data/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting student', error);
      }
    }
  };

  // Filtering logic
  const filteredData = data.filter(item => {
    const meta = item.metadata || {};
    const nameMatch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                      (meta.rollNo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const classMatch = classFilter ? meta.className === classFilter : true;
    const sectionMatch = sectionFilter ? meta.section === sectionFilter : true;
    const statusMatch = statusFilter ? (item.status || 'Active') === statusFilter : true;
    return nameMatch && classMatch && sectionMatch && statusMatch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and view all enrolled students</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Student
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by Name or Roll No..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
        </div>
        
        <select 
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-500 min-w-[120px]"
          value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">All Classes</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          <option value="Class 3">Class 3</option>
          <option value="Class 4">Class 4</option>
          <option value="Class 5">Class 5</option>
        </select>

        <select 
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-500 min-w-[120px]"
          value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>

        <select 
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-500 min-w-[120px]"
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Transferred">Transferred</option>
          <option value="Alumni">Alumni</option>
        </select>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold">Roll No</th>
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Class & Sec</th>
                <th className="p-4 font-semibold">Family ID</th>
                <th className="p-4 font-semibold">Gender</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-500">Loading students...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400">
                    <UserIcon size={24} className="mx-auto mb-2 opacity-50" />
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-blue-600">{item.metadata?.rollNo || 'N/A'}</td>
                    <td className="p-4 text-sm font-bold text-slate-700">{item.title}</td>
                    <td className="p-4 text-sm text-slate-600">{item.metadata?.className || 'N/A'} - {item.metadata?.section || 'N/A'}</td>
                    <td className="p-4 text-sm text-slate-600">{item.metadata?.familyId || 'None'}</td>
                    <td className="p-4 text-sm text-slate-600">{item.metadata?.gender || 'N/A'}</td>
                    <td className="p-4 text-sm text-slate-600">{item.metadata?.contact || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        (item.status || 'Active') === 'Active' ? 'bg-green-100 text-green-700' :
                        (item.status || 'Active') === 'Transferred' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => navigate('/student-profile')}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded" title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-green-500 hover:bg-green-50 rounded" title="Edit Student">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Delete">
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

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Add New Student</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Roll Number</label>
                  <input type="text" value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label>
                  <input type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                  <select value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                    <option value="">Select</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                  <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                    <option value="">Select</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact</label>
                  <input type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Family ID (for Siblings)</label>
                  <input type="text" value={formData.familyId} onChange={e => setFormData({...formData, familyId: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. FAM-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                    <option value="Active">Active</option>
                    <option value="Transferred">Transferred</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Students;
