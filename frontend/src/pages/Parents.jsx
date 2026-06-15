import { useState, useEffect } from 'react';
import { Users, Plus, Mail, Phone, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Parents = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const { data } = await api.get('/parents');
        // map backend user objects into the UI-friendly shape
        const mapped = data.map(p => ({ _id: p._id, fatherName: p.name || '', motherName: '', children: [], phone: p.phone || '', email: p.email }));
        setParents(mapped);
      } catch (err) {
        console.error('Failed to load parents', err);
      }
    };
    fetchParents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-teal-500" />
            Parent Directory
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage parent details and linked students</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Parent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parents.map((parent, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={parent._id}
            className="glass p-6 rounded-2xl border border-slate-700/50 flex flex-col relative"
          >
            <div className="absolute top-4 right-4">
              <button className="text-slate-400 hover:text-white"><MoreVertical size={18}/></button>
            </div>
            
            <div className="flex items-center gap-4 mb-4 border-b border-slate-700/50 pb-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                {parent.fatherName[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{parent.fatherName} & {parent.motherName}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Phone size={12}/> {parent.phone}</span>
                  <span className="flex items-center gap-1"><Mail size={12}/> {parent.email}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Linked Children</p>
              <div className="flex flex-wrap gap-2">
                {parent.children.map(child => (
                  <span key={child} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">
                    {child}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Parents;
