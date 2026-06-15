import { useState, useEffect } from 'react';
import { Badge, Printer, Download, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const IDCards = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [idcards, setIdCards] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/idcards');
        setIdCards(data || []);
        setSelectedStudent(data?.[0] || null);
      } catch (err) {
        console.error('Failed to load idcards data', err);
      }
    };
    load();
  }, []);

  const filteredIdCards = idcards.filter((item) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.admissionNo?.toLowerCase().includes(query) ||
      item.className?.toLowerCase().includes(query) ||
      item.role?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Badge className="text-indigo-500" />
            ID Card Generator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Design, preview, and print school ID cards</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-colors border border-slate-700">
            <Download size={18} /> Export PDF
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20">
            <Printer size={18} /> Print Card
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Selection Area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass p-6 rounded-2xl border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Select User</h3>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students or staff..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
              {filteredIdCards.length > 0 ? filteredIdCards.map((item) => (
                <button
                  key={item.id || item._id}
                  type="button"
                  onClick={() => setSelectedStudent(item)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors ${selectedStudent?.id === item.id || selectedStudent?._id === item._id ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/80'}`}
                >
                  <p className="text-white font-medium text-sm">{item.name}</p>
                  <p className="text-slate-400 text-xs">{item.admissionNo} • {item.className || item.department}</p>
                </button>
              )) : (
                <p className="text-slate-500 text-sm">No records match your search.</p>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="lg:col-span-7 flex items-center justify-center bg-slate-900/50 border border-slate-800 rounded-3xl p-8 min-h-[500px]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[280px] h-[440px] bg-white rounded-[20px] shadow-2xl relative overflow-hidden flex flex-col items-center"
          >
            {/* Top Design Element */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-blue-700 z-0"></div>
            <div className="absolute top-24 left-0 w-full h-16 bg-white -skew-y-6 transform origin-top-left z-0"></div>

            <div className="relative z-10 w-full pt-6 flex flex-col items-center text-center">
              <h1 className="text-white font-black text-xl tracking-wider">LODH ERP</h1>
              <p className="text-indigo-100 text-[10px] font-medium tracking-widest mt-1 uppercase">Excellence in Education</p>
              
              {/* Profile Picture Placeholder */}
              <div className="w-28 h-28 mt-6 bg-slate-100 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                {selectedStudent?.profileImage ? (
                  <img src={selectedStudent.profileImage} alt={selectedStudent?.name || 'Avatar'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-2xl text-slate-500">
                    {selectedStudent?.name?.split(' ').map((part) => part[0]).join('') || 'NA'}
                  </div>
                )}
              </div>

              {/* Student Details */}
              <div className="mt-4 px-6 w-full text-center">
                <h2 className="text-xl font-bold text-slate-800 leading-tight">{selectedStudent?.name || 'Student Name'}</h2>
                <p className="text-indigo-600 font-bold text-sm tracking-wide uppercase mt-1">{selectedStudent?.role || 'Student'}</p>
                
                <div className="mt-4 w-full h-[1px] bg-slate-200"></div>

                <div className="mt-4 grid grid-cols-2 gap-y-2 text-left w-full text-xs">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">ID No.</span>
                    <span className="text-slate-700 font-bold">{selectedStudent?.idNo || selectedStudent?.admissionNo || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Class</span>
                    <span className="text-slate-700 font-bold">{selectedStudent?.className || selectedStudent?.class || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Blood Group</span>
                    <span className="text-slate-700 font-bold">{selectedStudent?.bloodGroup || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Phone</span>
                    <span className="text-slate-700 font-bold">{selectedStudent?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="absolute bottom-0 w-full h-8 bg-slate-900 flex items-center justify-center">
                <p className="text-white text-[9px] font-medium tracking-wider">VALID UNTIL DEC 2026</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default IDCards;
