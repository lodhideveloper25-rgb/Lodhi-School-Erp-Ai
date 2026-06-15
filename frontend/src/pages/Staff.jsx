import { useState, useEffect } from 'react';
import api from '../services/api';
import { UserCog, Plus, Mail, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Staff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await api.get('/staff');
        const mapped = data.map(s => ({
          _id: s._id,
          name: s.userId?.name || `${s.firstName || ''} ${s.lastName || ''}`.trim(),
          role: s.role,
          department: s.department || '',
          email: s.userId?.email || '',
          phone: s.phone || '',
          profileImage: s.userId?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.userId?.name || (s.firstName || ''))}`
        }));
        setStaff(mapped);
      } catch (err) {
        console.error('Failed to load staff', err);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserCog className="text-rose-500" />
            Staff Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage non-teaching administrative and support staff</p>
        </div>
        <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {staff.map((member, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={member._id}
            className="glass p-6 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center hover:border-rose-500/50 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-300 mb-4 overflow-hidden relative group">
               <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
            <p className="text-sm font-medium text-rose-400 mt-1">{member.role}</p>
            
            <div className="flex items-center gap-1 mt-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <ShieldCheck size={12} className="text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">{member.department}</span>
            </div>

            <div className="w-full mt-6 space-y-3 pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                <Mail size={14} className="text-slate-500"/>
                {member.email}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                <Phone size={14} className="text-slate-500"/>
                {member.phone}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
