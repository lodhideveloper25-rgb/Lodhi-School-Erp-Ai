import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  CalendarCheck, Search, Filter, CheckCircle2,
  XCircle, Clock, Save, ChevronLeft, ChevronRight, QrCode
} from 'lucide-react';

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [students, setStudents] = useState([]);

  const toggleStatus = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await api.get('/classes');
        setClasses(data.map(c => ({ id: c._id, name: c.name })));
        if (data.length) setSelectedClass(data[0]._id);
      } catch (err) {
        console.error('Failed to load classes', err);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!selectedClass || !date) return;
      try {
        const { data } = await api.get(`/attendance?classId=${selectedClass}&date=${date}`);
        // data is report array: { studentId, name, status, remarks }
        const mapped = data.map((s, idx) => ({ id: s.studentId || idx, roll: idx + 1, name: s.name, status: s.status, remarks: s.remarks }));
        setStudents(mapped);
      } catch (err) {
        console.error('Failed to load attendance', err);
      }
    };
    fetchAttendance();
  }, [selectedClass, date]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <CalendarCheck className="text-indigo-500" size={32} />
            Daily Attendance
          </h1>
          <p className="text-slate-400 mt-1">Mark and manage student attendance records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
            <QrCode size={18} /> QR Scanner
          </button>
          <button className="gradient-btn flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Save size={18} /> Submit Attendance
          </button>
        </div>
      </div>

      <div className="glassmorphism p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Class</label>
          <select
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>10-A</option>
            <option>10-B</option>
            <option>9-A</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Attendance Date</label>
          <input
            type="date"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="md:col-span-1 lg:col-span-2 flex items-end">
           <div className="flex gap-4 w-full">
             <div className="flex-1 p-3 bg-indigo-600/10 rounded-xl border border-indigo-600/20 text-center">
               <p className="text-[10px] font-bold text-indigo-400 uppercase">Present</p>
               <p className="text-xl font-bold text-white">42</p>
             </div>
             <div className="flex-1 p-3 bg-red-600/10 rounded-xl border border-red-600/20 text-center">
               <p className="text-[10px] font-bold text-red-400 uppercase">Absent</p>
               <p className="text-xl font-bold text-white">03</p>
             </div>
             <div className="flex-1 p-3 bg-amber-600/10 rounded-xl border border-amber-600/20 text-center">
               <p className="text-[10px] font-bold text-amber-400 uppercase">Late</p>
               <p className="text-xl font-bold text-white">01</p>
             </div>
           </div>
        </div>
      </div>

      <div className="glassmorphism rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold w-24">Roll No</th>
              <th className="px-6 py-4 font-semibold">Student Name</th>
              <th className="px-6 py-4 font-semibold">Current Status</th>
              <th className="px-6 py-4 font-semibold text-right">Mark Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4 text-slate-400 font-bold">{student.roll}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-400 border border-slate-700">
                      {student.name.charAt(0)}
                    </div>
                    <span className="text-white font-medium">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    px-3 py-1 rounded-full text-[10px] font-bold uppercase
                    ${student.status === 'Present' ? 'bg-green-600/10 text-green-400' :
                      student.status === 'Absent' ? 'bg-red-600/10 text-red-400' :
                      'bg-amber-600/10 text-amber-400'}
                  `}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center justify-end gap-2">
                     <button
                        onClick={() => toggleStatus(student.id, 'Present')}
                        className={`p-2 rounded-lg transition-all ${student.status === 'Present' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-green-400'}`}
                     >
                       <CheckCircle2 size={18} />
                     </button>
                     <button
                        onClick={() => toggleStatus(student.id, 'Absent')}
                        className={`p-2 rounded-lg transition-all ${student.status === 'Absent' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-red-400'}`}
                     >
                       <XCircle size={18} />
                     </button>
                     <button
                        onClick={() => toggleStatus(student.id, 'Late')}
                        className={`p-2 rounded-lg transition-all ${student.status === 'Late' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-amber-400'}`}
                     >
                       <Clock size={18} />
                     </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
