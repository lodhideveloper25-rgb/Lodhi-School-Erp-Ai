import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatsAppQR = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading QR code
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <MessageCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Connect WhatsApp</h1>
        <p className="text-slate-500 mt-2 max-w-lg">
          Link your WhatsApp account to automatically send fee reminders, attendance alerts, and notices to parents and students.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">To use WhatsApp on LODHI ERP:</h3>
            <ol className="space-y-4 text-slate-600 list-decimal pl-5">
              <li>Open WhatsApp on your phone</li>
              <li>Tap <strong>Menu</strong> or <strong>Settings</strong> and select <strong>Linked Devices</strong></li>
              <li>Tap on <strong>Link a Device</strong></li>
              <li>Point your phone to this screen to capture the code</li>
            </ol>
            <div className="pt-4">
              <button 
                onClick={() => navigate('/whatsapp/connect')}
                className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
              >
                Skip to Connected Dashboard (Demo)
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <RefreshCw size={32} className="text-green-500 animate-spin" />
                <p className="text-sm text-slate-500 font-medium">Generating secure QR code...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                {/* Mock QR Code */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=LodhiSchoolERP_WhatsAppConnect" alt="QR Code" className="w-48 h-48 opacity-90" />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Smartphone size={16} /> Keep your phone pointed at the screen
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppQR;
