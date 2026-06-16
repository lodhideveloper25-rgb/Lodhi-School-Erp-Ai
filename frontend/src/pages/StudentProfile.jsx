import React, { useState, useEffect } from 'react';
import { User, Users, FileText, CreditCard, UploadCloud, ChevronRight } from 'lucide-react';
import api from '../services/api';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would pass the student ID via URL params (e.g. useParams)
  // For demo, we just fetch all students and pick the first one, or show a selector.
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [siblings, setSiblings] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/data/Students');
        setStudents(res.data);
        if (res.data.length > 0) {
          const mainStudent = res.data[0];
          setSelectedStudent(mainStudent);
          
          // Find siblings based on familyId
          const familyId = mainStudent.metadata?.familyId;
          if (familyId) {
            const sibs = res.data.filter(s => s.metadata?.familyId === familyId && s._id !== mainStudent._id);
            setSiblings(sibs);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;
  if (!selectedStudent) return <div className="p-8 text-center text-slate-500">No student selected.</div>;

  const tabs = [
    { id: 'Profile', icon: <User size={18} /> },
    { id: 'Parents', icon: <Users size={18} /> },
    { id: 'Siblings', icon: <Users size={18} /> },
    { id: 'Ledger', icon: <CreditCard size={18} /> },
    { id: 'Documents', icon: <FileText size={18} /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-6">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
          <User size={40} className="text-slate-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">{selectedStudent.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <p>Roll No: <span className="font-medium text-slate-700">{selectedStudent.metadata?.rollNo}</span></p>
            <p>Class: <span className="font-medium text-slate-700">{selectedStudent.metadata?.className} - {selectedStudent.metadata?.section}</span></p>
            <p>Status: <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">{selectedStudent.status || 'Active'}</span></p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Family ID</p>
          <p className="text-lg font-bold text-blue-600">{selectedStudent.metadata?.familyId || 'N/A'}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex border-b border-slate-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon} {tab.id}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
        
        {activeTab === 'Profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 mb-1">Gender</p>
                <p className="font-medium text-slate-800">{selectedStudent.metadata?.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Date of Birth</p>
                <p className="font-medium text-slate-800">12 May 2012</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Contact</p>
                <p className="font-medium text-slate-800">{selectedStudent.metadata?.contact || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Blood Group</p>
                <p className="font-medium text-slate-800">O+</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-500 mb-1">Address</p>
                <p className="font-medium text-slate-800">123 Street Name, City, Country</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Parents' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Parent / Guardian Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-blue-600 mb-4">Father Details</h4>
                <div className="space-y-3">
                  <p className="text-sm"><span className="text-slate-500 block text-xs">Name</span> John Doe Sr.</p>
                  <p className="text-sm"><span className="text-slate-500 block text-xs">Occupation</span> Engineer</p>
                  <p className="text-sm"><span className="text-slate-500 block text-xs">Phone</span> +1 234 567 890</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="font-semibold text-purple-600 mb-4">Mother Details</h4>
                <div className="space-y-3">
                  <p className="text-sm"><span className="text-slate-500 block text-xs">Name</span> Jane Doe</p>
                  <p className="text-sm"><span className="text-slate-500 block text-xs">Occupation</span> Teacher</p>
                  <p className="text-sm"><span className="text-slate-500 block text-xs">Phone</span> +1 987 654 321</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Siblings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-bold text-slate-800">Siblings (Family ID: {selectedStudent.metadata?.familyId})</h3>
            </div>
            {siblings.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No siblings found linked to this Family ID.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siblings.map(sib => (
                  <div key={sib._id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer" onClick={() => setSelectedStudent(sib)}>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {sib.title.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{sib.title}</h4>
                      <p className="text-xs text-slate-500">{sib.metadata?.className} - {sib.metadata?.section}</p>
                    </div>
                    <ChevronRight className="ml-auto text-slate-400" size={20} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Ledger' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Student Ledger</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-between items-center mb-4">
              <div><p className="text-xs text-slate-500">Total Billed</p><p className="font-bold text-lg">Rs. 45,000</p></div>
              <div><p className="text-xs text-slate-500">Total Paid</p><p className="font-bold text-lg text-green-600">Rs. 30,000</p></div>
              <div className="text-right"><p className="text-xs text-slate-500">Balance Due</p><p className="font-bold text-lg text-red-600">Rs. 15,000</p></div>
            </div>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-sm text-slate-600">
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Description</th>
                  <th className="p-3 border-b text-right">Debit (+)</th>
                  <th className="p-3 border-b text-right">Credit (-)</th>
                  <th className="p-3 border-b text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-sm">01 Apr 2026</td>
                  <td className="p-3 text-sm">April Tuition Fee</td>
                  <td className="p-3 text-sm text-right">15,000</td>
                  <td className="p-3 text-sm text-right">-</td>
                  <td className="p-3 text-sm text-right font-bold">15,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm">10 Apr 2026</td>
                  <td className="p-3 text-sm">Cash Payment (Receipt #124)</td>
                  <td className="p-3 text-sm text-right">-</td>
                  <td className="p-3 text-sm text-right">15,000</td>
                  <td className="p-3 text-sm text-right font-bold">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Documents' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Uploaded Documents</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <UploadCloud size={48} className="mx-auto text-blue-500 mb-4" />
              <p className="text-slate-700 font-medium">Click or drag files to upload documents</p>
              <p className="text-xs text-slate-500 mt-2">Support for Images and PDFs</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentProfile;
