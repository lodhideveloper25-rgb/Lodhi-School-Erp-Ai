import React, { useState, useEffect } from 'react';
import { QrCode, RefreshCw, LogOut, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';

const WhatsAppQR = () => {
  const [status, setStatus] = useState('Disconnected'); // Disconnected, QR_READY, Connected, Initializing
  const [qr, setQr] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const { data } = await api.get('/whatsapp/status');
      setStatus(data.status || 'Disconnected');
      setQr(data.qr || '');
    } catch (err) {
      // ignore if unauthorized or not available
      console.warn('WhatsApp status fetch failed', err?.message || err);
    }
  };

  useEffect(() => {
    let mounted = true;
    const refreshStatus = async () => {
      if (!mounted) return;
      await fetchStatus();
    };

    refreshStatus();
    const interval = setInterval(refreshStatus, 5000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/whatsapp/init');
      setStatus(data.status || 'Initializing');
      await fetchStatus();
    } catch (err) {
      console.error('Failed to initialize WhatsApp', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <MessageCircle className="text-green-500" size={36} />
          WhatsApp Cloud Connect
        </h1>
        <p className="text-slate-400 mt-2">Automate school notifications via WhatsApp Web. No API costs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Connection Status Card */}
        <div className="glassmorphism p-8 rounded-3xl flex flex-col items-center justify-center text-center">
          {status === 'Connected' ? (
             <>
               <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                 <CheckCircle size={48} />
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">Connected</h2>
               <p className="text-slate-400 text-sm mb-8">System is ready to send automated messages.</p>
               <button className="flex items-center gap-2 px-6 py-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all font-bold">
                 <LogOut size={18} /> Logout Session
               </button>
             </>
          ) : status === 'QR_READY' ? (
             <>
               <div className="p-4 bg-white rounded-2xl shadow-2xl mb-6">
                 {qr ? <QRCodeSVG value={qr} size={200} /> : <div className="w-[200px] h-[200px] bg-slate-100 animate-pulse"></div>}
               </div>
               <h2 className="text-xl font-bold text-white mb-2">Scan QR Code</h2>
               <p className="text-slate-400 text-sm mb-8">Open WhatsApp on your phone and scan this code.</p>
               <button onClick={handleConnect} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-all">
                 <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh QR
               </button>
             </>
          ) : (
             <>
               <div className="w-20 h-20 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mb-6">
                 <QrCode size={48} />
               </div>
               <h2 className="text-xl font-bold text-white mb-2">Not Connected</h2>
               <p className="text-slate-400 text-sm mb-8">Initialize the WhatsApp client to start.</p>
               <button onClick={handleConnect} disabled={loading} className="gradient-btn px-10 py-3 flex items-center gap-3">
                 {loading ? <RefreshCw size={18} className="animate-spin" /> : <QrCode size={18} />}
                 {loading ? 'Initializing...' : 'Generate QR Code'}
               </button>
             </>
          )}
        </div>

        {/* Info & Features */}
        <div className="space-y-6">
           <div className="glassmorphism p-6 rounded-2xl border-l-4 border-amber-500">
             <div className="flex gap-4">
               <AlertTriangle className="text-amber-500 shrink-0" size={24} />
               <div>
                 <h4 className="text-white font-bold text-sm">Important Security Note</h4>
                 <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                   This uses unofficial WhatsApp Web automation. Frequent messaging to unsaved contacts may lead to number suspension. Use for critical alerts only.
                 </p>
               </div>
             </div>
           </div>

           <div className="glassmorphism p-6 rounded-2xl space-y-4">
              <h4 className="text-white font-bold">Automated Features</h4>
              <div className="space-y-3">
                 {[
                   'Automatic Fee Reminders',
                   'Instant Absent Alerts',
                   'Exam Result Notifications',
                   'Emergency School Closures'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      {item}
                   </div>
                 ))}
              </div>
           </div>

           <div className="glassmorphism p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/20">
              <h4 className="text-indigo-400 font-bold text-sm mb-2">Connection Tip</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keep the server running and ensure your phone is connected to the internet for the first link. After linking, it works independently.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppQR;
