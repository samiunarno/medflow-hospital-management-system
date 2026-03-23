import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  FileText, 
  Search, 
  Plus, 
  User, 
  Stethoscope, 
  Calendar, 
  Clock, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

export default function MedicalRecords() {
  const { token, user } = useAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/medical-records', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(r => 
    r.patient_name.toLowerCase().includes(search.toLowerCase()) || 
    r.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
    r.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-500">View and manage patient medical history.</p>
        </div>
        {user?.role === 'Doctor' && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Plus className="w-5 h-5" />
            Add New Record
          </button>
        )}
      </header>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search records by patient, doctor, or details..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-medium hover:bg-gray-100 transition-all">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Records Timeline */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading records...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="py-20 text-center text-gray-400">No records found.</div>
        ) : (
          filteredRecords.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200"
            >
              <div className="absolute left-[-4px] top-4 w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" />
              
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg truncate">{record.type}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-medium">Patient</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{record.patient_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-medium">Doctor</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{record.doctor_name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{record.details}</p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                    View Full Report
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
