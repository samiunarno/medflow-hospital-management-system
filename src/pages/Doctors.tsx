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
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Doctors() {
  const { token, user } = useAuth();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-500">Manage medical staff and specializations.</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Plus className="w-5 h-5" />
            Add New Doctor
          </button>
        )}
      </header>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, specialization, or department..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold">
                    {doctor.name.split(' ').pop()?.[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors truncate">{doctor.name}</h3>
                    <p className="text-sm font-medium text-blue-500 truncate">{doctor.specialization}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Hospital className="w-4 h-4" />
                    <span className="text-sm font-medium">Department</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 truncate">{doctor.department_name}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Contact</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 truncate">{doctor.contact}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl gap-2">
                  <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-sm font-medium">Doctor ID</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">{doctor.doctor_id}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  View Profile
                </button>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
