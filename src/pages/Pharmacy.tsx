import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  Pill, 
  Search, 
  Plus, 
  Package, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Tag,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Pharmacy() {
  const { token, user } = useAuth();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, [search]);

  const fetchMedicines = async () => {
    try {
      const res = await fetch(`/api/medicines?q=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error('Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy</h1>
          <p className="text-gray-500">Manage medicine inventory and prescriptions.</p>
        </div>
        {(user?.role === 'Admin') && (
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Plus className="w-5 h-5" />
            Add New Medicine
          </button>
        )}
      </header>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by brand, generic name, or alias..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-gray-400">Loading medicines...</div>
        ) : medicines.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400">No medicines found.</div>
        ) : (
          medicines.map((med) => (
            <motion.div
              key={med.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                    <Pill className="w-8 h-8" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors truncate">{med.brand_name}</h3>
                    <p className="text-sm font-medium text-gray-400 truncate">{med.generic_name}</p>
                  </div>
                </div>
                {med.stock_quantity < 10 && (
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg" title="Low Stock">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Package className="w-4 h-4" />
                    <span className="text-sm font-medium">In Stock</span>
                  </div>
                  <span className={`text-sm font-bold ${med.stock_quantity < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                    {med.stock_quantity} units
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-500">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Price</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">${med.price.toFixed(2)}</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Aliases</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(med.aliases || '[]').map((alias: string) => (
                      <span key={alias} className="text-[10px] font-bold px-2 py-1 bg-white text-gray-500 rounded-lg border border-gray-100">
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {(user?.role === 'Admin' || user?.role === 'Staff') && (
                <div className="mt-6 pt-6 border-t border-gray-50 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 rounded-2xl font-bold hover:bg-green-100 transition-all">
                    Update Stock
                  </button>
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 hover:text-gray-900 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
