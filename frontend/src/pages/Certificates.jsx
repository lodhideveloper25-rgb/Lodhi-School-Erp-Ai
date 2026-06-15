import { useState, useEffect } from 'react';
import { Award, Printer, Download, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Certificates = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/certificates');
        setCertificates(data || []);
        setSelectedStudent(data?.[0] || null);
      } catch (err) {
        console.error('Failed to load certificates data', err);
      }
    };
    load();
  }, []);

  const filteredCertificates = certificates.filter((student) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.admissionNo?.toLowerCase().includes(query) ||
      student.className?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="text-yellow-500" />
            Certificates Generator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Design and award digital or printable certificates</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-colors border border-slate-700">
            <Download size={18} /> Export PDF
          </button>
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-yellow-500/20">
            <Printer size={18} /> Print Certificate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Selection Area */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass p-6 rounded-2xl border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Select Student</h3>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide">
              {filteredCertificates.length > 0 ? filteredCertificates.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left p-4 rounded-2xl border ${selectedStudent?.id === student.id ? 'border-yellow-500 bg-slate-800/70' : 'border-slate-700 bg-slate-900/60'} transition-all hover:border-yellow-400`}
                >
                  <p className="text-white font-medium text-sm">{student.name}</p>
                  <p className="text-slate-500 text-xs">{student.admissionNo} • {student.className}</p>
                </button>
              )) : (
                <p className="text-slate-500 text-sm">No students match your search.</p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm text-slate-400">Award Title</label>
              <input type="text" value={selectedStudent?.achievement || 'Academic Excellence'} readOnly className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Date</label>
              <input type="text" value={selectedStudent?.date || new Date().toDateString()} readOnly className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-yellow-500" />
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="lg:col-span-8 flex items-center justify-center bg-slate-900/50 border border-slate-800 rounded-3xl p-8 min-h-[500px] overflow-hidden">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-white border-[16px] border-yellow-600/10 p-2 relative rounded shadow-2xl"
          >
            <div className="border-[4px] border-yellow-600/30 p-10 text-center relative h-full flex flex-col justify-center items-center">
              
              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-yellow-600"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-yellow-600"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-yellow-600"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-yellow-600"></div>

              <Award size={48} className="text-yellow-500 mb-4" />
              <h1 className="text-4xl font-serif text-slate-800 mb-2 uppercase tracking-widest font-bold">Certificate</h1>
              <p className="text-sm text-yellow-600 font-bold tracking-[0.2em] mb-8">OF ACHIEVEMENT</p>
              
              <p className="text-slate-500 text-sm mb-4">This certificate is proudly presented to</p>
              
              <h2 className="text-3xl font-bold text-slate-900 border-b border-slate-300 pb-2 px-12 mb-6">
                {selectedStudent?.name || 'Student Name'}
              </h2>
              
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-12">
                For outstanding performance and achieving <strong className="text-slate-700">{selectedStudent?.achievement || 'Academic Excellence'}</strong> during the academic year.
              </p>

              <div className="flex justify-between w-full px-12 mt-auto">
                <div className="text-center">
                  <div className="w-32 border-b border-slate-400 mb-2"></div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{selectedStudent?.date || new Date().toDateString()}</p>
                </div>
                <div className="text-center">
                  <div className="w-40 border-b border-slate-400 mb-2"></div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{selectedStudent?.issuer || 'Principal'}</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Certificates;
