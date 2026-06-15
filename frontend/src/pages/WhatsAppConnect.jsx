import { useState, useEffect } from 'react';
import { QrCode, RefreshCw, LogOut, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';

const WhatsAppConnect = () => {
  const [status, setStatus] = useState('Disconnected');
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const fetchStatus = async () => {
    try {
      const { data } = await api.get('/whatsapp/status');
      setStatus(data.status || 'Disconnected');
      setQrCode(data.qr || null);
      setPhoneNumber(data.phone || null);
    } catch (err) {
      // ignore
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

  const handleInitialize = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/whatsapp/init');
      setStatus(data.status || 'Initializing');
      await fetchStatus();
    } catch (err) {
      console.error('Failed to initialize WhatsApp', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setStatus('DISCONNECTED');
    setQrCode(null);
    setPhoneNumber(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <QrCode className="text-green-500" />
          WhatsApp Connect
        </h2>
        <p className="text-slate-400 text-sm mt-1">Connect the school WhatsApp number to send automated alerts.</p>
        
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl max-w-3xl">
          <p className="text-yellow-400 text-sm font-medium flex items-center gap-2">
            ⚠️ Important Warning:
          </p>
          <p className="text-slate-300 text-xs mt-1">
            Using unofficial WhatsApp Web automation (like whatsapp-web.js) on personal numbers can lead to temporary or permanent bans by WhatsApp. It is highly recommended to use a dedicated, secondary phone number for the school ERP to send notifications.
          </p>
        </div>
      </div>

      <div className="glass max-w-xl rounded-2xl border border-slate-700/50 overflow-hidden p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        {status === 'Disconnected' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto border border-slate-700">
              <QrCode size={40} className="text-slate-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp Not Connected</h3>
              <p className="text-slate-400 text-sm">Click below to generate a QR code and link your device.</p>
            </div>
            <button 
              onClick={handleInitialize}
              disabled={isLoading}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <QrCode size={18} />}
              {isLoading ? 'Initializing...' : 'Generate QR Code'}
            </button>
          </motion.div>
        )}

        {status === 'QR_READY' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <h3 className="text-xl font-bold text-white">Scan QR Code</h3>
            <p className="text-slate-400 text-sm">Open WhatsApp on your phone {"->"} Linked Devices {"->"} Link a Device</p>
            
            <div className="bg-white p-4 rounded-xl inline-block mx-auto">
              {qrCode ? (
                <QRCodeSVG value={qrCode} size={256} className="mx-auto" />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center bg-slate-100">
                  <RefreshCw className="animate-spin text-slate-400" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {status === 'Connected' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/50">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp Connected!</h3>
              <p className="text-slate-400 text-sm">The system can now send automated messages.</p>
              {phoneNumber && <p className="text-green-400 font-medium mt-2">Number: {phoneNumber}</p>}
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/50 rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <LogOut size={18} />
              Disconnect Session
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppConnect;
