import { useState, useEffect } from 'react';
import { BookOpen, Plus, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Homework = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const { data } = await api.get('/homework');
        setAssignments(data || []);
      } catch (err) {
        console.error('Failed to load homework', err);
      }
    };
    fetchHomework();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-blue-500" />
            Homework Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Assign and review daily student homework</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((hw, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={hw._id}
            className="glass p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
                {hw.subject}
              </span>
              <span className="text-slate-400 text-xs bg-slate-800 px-2 py-1 rounded">
                {hw.className}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 leading-tight flex-1">{hw.title}</h3>
            
            <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar size={14} />
                <span>Due: <span className="text-red-400 font-medium">{hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : 'N/A'}</span></span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-slate-500">By {hw.assignedBy || 'Staff'}</div>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors">
                  <FileText size={14} />
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Homework;
