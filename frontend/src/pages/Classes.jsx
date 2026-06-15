import React from 'react';
import { Plus, BookOpen, User, Users, MoreVertical, LayoutGrid } from 'lucide-react';

const ClassCard = ({ classData }) => (
  <div className="glassmorphism p-6 rounded-2xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
       <button className="p-1 text-slate-400 hover:text-white rounded-md bg-slate-800">
         <MoreVertical size={16} />
       </button>
    </div>

    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center">
        <LayoutGrid size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{classData.name}</h3>
        <p className="text-xs text-slate-500">{classData.sections.length} Sections Available</p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <User size={16} /> Class Teacher
        </div>
        <span className="text-white font-medium">{classData.classTeacher}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Users size={16} /> Total Students
        </div>
        <span className="text-white font-medium">{classData.totalStudents}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {classData.sections.map(sec => (
          <span key={sec} className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg text-xs font-bold border border-slate-700">
            Section {sec}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-slate-800 flex gap-3">
      <button className="flex-1 py-2 bg-indigo-600/10 text-indigo-400 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">
        View Timetable
      </button>
      <button className="flex-1 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-700 hover:text-white transition-all">
        Fee Structure
      </button>
    </div>
  </div>
);

import { useState, useEffect } from 'react';
import api from '../services/api';

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await api.get('/classes');
        const mapped = data.map(c => ({
          id: c._id,
          name: c.name,
          sections: c.sections || [],
          classTeacher: c.classTeacher?.name || '',
          totalStudents: c.totalStudents || 0
        }));
        setClasses(mapped);
      } catch (err) {
        console.error('Failed to load classes', err);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-indigo-500" size={32} />
            Academic Classes
          </h1>
          <p className="text-slate-400 mt-1">Configure classes, sections, and teacher assignments.</p>
        </div>
        <button className="gradient-btn flex items-center gap-2">
          <Plus size={18} /> Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <ClassCard key={c.id} classData={c} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
