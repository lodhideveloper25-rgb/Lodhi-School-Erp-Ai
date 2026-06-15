import { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, Plus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await api.get('/operations/inventory');
        const mapped = data.map(i => ({ _id: i._id, itemName: i.itemName, category: i.category, quantity: i.quantity, unitPrice: i.unitPrice, status: i.quantity > 0 ? 'In Stock' : 'Out of Stock' }));
        setItems(mapped);
      } catch (err) {
        console.error('Failed to load inventory', err);
      }
    };
    fetchInventory();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="text-pink-500" />
            Inventory & Asset Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track school supplies, electronics, and furniture</p>
        </div>
        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700/50">
              <th className="p-4 text-sm font-medium text-slate-300">Item Name</th>
              <th className="p-4 text-sm font-medium text-slate-300">Category</th>
              <th className="p-4 text-sm font-medium text-slate-300">Quantity</th>
              <th className="p-4 text-sm font-medium text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                key={item._id} 
                className="border-b border-slate-700/50 hover:bg-slate-800/30"
              >
                <td className="p-4 text-sm font-medium text-white">{item.itemName}</td>
                <td className="p-4 text-sm text-slate-400">{item.category}</td>
                <td className="p-4 text-sm font-mono text-slate-300">{item.quantity}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-max ${
                    item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400' : 
                    item.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {item.status !== 'In Stock' && <AlertCircle size={12}/>}
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
