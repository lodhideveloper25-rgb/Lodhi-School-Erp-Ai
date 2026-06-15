import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Globe, Lock, Bell, Palette, Database, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const SettingItem = ({ icon, title, desc, action }) => (
  <div className="flex items-center justify-between p-6 hover:bg-slate-800/20 transition-all group">
    <div className="flex items-center gap-4">
       <div className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
         {icon}
       </div>
       <div>
         <h4 className="text-white font-bold">{title}</h4>
         <p className="text-xs text-slate-500 mt-1">{desc}</p>
       </div>
    </div>
    {action}
  </div>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    name: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    logoUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings({
          name: data.name || '',
          address: data.address || '',
          contactEmail: data.contactEmail || '',
          contactPhone: data.contactPhone || '',
          logoUrl: data.logoUrl || ''
        });
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const { data } = await api.put('/settings', settings);
      setSettings({
        name: data.name || '',
        address: data.address || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        logoUrl: data.logoUrl || ''
      });
      setMessage('Settings saved successfully.');
    } catch (err) {
      console.error('Failed to save settings', err);
      setMessage('Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <SettingsIcon className="text-indigo-500" size={32} />
          System Settings
        </h1>
        <p className="text-slate-400 mt-1">Configure global school parameters and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glassmorphism rounded-3xl overflow-hidden border border-slate-800/50">
            <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800/50">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">School Profile</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  School Name
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </label>
                <label className="block text-sm text-slate-300">
                  Contact Email
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                Contact Phone
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Address
                <textarea
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="mt-2 w-full min-h-[120px] bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Logo URL
                <input
                  type="text"
                  value={settings.logoUrl}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
                <p className="text-sm text-slate-400">{message}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glassmorphism p-8 rounded-3xl text-center">
            <div className="w-20 h-20 bg-indigo-600/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
              <ShieldCheck size={40} />
            </div>
            <h4 className="text-white font-bold mb-2">System Status</h4>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400 font-bold uppercase">All Services Operational</span>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Database</span>
                <span className="text-slate-300 font-bold">Connected</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">API Latency</span>
                <span className="text-slate-300 font-bold">24ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Storage Used</span>
                <span className="text-slate-300 font-bold">1.2 GB / 5 GB</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-indigo-600 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
              <SettingsIcon size={80} />
            </div>
            <h4 className="text-lg font-bold mb-2">Need Help?</h4>
            <p className="text-xs text-indigo-100 mb-6 leading-relaxed">Check our official documentation or contact system support for assistance.</p>
            <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm shadow-xl">Get Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
