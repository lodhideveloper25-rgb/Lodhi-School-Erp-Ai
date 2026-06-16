import React, { useState } from 'react';
import { Smartphone, CheckCircle, Power, MessageSquare, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatsAppConnect = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('+92 300 1234567');
  const [testMessage, setTestMessage] = useState('Hello from LODHI ERP!');

  const handleDisconnect = () => {
    if(window.confirm('Are you sure you want to disconnect WhatsApp?')) {
      navigate('/whatsapp');
    }
  };

  const handleTestMessage = () => {
    alert(`Mock Message Sent to ${phoneNumber}: "${testMessage}"`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 space-y-6">
      
      {/* Status Banner */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <CheckCircle size={24} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-800">WhatsApp is Connected</h2>
            <p className="text-green-600 text-sm">Your ERP is ready to send automated messages.</p>
          </div>
        </div>
        <button 
          onClick={handleDisconnect}
          className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 hover:bg-red-50 font-medium rounded-lg shadow-sm border border-red-100 transition-colors"
        >
          <Power size={16} /> Disconnect Device
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Device Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-3">
            <Smartphone size={20} className="text-blue-500" />
            Device Information
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Connected Number</span>
              <span className="font-semibold text-slate-800">+92 3XX XXXXXXX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Battery Level</span>
              <span className="font-semibold text-green-600">84%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Platform</span>
              <span className="font-semibold text-slate-800">Android</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Last Synced</span>
              <span className="font-semibold text-slate-800">Just now</span>
            </div>
          </div>
        </div>

        {/* Test Message */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-3">
            <MessageSquare size={20} className="text-green-500" />
            Send Test Message
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (with country code)</label>
              <input 
                type="text" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
                rows="3"
              />
            </div>
            <button 
              onClick={handleTestMessage}
              className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              <Send size={16} /> Send via WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppConnect;
