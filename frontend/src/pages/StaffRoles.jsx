import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, X, Trash2, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const StaffRoles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom Form State for Staff Roles
  const [formData, setFormData] = useState({ 
    roleName: '', 
    description: '',
    permissions: {
      read: true,
      write: false,
      delete: false,
      admin: false
    }
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/data/StaffRoles');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [e.target.name]: e.target.checked
      }
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.roleName) return alert('Role Name is required');
      
      const selectedPermissions = Object.keys(formData.permissions)
        .filter(key => formData.permissions[key])
        .join(', ');

      // Send data to dynamic backend
      await api.post('/data/StaffRoles', {
        title: formData.roleName,
        description: formData.description,
        permissions: formData.permissions,
        permissionString: selectedPermissions
      });
      
      setFormData({ 
        roleName: '', 
        description: '',
        permissions: { read: true, write: false, delete: false, admin: false }
      });
      setIsModalOpen(false);
      fetchData(); // Refresh list
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this role?')) {
      try {
        await api.delete(`/data/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting data', error);
      }
    }
  };

  const filteredData = data.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Staff Roles & Permissions</h1>
          <p className="text-slate-500 text-sm mt-1">Manage access control for staff members</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Role
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Total Roles: {filteredData.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold w-16">ID</th>
                <th className="p-4 font-semibold">Role Name</th>
                <th className="p-4 font-semibold">Permissions</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">Loading roles...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                        <ShieldCheck size={24} className="text-blue-400" />
                      </div>
                      <p className="text-slate-600 font-medium text-base">No roles found</p>
                      <p className="text-sm mt-1">Click "Add Role" to define your first staff role.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-600 font-mono text-xs">R-{index + 1}</td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.metadata?.permissions?.read && <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] rounded border border-green-200">Read</span>}
                        {item.metadata?.permissions?.write && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded border border-blue-200">Write</span>}
                        {item.metadata?.permissions?.delete && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] rounded border border-red-200">Delete</span>}
                        {item.metadata?.permissions?.admin && <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] rounded border border-purple-200">Admin</span>}
                        {!item.metadata?.permissions && <span className="text-slate-400 text-xs">No permissions</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Add New Role</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role Name *</label>
                <input 
                  type="text" 
                  value={formData.roleName}
                  onChange={(e) => setFormData({...formData, roleName: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g., Librarian, Accountant" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  rows="2" 
                  placeholder="What can this role do?" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" name="read" checked={formData.permissions.read} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    Read / View
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" name="write" checked={formData.permissions.write} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    Write / Create
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" name="delete" checked={formData.permissions.delete} onChange={handleCheckboxChange} className="w-4 h-4 text-red-500 rounded focus:ring-red-500" />
                    Delete
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" name="admin" checked={formData.permissions.admin} onChange={handleCheckboxChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                    Full Admin
                  </label>
                </div>
              </div>

            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffRoles;
