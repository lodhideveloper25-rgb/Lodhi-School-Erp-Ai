import React, { useState, useEffect } from 'react';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import api from '../services/api';

const StudentPromote = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [currentClass, setCurrentClass] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [targetSection, setTargetSection] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/data/Students');
        setStudents(res.data);
      } catch (err) {
        console.error('Error fetching students', err);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = () => {
    if (!currentClass) return alert('Please select current class');
    const filtered = students.filter(s => 
      s.metadata?.className === currentClass && 
      (currentSection ? s.metadata?.section === currentSection : true) &&
      (s.status || 'Active') === 'Active'
    );
    setFilteredStudents(filtered);
  };

  const handlePromote = async () => {
    if (!targetClass) return alert('Please select target class for promotion');
    if (filteredStudents.length === 0) return alert('No students to promote');
    if(window.confirm(`Are you sure you want to promote ${filteredStudents.length} students to ${targetClass}?`)) {
      setIsLoading(true);
      try {
        // In a real app, you would make a bulk update API call.
        // Here we simulate it by updating each via generic endpoint sequentially
        for (const student of filteredStudents) {
          const updatedMeta = { ...student.metadata, className: targetClass };
          if (targetSection) updatedMeta.section = targetSection;
          await api.put(`/data/${student._id}`, { metadata: updatedMeta });
        }
        alert('Students promoted successfully!');
        
        // Refresh
        const res = await api.get('/data/Students');
        setStudents(res.data);
        setFilteredStudents([]);
        setCurrentClass('');
        setCurrentSection('');
        setTargetClass('');
        setTargetSection('');
      } catch (err) {
        console.error(err);
        alert('Error promoting students');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <ArrowRight size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Promote Students</h1>
          <p className="text-slate-500 text-sm mt-1">Upgrade students to the next academic class</p>
        </div>
      </div>

      {/* Promotion Config Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-700 border-b pb-2">From Current Session</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Current Class</label>
                <select value={currentClass} onChange={e => setCurrentClass(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
                  <option value="">Select</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Current Section (Opt)</label>
                <select value={currentSection} onChange={e => setCurrentSection(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
                  <option value="">Select</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center pb-2">
            <ArrowRight size={32} className="text-slate-300" />
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-green-700 border-b pb-2">To Next Session</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Target Class</label>
                <select value={targetClass} onChange={e => setTargetClass(e.target.value)} className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm bg-green-50 focus:border-green-500 outline-none">
                  <option value="">Select</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Target Section (Opt)</label>
                <select value={targetSection} onChange={e => setTargetSection(e.target.value)} className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm bg-green-50 focus:border-green-500 outline-none">
                  <option value="">Same as Current</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 flex justify-center border-t border-slate-100 pt-6">
          <button onClick={handleSearch} className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-colors">
            Search Students to Promote
          </button>
        </div>
      </div>

      {/* Eligible Students List */}
      {filteredStudents.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-700">Eligible Students ({filteredStudents.length})</h3>
            <button 
              onClick={handlePromote} 
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : <><CheckCircle size={16} /> Promote All</>}
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredStudents.map(student => (
              <div key={student._id} className="p-3 border border-slate-200 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{student.title}</p>
                  <p className="text-xs text-slate-500">Roll: {student.metadata?.rollNo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentPromote;
