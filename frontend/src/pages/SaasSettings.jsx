import React, { useState } from 'react';
import { Settings, Save, Shield, Mail, CreditCard, HardDrive, Globe, CheckCircle2 } from 'lucide-react';

const SaasSettings = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Gateway Modal State
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [configuringGateway, setConfiguringGateway] = useState('');

  // Branding State
  const [branding, setBranding] = useState({
    platformName: 'LODHI SCHOOL ERP AI',
    supportEmail: 'support@lodhierp.ai'
  });

  // SMTP State
  const [smtp, setSmtp] = useState({
    host: 'smtp.mailgun.org',
    port: '587',
    username: 'postmaster@mg.lodhierp.ai',
    password: ''
  });

  // Backup State
  const [backup, setBackup] = useState({
    frequency: 'Daily at 00:00 UTC',
    retention: 'Keep for 30 Days'
  });

  // Security State
  const [security, setSecurity] = useState({
    force2FA: true,
    blockProxy: true,
    manualApproval: false
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-slate-200 relative">
      
      {showSuccess && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-300">
          <CheckCircle2 size={18} />
          <span className="font-medium">Settings saved successfully!</span>
        </div>
      )}

      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Settings size={28} className="text-slate-400" />
          <h1 className="text-2xl font-semibold text-white">Global SaaS Settings</h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Save size={16} /> {isSaving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <div className="w-64 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'branding' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-800/50 text-slate-400 border border-transparent'}`}
          >
            <Globe size={18} /> SaaS Branding
          </button>
          <button 
            onClick={() => setActiveTab('smtp')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'smtp' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-800/50 text-slate-400 border border-transparent'}`}
          >
            <Mail size={18} /> SMTP & Email
          </button>
          <button 
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'payment' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-800/50 text-slate-400 border border-transparent'}`}
          >
            <CreditCard size={18} /> Payment Gateways
          </button>
          <button 
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'backup' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-800/50 text-slate-400 border border-transparent'}`}
          >
            <HardDrive size={18} /> Automated Backups
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === 'security' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-800/50 text-slate-400 border border-transparent'}`}
          >
            <Shield size={18} /> Security Rules
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 min-h-[500px]">
          
          {activeTab === 'branding' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Platform Branding</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Platform Name</label>
                  <input 
                    type="text" 
                    value={branding.platformName} 
                    onChange={e => setBranding({...branding, platformName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Support Email</label>
                  <input 
                    type="email" 
                    value={branding.supportEmail} 
                    onChange={e => setBranding({...branding, supportEmail: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Primary SaaS Logo (Upload)</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <Globe size={32} className="mb-2" />
                    <p>Click to upload logo</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'smtp' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">SMTP Configuration</h2>
              <p className="text-sm text-slate-400">Configure email servers for sending OTPs, invoices, and system alerts to tenant schools.</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">SMTP Host</label>
                  <input 
                    type="text" 
                    value={smtp.host} 
                    onChange={e => setSmtp({...smtp, host: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">SMTP Port</label>
                  <input 
                    type="text" 
                    value={smtp.port} 
                    onChange={e => setSmtp({...smtp, port: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">SMTP Username</label>
                  <input 
                    type="text" 
                    value={smtp.username} 
                    onChange={e => setSmtp({...smtp, username: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">SMTP Password</label>
                  <input 
                    type="password" 
                    value={smtp.password} 
                    onChange={e => setSmtp({...smtp, password: e.target.value})}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none" 
                  />
                </div>
              </div>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Test Connection</button>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Payment Gateways</h2>
              <p className="text-sm text-slate-400">Configure how schools pay their SaaS subscription fees.</p>
              
              <div className="space-y-4">
                <div className="p-4 border border-slate-600 rounded-lg flex items-center justify-between hover:border-slate-500 transition-colors">
                  <div>
                    <h3 className="font-bold text-white">Stripe</h3>
                    <p className="text-sm text-slate-400">Accept Credit Cards Globally</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 text-sm font-medium">Connected</span>
                    <button 
                      onClick={() => { setConfiguringGateway('Stripe'); setShowGatewayModal(true); }}
                      className="text-slate-400 hover:text-white underline text-sm"
                    >
                      Configure
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-slate-600 rounded-lg flex items-center justify-between hover:border-slate-500 transition-colors">
                  <div>
                    <h3 className="font-bold text-white">JazzCash / EasyPaisa (Local)</h3>
                    <p className="text-sm text-slate-400">Accept local mobile wallet payments</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm font-medium">Not Configured</span>
                    <button 
                      onClick={() => { setConfiguringGateway('JazzCash/EasyPaisa'); setShowGatewayModal(true); }}
                      className="text-blue-400 hover:text-blue-300 underline text-sm"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Automated Database Backups</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Backup Frequency</label>
                  <select 
                    value={backup.frequency}
                    onChange={e => setBackup({...backup, frequency: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>Daily at 00:00 UTC</option>
                    <option>Weekly on Sunday</option>
                    <option>Twice a day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Retention Period</label>
                  <select 
                    value={backup.retention}
                    onChange={e => setBackup({...backup, retention: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>Keep for 30 Days</option>
                    <option>Keep for 90 Days</option>
                    <option>Keep Indefinitely</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => alert("Manual backup initiated. This might take a few minutes depending on database size.")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Run Manual Backup Now
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Global Security Rules</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={security.force2FA}
                    onChange={e => setSecurity({...security, force2FA: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-blue-600" 
                  />
                  <span className="text-slate-300 select-none">Force Two-Factor Authentication (2FA) for all Super Admins</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={security.blockProxy}
                    onChange={e => setSecurity({...security, blockProxy: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-blue-600" 
                  />
                  <span className="text-slate-300 select-none">Block registration from anonymous proxy networks</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={security.manualApproval}
                    onChange={e => setSecurity({...security, manualApproval: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-blue-600" 
                  />
                  <span className="text-slate-300 select-none">Require manual approval for new School Registrations</span>
                </label>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Gateway Configuration Modal */}
      {showGatewayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-slate-800/50">
              <h3 className="text-lg font-semibold text-white">Configure {configuringGateway}</h3>
              <button onClick={() => setShowGatewayModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <Globe size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">API Key / Merchant ID</label>
                <input 
                  type="text" 
                  placeholder="Enter Key"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Secret Key / Salt</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="sandbox" className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-600" />
                <label htmlFor="sandbox" className="text-sm text-slate-400">Enable Sandbox/Test Mode</label>
              </div>
            </div>

            <div className="p-5 border-t border-slate-800 bg-slate-800/50 flex justify-end gap-3">
              <button 
                onClick={() => setShowGatewayModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowGatewayModal(false);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Save size={16} /> Save Gateway
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SaasSettings;
