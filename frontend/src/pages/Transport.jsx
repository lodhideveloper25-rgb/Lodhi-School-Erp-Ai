import { useState, useEffect } from 'react';
import { Bus, Plus, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Transport = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const { data } = await api.get('/operations/transport');
        const mapped = data.map(r => ({ _id: r._id, routeName: r.routeName, vehicleNo: r.vehicleNumber, driver: r.driverName, capacity: r.seatingCapacity || 0, enrolled: r.enrolled || 0 }));
        setRoutes(mapped);
      } catch (err) {
        console.error('Failed to load transport routes', err);
      }
    };
    fetchTransport();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bus className="text-yellow-500" />
            Transport Routes
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage vehicles, routes, and student assignments</p>
        </div>
        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={route._id}
            className="glass p-6 rounded-2xl border border-slate-700/50"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                  <Bus size={20} />
                </div>
                {route.routeName}
              </h3>
              <span className="text-slate-400 text-sm font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">
                {route.vehicleNo}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 border-y border-slate-700/50 py-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Driver</p>
                <p className="text-white font-medium">{route.driver}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Capacity</p>
                <p className="text-white font-medium flex items-center gap-1">
                  <Users size={14} className="text-slate-400"/>
                  <span className={route.enrolled >= route.capacity ? 'text-red-400' : 'text-emerald-400'}>
                    {route.enrolled}
                  </span>
                  <span className="text-slate-500">/ {route.capacity}</span>
                </p>
              </div>
            </div>

            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700">
              View Students
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Transport;
