import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, X, Trash2, FileText } from 'lucide-react';
import api from '../services/api';

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom Form State for Billing
  const [formData, setFormData] = useState({ 
    invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`, 
    studentName: '',
    studentId: '',
    amount: '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/data/Billing');
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
      if (!formData.studentName || !formData.amount) return alert('Student Name and Amount are required');
      
      // Send data to dynamic backend
      await api.post('/data/Billing', {
        title: `Invoice #${formData.invoiceNo}`,
        description: `Billed to: ${formData.studentName} (${formData.studentId})`,
        invoiceNo: formData.invoiceNo,
        studentName: formData.studentName,
        studentId: formData.studentId,
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        status: 'Pending' // override default Active
      });
      
      setFormData({ 
        invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`, 
        studentName: '',
        studentId: '',
        amount: '',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      setIsModalOpen(false);
      fetchData(); // Refresh list
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this invoice?')) {
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
    item.metadata?.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
          <p className="text-slate-500 text-sm mt-1">Manage student fee invoices and billing history</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} /> Create Invoice
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
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Total Invoices: {filteredData.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold">Invoice No</th>
                <th className="p-4 font-semibold">Student Details</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Due Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">Loading invoices...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                        <FileText size={24} className="text-blue-400" />
                      </div>
                      <p className="text-slate-600 font-medium text-base">No invoices found</p>
                      <p className="text-sm mt-1">Click "Create Invoice" to bill a student.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-800 font-bold">{item.metadata?.invoiceNo || item.title}</td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700">{item.metadata?.studentName || 'N/A'}</p>
                      <p className="text-xs text-slate-500 mt-1">ID: {item.metadata?.studentId || 'N/A'}</p>
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      ${item.metadata?.amount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {item.metadata?.dueDate ? new Date(item.metadata.dueDate).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        {item.status || 'Pending'}
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

      {/* Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Create Invoice</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Number</label>
                  <input 
                    type="text" 
                    value={formData.invoiceNo}
                    disabled
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date *</label>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Student Name *</label>
                  <input 
                    type="text" 
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g., Ali Khan" 
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                  <input 
                    type="text" 
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g., ST-2024-001" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount ($) *</label>
                <input 
                  type="number" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="0.00" 
                />
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
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
