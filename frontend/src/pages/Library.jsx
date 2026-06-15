import { useState, useEffect } from 'react';
import { BookMarked, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const { data } = await api.get('/operations/library');
        setBooks(data.map(b => ({ _id: b._id, title: b.bookTitle || b.title, author: b.author, category: b.category, available: b.availableCopies ?? b.available, total: b.totalCopies ?? b.total })));
      } catch (err) {
        console.error('Failed to load library', err);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookMarked className="text-orange-500" />
            Library Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage books, inventory, and issuances</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Book
        </button>
      </div>

      <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700/50">
                <th className="p-4 text-sm font-medium text-slate-300">Book Title</th>
                <th className="p-4 text-sm font-medium text-slate-300">Author</th>
                <th className="p-4 text-sm font-medium text-slate-300">Category</th>
                <th className="p-4 text-sm font-medium text-slate-300">Availability</th>
                <th className="p-4 text-sm font-medium text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={book._id} 
                  className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-white">{book.title}</td>
                  <td className="p-4 text-sm text-slate-400">{book.author}</td>
                  <td className="p-4 text-sm text-slate-400">
                    <span className="px-2 py-1 bg-slate-800 rounded text-xs">{book.category}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${book.available > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {book.available} / {book.total}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">Issue Book</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Library;
