import { useState, useEffect } from 'react';
import { GraduationCap, Plus, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await api.get('/exams');
        setExams(data || []);
      } catch (err) {
        console.error('Failed to load exams', err);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="text-cyan-500" />
            Exam Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Schedule exams, enter marks, and generate results</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Create Exam
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {exams.map((exam, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={exam._id}
            className="glass p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                exam.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                exam.status === 'Scheduled' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {exam.status}
              </span>
              <span className="text-slate-400 text-xs bg-slate-800 px-2 py-1 rounded">
                {exam.classes}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 leading-tight flex-1">{exam.name}</h3>
            
            <div className="space-y-3 pt-4 border-t border-slate-700/50 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Start Date</span>
                <span className="text-slate-300 font-medium">{exam.startDate ? new Date(exam.startDate).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">End Date</span>
                <span className="text-slate-300 font-medium">{exam.endDate ? new Date(exam.endDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors border border-slate-700 text-center">
                Edit Exam
              </button>
              <button className="flex-1 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/50 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <FileSpreadsheet size={16}/> Marks
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
