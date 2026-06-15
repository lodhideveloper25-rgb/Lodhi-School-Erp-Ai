import React, { useEffect, useState } from 'react';
import { Megaphone, Search, CalendarDays, Bell } from 'lucide-react';
import api from '../services/api';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await api.get('/notices');
        setNotices(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Megaphone className="text-indigo-500" size={32} />
            School Notices
          </h1>
          <p className="text-slate-400 mt-1">View announcements, events, and alerts across the school.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
            <Bell size={16} /> New Notice
          </button>
        </div>
      </div>

      <div className="glassmorphism p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-slate-400">{filteredNotices.length} notices found</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredNotices.map((notice) => (
          <div key={notice._id} className="glassmorphism p-6 rounded-2xl border border-slate-800/50 hover:border-indigo-600 transition-all">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{notice.title}</h2>
                <p className="text-xs uppercase tracking-widest text-slate-500 mt-2">{notice.category || 'Announcement'}</p>
              </div>
              <span className="text-xs text-slate-400">{new Date(notice.startDate).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-300 leading-7">{notice.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(notice.audience || []).map((group) => (
                <span key={group} className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold">
                  {group}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
