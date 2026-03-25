import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  UserRound, 
  Search, 
  Plus, 
  Stethoscope, 
  Phone, 
  Mail, 
  Hospital,
  ChevronRight,
  MoreVertical,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import ChatModal from '../components/ChatModal';
import { useTranslation } from 'react-i18next';

export default function Doctors() {
  const { token, user } = useAuth();
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.specialization.toLowerCase().includes(search.toLowerCase()) ||
    d.department_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">{t('doctors')}</h1>
          <p className="text-gray-500 font-medium">Manage medical staff and specializations.</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Plus className="w-5 h-5" />
            Add New Doctor
          </button>
        )}
      </header>

      {/* Search Bar */}
      <div className="bg-white/2 p-4 rounded-3xl border border-white/5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, specialization, or department..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">Loading doctors...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400">No doctors found.</div>
        ) : (
          filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              whileHover={{ y: -5 }}
              className="bg-white/2 p-6 rounded-3xl border border-white/5 shadow-sm hover:shadow-xl hover:shadow-black/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-2xl font-bold">
                    {doctor.name.split(' ').pop()?.[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors truncate">{doctor.name}</h3>
                    <p className="text-sm font-bold text-blue-500 uppercase tracking-tight truncate">{doctor.specialization}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Hospital className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Dept</span>
                  </div>
                  <span className="text-sm font-bold text-white truncate">{doctor.department_id?.name || 'N/A'}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Contact</span>
                  </div>
                  <span className="text-sm font-bold text-white truncate">{doctor.contact}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Doctor ID</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider truncate">{doctor.doctor_id}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                  View Profile
                </button>
                <button 
                  onClick={() => {
                    // For now, we assume the doctor has a user account with the same name or we'd need a mapping
                    // In a real app, we'd have doctor.user_id
                    // For demo, we'll just use a placeholder or the doctor's name to find a user
                    setSelectedDoctor(doctor);
                    setIsChatOpen(true);
                  }}
                  className="p-3 bg-white/5 text-gray-500 rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/5 flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">{t('contact_doctor')}</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {selectedDoctor && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          receiverId={selectedDoctor.user_id || selectedDoctor._id} // Fallback to doctor ID if user_id not present
          receiverName={selectedDoctor.name}
        />
      )}
    </div>
  );
}
