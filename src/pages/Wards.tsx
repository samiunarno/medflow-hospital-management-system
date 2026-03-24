import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  Bed, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  ArrowRight,
  LayoutGrid,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Wards() {
  const { token, user } = useAuth();
  const [beds, setBeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      const res = await fetch('/api/beds', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBeds(data);
    } catch (err) {
      console.error('Failed to fetch beds');
    } finally {
      setLoading(false);
    }
  };

  const filteredBeds = beds.filter(b => filter === 'All' || b.status === filter);

  const stats = {
    total: beds.length,
    available: beds.filter(b => b.status === 'Available').length,
    occupied: beds.filter(b => b.status === 'Occupied').length,
    maintenance: beds.filter(b => b.status === 'Maintenance').length,
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">Wards & Beds</h1>
          <p className="text-gray-500 font-medium">Monitor bed occupancy and ward status.</p>
        </div>
        {(user?.role === 'Admin') && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Plus className="w-5 h-5" />
            Add New Ward
          </button>
        )}
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Beds" value={stats.total} icon={Bed} color="blue" />
        <StatCard title="Available" value={stats.available} icon={CheckCircle} color="green" />
        <StatCard title="Occupied" value={stats.occupied} icon={Clock} color="orange" />
        <StatCard title="Maintenance" value={stats.maintenance} icon={AlertCircle} color="red" />
      </div>

      {/* Filters */}
      <div className="bg-white/2 p-4 rounded-3xl border border-white/5 flex items-center gap-4">
        <LayoutGrid className="w-5 h-5 text-gray-500 ml-2" />
        <div className="flex gap-2">
          {['All', 'Available', 'Occupied', 'Maintenance'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === s 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">Loading beds...</div>
        ) : filteredBeds.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400">No beds found.</div>
        ) : (
          filteredBeds.map((bed) => (
            <motion.div
              key={bed.id}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-3xl border transition-all ${
                bed.status === 'Available' ? 'bg-white/2 border-white/5' :
                bed.status === 'Occupied' ? 'bg-blue-600/10 border-blue-500/20' :
                'bg-red-600/10 border-red-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${
                  bed.status === 'Available' ? 'bg-green-600/10 text-green-400 border border-green-500/20' :
                  bed.status === 'Occupied' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' :
                  'bg-red-600/10 text-red-400 border border-red-500/20'
                }`}>
                  <Bed className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-600">#{bed.id}</span>
              </div>

              <h3 className="font-bold text-white mb-1 truncate">{bed.ward_type} Ward</h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${
                bed.status === 'Available' ? 'text-green-400' :
                bed.status === 'Occupied' ? 'text-blue-400' :
                'text-red-400'
              }`}>
                {bed.status}
              </p>

              {bed.status === 'Occupied' ? (
                <div className="pt-4 border-t border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-bold truncate">{bed.patient_name}</span>
                  </div>
                  <button className="w-full py-2 bg-white/5 text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20">
                    View Patient
                  </button>
                </div>
              ) : bed.status === 'Available' ? (
                <div className="pt-4 border-t border-white/5">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                    Assign Patient
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-red-500/20">
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">Scheduled for maintenance</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-600/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-600/10 text-green-400 border-green-500/20',
    orange: 'bg-orange-600/10 text-orange-400 border-orange-500/20',
    red: 'bg-red-600/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="bg-white/2 p-6 rounded-3xl border border-white/5 shadow-sm group hover:bg-white/5 transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${colors[color]} border`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest truncate">{title}</p>
          <p className="text-2xl font-display font-bold text-white truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}
