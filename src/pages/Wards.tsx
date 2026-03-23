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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Wards & Beds</h1>
          <p className="text-gray-500">Monitor bed occupancy and ward status.</p>
        </div>
        {(user?.role === 'Admin') && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
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
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <LayoutGrid className="w-5 h-5 text-gray-400 ml-2" />
        <div className="flex gap-2">
          {['All', 'Available', 'Occupied', 'Maintenance'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === s 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
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
                bed.status === 'Available' ? 'bg-white border-gray-100' :
                bed.status === 'Occupied' ? 'bg-blue-50 border-blue-100' :
                'bg-red-50 border-red-100'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${
                  bed.status === 'Available' ? 'bg-green-50 text-green-600' :
                  bed.status === 'Occupied' ? 'bg-blue-600 text-white' :
                  'bg-red-100 text-red-600'
                }`}>
                  <Bed className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-400">#{bed.id}</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-1 truncate">{bed.ward_type} Ward</h3>
              <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                bed.status === 'Available' ? 'text-green-600' :
                bed.status === 'Occupied' ? 'text-blue-600' :
                'text-red-600'
              }`}>
                {bed.status}
              </p>

              {bed.status === 'Occupied' ? (
                <div className="pt-4 border-t border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-bold truncate">{bed.patient_name}</span>
                  </div>
                  <button className="w-full py-2 bg-white text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all">
                    View Patient
                  </button>
                </div>
              ) : bed.status === 'Available' ? (
                <div className="pt-4 border-t border-gray-50">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
                    Assign Patient
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-red-100">
                  <p className="text-[10px] text-red-500 font-medium">Scheduled for cleaning</p>
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
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}
