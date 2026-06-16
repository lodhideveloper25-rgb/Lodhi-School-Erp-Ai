import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const OtherIncomeCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/data/OtherIncomeCategory');
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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!categoryName) return alert('Category Name is required');
    try {
      await api.post('/data/OtherIncomeCategory', { title: categoryName });
      setCategoryName('');
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

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto space-y-4">
      
      {/* Back Button */}
      <div>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded text-sm transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-[22px] font-normal text-[#212529]">Create Other Income Category</h1>
      </div>

      {/* Add Category Form Card */}
      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="px-4 py-3 border-b border-blue-500 border-t-2 border-t-blue-500">
          <h2 className="text-[14px] text-blue-500 font-normal">Add Category</h2>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-[13px] text-slate-700 font-bold mb-1">
                Category Name<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-[#ccc] rounded px-3 py-1.5 text-[14px] text-[#555] focus:outline-none focus:border-[#66afe9] focus:shadow-[inset_0_1px_1px_rgba(0,0,0,.075),0_0_8px_rgba(102,175,233,.6)] transition-all" 
                placeholder="Category Name"
              />
            </div>
            <div>
              <button 
                type="submit"
                className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-1.5 rounded text-[14px] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* All Categories Table Card */}
      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="px-4 py-3 border-b border-blue-500 border-t-2 border-t-blue-500">
          <h2 className="text-[14px] text-blue-500 font-normal">All Other Income Categories</h2>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#ddd]">
              <thead>
                <tr className="bg-white text-[#333] text-[13px]">
                  <th className="p-2 border border-[#ddd] font-bold w-12">#</th>
                  <th className="p-2 border border-[#ddd] font-bold">Category Name</th>
                  <th className="p-2 border border-[#ddd] font-bold w-20">Edit</th>
                  <th className="p-2 border border-[#ddd] font-bold w-20">Delete</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-slate-500">Loading...</td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3">
                      <div className="bg-[#f2dede] border border-[#ebccd1] text-[#a94442] px-4 py-3 rounded text-[14px]">
                        No Record Found!
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item._id} className="hover:bg-[#f5f5f5] text-[13px]">
                      <td className="p-2 border border-[#ddd]">{index + 1}</td>
                      <td className="p-2 border border-[#ddd] text-[#333]">{item.title}</td>
                      <td className="p-2 border border-[#ddd] text-center">
                        <button className="text-blue-500 hover:text-blue-700">Edit</button>
                      </td>
                      <td className="p-2 border border-[#ddd] text-center">
                        <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OtherIncomeCategory;
