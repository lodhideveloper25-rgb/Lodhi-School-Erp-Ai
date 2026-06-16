import React, { useState, useEffect } from 'react';
import { Search, Plus, Users as FamilyIcon, FileText, ChevronRight } from 'lucide-react';
import api from '../services/api';

const Family = () => {
  const [students, setStudents] = useState([]);
  const [families, setFamilies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/data/Students');
        setStudents(res.data);
        
        // Group students by Family ID
        const grouped = {};
        res.data.forEach(student => {
          const fid = student.metadata?.familyId;
          if (fid) {
            if (!grouped[fid]) grouped[fid] = [];
            grouped[fid].push(student);
          }
        });
        setFamilies(grouped);
      } catch (err) {
        console.error('Error fetching students', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredFamilyIds = Object.keys(families).filter(fid => 
    fid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Family Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage grouped families and siblings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Assign Family ID
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by Family ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-slate-500 bg-white rounded-xl">Loading families...</div>
      ) : filteredFamilyIds.length === 0 ? (
        <div className="p-8 text-center text-slate-500 bg-white rounded-xl">No families found with this ID. Make sure to assign Family IDs to students.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFamilyIds.map(fid => (
            <div key={fid} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <FamilyIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{fid}</h3>
                    <p className="text-xs text-slate-500">{families[fid].length} Siblings enrolled</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full transition-colors">
                  <FileText size={14} /> Family Ledger
                </button>
              </div>
              <div className="p-4 space-y-3">
                {families[fid].map(child => (
                  <div key={child._id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{child.title}</p>
                      <p className="text-xs text-slate-500">Class: {child.metadata?.className} {child.metadata?.section} | Roll: {child.metadata?.rollNo}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Family;
