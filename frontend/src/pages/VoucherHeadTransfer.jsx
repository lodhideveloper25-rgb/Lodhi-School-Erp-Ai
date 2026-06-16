import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Filter, X, Trash2, Repeat as PageIcon, UploadCloud } from 'lucide-react';
import api from '../services/api';

const VoucherHeadTransfer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({ fromHead: '', toHead: '', amount: '', date: new Date().toISOString().split('T')[0], });
  
  // Ref for file inputs
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/data/VoucherHeadTransfer');
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

  const handleSave = async () => {
    try {
      // Basic validation for the first field
      const firstField = 'fromHead';
      if (!formData[firstField]) return alert('Transfer From Head is required');
      
      const payload = {
        title: formData[firstField],
        description: 'Record created dynamically',
        ...formData
      };

      await api.post('/data/VoucherHeadTransfer', payload);
      setFormData({ fromHead: '', toHead: '', amount: '', date: new Date().toISOString().split('T')[0], });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/data/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting data', error);
      }
    }
  };

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, [fieldName]: e.target.files[0].name}); // store file name as mock
    }
  };

  const filteredData = data.filter(item => {
    const searchTarget = item.title?.toLowerCase() || '';
    return searchTarget.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Voucher Head Transfer</h1>
          <p className="text-slate-500 text-sm mt-1">Manage voucher head transfer records</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Total Records: {filteredData.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold w-16">ID</th>
                <th className="p-4 font-semibold">From Head</th>
                <th className="p-4 font-semibold">To Head</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">Loading data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <PageIcon size={24} className="text-slate-400" />
                      </div>
                      <p className="text-slate-600 font-medium text-base">No records found</p>
                      <p className="text-sm mt-1">Click "Add New" to create the first record.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-600 font-mono text-xs">#{index + 1}</td>
                    <td className="p-4 text-sm text-slate-700">{item.metadata?.fromHead || item.title || 'N/A'}</td>
                    <td className="p-4 text-sm text-slate-700">{item.metadata?.toHead || item.title || 'N/A'}</td>
                    <td className="p-4 text-sm font-semibold text-slate-700">{item.metadata?.amount || '0'}</td>
                    <td className="p-4 text-sm text-slate-700">{item.metadata?.date ? new Date(item.metadata.date).toLocaleDateString() : 'N/A'}</td>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Add New Voucher Head Transfer</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transfer From Head</label>
                <input 
                  type="text" 
                  value={formData.fromHead}
                  onChange={(e) => setFormData({...formData, fromHead: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter Transfer From Head..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transfer To Head</label>
                <input 
                  type="text" 
                  value={formData.toHead}
                  onChange={(e) => setFormData({...formData, toHead: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter Transfer To Head..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter Amount ($)..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transfer Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter Transfer Date..." 
                />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50 mt-auto">
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
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherHeadTransfer;
