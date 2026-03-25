import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Bed, 
  Calendar, 
  FileText,
  Filter,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ChatModal from '../components/ChatModal';
import { useTranslation } from 'react-i18next';

export default function Patients() {
  const { token, user } = useAuth();
  const { t } = useTranslation();
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatReceiver, setChatReceiver] = useState<any>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.patient_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">{t('patients')}</h1>
          <p className="text-gray-500 font-medium">Manage and view all patient records.</p>
        </div>
        {(user?.role === 'Admin' || user?.role === 'Staff') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Patient
          </button>
        )}
      </header>

      {/* Search and Filters */}
      <div className="bg-white/2 p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name or patient ID..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-400 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/5">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">Loading patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400">No patients found.</div>
        ) : (
          filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ y: -5 }}
              className="bg-white/2 p-6 rounded-3xl border border-white/5 shadow-sm hover:shadow-xl hover:shadow-black/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">
                    {patient.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors truncate">{patient.name}</h3>
                    <p className="text-sm font-bold text-gray-600 uppercase tracking-tight truncate">{patient.patient_id}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Type</span>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest truncate ${
                    patient.type === 'Inpatient' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {patient.type}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Hospital className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Dept</span>
                  </div>
                  <span className="text-sm font-bold text-white truncate">{patient.department_id?.name || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Bed className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Bed</span>
                  </div>
                  <span className="text-sm font-bold text-blue-400">#{patient.current_bed_id?._id?.slice(-4) || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                <button 
                  onClick={() => setSelectedPatient(patient)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Records
                </button>
                <button 
                  onClick={() => {
                    setChatReceiver(patient);
                    setIsChatOpen(true);
                  }}
                  className="p-3 bg-white/5 text-gray-500 rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/5 flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">{t('contact_patient')}</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {chatReceiver && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          receiverId={chatReceiver.user_id || chatReceiver._id}
          receiverName={chatReceiver.name}
        />
      )}
    </div>
  );
}

function Hospital({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 22V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 22h20" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M10 14h4" />
      <path d="M12 12v4" />
    </svg>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
