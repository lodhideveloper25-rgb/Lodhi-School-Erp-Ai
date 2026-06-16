import React, { useState } from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

const BillingInvoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // In a real SaaS application, this data would come from the Super Admin / SaaS billing API.
  // We mock the exact invoice shown in the user's screenshot.
  const [data] = useState([
    {
      _id: '166',
      metadata: {
        dueDate: 'April 10, 2026',
        description: 'erp subscription',
        subtotal: '2,000.00',
        tax: '0.00',
        total: '2,000.00'
      },
      status: 'Unpaid'
    }
  ]);

  if (selectedInvoice) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto p-4">
        <button 
          onClick={() => setSelectedInvoice(null)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4"
        >
          <ArrowLeft size={20} /> Back to Invoices
        </button>

        <div className="bg-white p-12 rounded-sm shadow-sm border border-slate-200 relative overflow-hidden">
          {/* Logo and Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <div className="leading-none">
                <span className="text-[#0f3669] font-black text-3xl tracking-tight">LODHI SCHOOL</span>
                <br />
                <span className="text-[#e23b3b] font-bold text-lg tracking-[0.2em] uppercase">ERP AI</span>
              </div>
              <div className="flex gap-2 mt-2 text-[#eab308]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"/></svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 5H21V19H3V5ZM13 13V15H19V13H13ZM13 9V11H19V9H13ZM8 15C9.66 15 11 13.66 11 12C11 10.34 9.66 9 8 9C6.34 9 5 10.34 5 12C5 13.66 6.34 15 8 15Z"/></svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM21 16H3V4H21V16ZM12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14Z"/></svg>
              </div>
            </div>
            <div className="text-right text-[15px]">
              <p className="text-slate-800 mb-1"><span className="font-bold">Invoice #:</span> {selectedInvoice._id}</p>
              <p className="text-slate-800"><span className="font-bold">Due:</span> {selectedInvoice.metadata?.dueDate}</p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-12 text-[15px]">
            <h3 className="font-bold text-slate-800 mb-1">Bill To:</h3>
            <p className="text-slate-700">Smart Angels Grammar School (User ID: 13588)</p>
            <p className="text-slate-700 flex items-center gap-1.5 mt-1">
              <span className="text-[#a52a2a] text-lg">📞</span> 923133815850
            </p>
          </div>

          {/* Table */}
          <div className="relative mb-12">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 font-bold text-slate-800 text-[15px]">Item</th>
                  <th className="py-2 font-bold text-slate-800 text-right text-[15px]">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-4 text-slate-700 text-[15px]">{selectedInvoice.metadata?.description}</td>
                  <td className="py-4 text-slate-700 text-right text-[15px]">Rs {selectedInvoice.metadata?.total}</td>
                </tr>
              </tbody>
            </table>

            {/* Unpaid Stamp */}
            {selectedInvoice.status === 'Unpaid' && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] -rotate-12 border-[5px] border-[#ed8b97] rounded-lg text-[#ed8b97] font-black text-6xl px-8 py-3 opacity-60 select-none pointer-events-none tracking-widest z-10">
                UNPAID
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-72 space-y-4 text-right">
              <div className="flex justify-between font-bold text-slate-800 text-lg">
                <span>Subtotal:</span>
                <span>Rs {selectedInvoice.metadata?.subtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 text-lg">
                <span>Tax:</span>
                <span>Rs {selectedInvoice.metadata?.tax}</span>
              </div>
              <div className="flex justify-between font-bold text-[#0066FF] text-xl pt-2">
                <span>Total:</span>
                <span>Rs {selectedInvoice.metadata?.total}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50/30 mb-8">
            <h3 className="text-xl font-bold text-[#0066FF] mb-5">Payment Information</h3>
            <div className="space-y-4 text-slate-800 text-[15px]">
              <p><span className="font-bold">Account Title:</span> Lodhi ERP AI Official</p>
              <p><span className="font-bold">Account Number:</span> 000000000000</p>
              <p><span className="font-bold">Bank:</span> Standard Chartered Bank</p>
              <p><span className="font-bold">Reference:</span> Invoice #{selectedInvoice._id}</p>
            </div>
          </div>

          <p className="italic text-slate-700 text-[15px]">Thank you for your business.</p>
        </div>
      </div>
    );
  }

  // Invoice List View
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-700">
          <FileText size={24} className="text-slate-500" />
          <h1 className="text-2xl font-semibold">School Invoices</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded uppercase">
            School ID: SAAS-13588
          </div>
        </div>
      </div>

      {/* Invoice List Card */}
      <div className="bg-white rounded shadow-sm border border-slate-200">
        <div className="px-4 py-3 border-b border-blue-500 border-t-[3px] border-t-blue-500 flex justify-between items-center">
          <h2 className="text-[15px] text-slate-700 font-medium">SaaS Billing History</h2>
          <span className="text-xs text-slate-500 italic">Data managed by SaaS Provider</span>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-100">
              <thead>
                <tr className="bg-slate-50 text-slate-800 text-[13px]">
                  <th className="p-3 font-bold border-b border-slate-100 w-12 text-center">#</th>
                  <th className="p-3 font-bold border-b border-slate-100">Description</th>
                  <th className="p-3 font-bold border-b border-slate-100">Due Date</th>
                  <th className="p-3 font-bold border-b border-slate-100">Subtotal</th>
                  <th className="p-3 font-bold border-b border-slate-100">Tax</th>
                  <th className="p-3 font-bold border-b border-slate-100">Total</th>
                  <th className="p-3 font-bold border-b border-slate-100 text-center">Status</th>
                  <th className="p-3 font-bold border-b border-slate-100 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 text-[13px] text-slate-700 text-center font-medium">{index + 1}</td>
                    <td className="p-3 text-[13px] text-slate-700 font-medium">{item.metadata?.description}</td>
                    <td className="p-3 text-[13px] text-slate-700">{item.metadata?.dueDate || 'N/A'}</td>
                    <td className="p-3 text-[13px] text-slate-700">Rs {item.metadata?.subtotal || '0.00'}</td>
                    <td className="p-3 text-[13px] text-slate-700">Rs {item.metadata?.tax || '0.00'}</td>
                    <td className="p-3 text-[13px] text-[#008000] font-medium">Rs {item.metadata?.total || '0.00'}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 text-[11px] font-bold rounded text-white ${(item.status || 'Unpaid') === 'Paid' ? 'bg-[#198754]' : 'bg-[#dc3545]'}`}>
                        {item.status || 'Unpaid'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => setSelectedInvoice(item)}
                        className="px-3 py-1 text-[12px] font-medium text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BillingInvoices;
