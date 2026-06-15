import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Search, MoreHorizontal, Mail, Phone, BookOpen, UserCheck } from 'lucide-react';

const TeacherCard = ({ teacher }) => (
  <div className="glassmorphism p-6 rounded-2xl group hover:border-indigo-500/50 transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/20 group-hover:border-indigo-500 transition-all">
        <img src={teacher.image} alt="" className="w-full h-full object-cover" />
      </div>
      <button className="text-slate-500 hover:text-white transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </div>

    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{teacher.name}</h3>
    <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-4">{teacher.subject} Teacher</p>

    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-3 text-slate-400 text-sm">
        <Mail size={16} />
        <span className="truncate">{teacher.email}</span>
      </div>
      <div className="flex items-center gap-3 text-slate-400 text-sm">
        <Phone size={16} />
        <span>{teacher.phone}</span>
      </div>
      <div className="flex items-center gap-3 text-slate-400 text-sm">
        <BookOpen size={16} />
        <span>Class: {teacher.assignedClass}</span>
      </div>
    </div>

    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-[10px] text-slate-500 uppercase font-bold">Active Now</span>
      </div>
      <button className="text-xs text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4">
        View Profile
      </button>
    </div>
  </div>
);

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await api.get('/teachers');
        // backend returns user objects
        const mapped = data.map(t => ({
          id: t._id,
          name: t.name,
          email: t.email,
          phone: t.phone || '',
          assignedClass: t.assignedClass || '',
          image: t.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`
        }));
        setTeachers(mapped);
      } catch (err) {
        console.error('Failed to load teachers', err);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <UserCheck className="text-indigo-500" size={32} />
            Faculty Directory
          </h1>
          <p className="text-slate-400 mt-1">Manage teaching staff and subject assignments.</p>
        </div>
        <button className="gradient-btn flex items-center gap-2">
          <Plus size={18} /> Add Teacher
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input
          type="text"
          placeholder="Search by name, subject, or email..."
          className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default Teachers;
