import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Bed, 
  Pill, 
  Calendar, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Analytics() {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, trendsRes] = await Promise.all([
        fetch('/api/analytics/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/analytics/inpatient-trends', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const statsData = await statsRes.json();
      const trendsData = await trendsRes.json();
      setStats(statsData);
      setTrends(trendsData.reverse());
    } catch (err) {
      console.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading Analytics...</div>;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500">Comprehensive hospital performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 border border-gray-100 rounded-2xl font-bold hover:bg-gray-50 transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.patients.count} icon={Users} color="blue" trend="+12.5%" isUp={true} />
        <StatCard title="Inpatients" value={stats.inpatients.count} icon={Bed} color="orange" trend="+4.2%" isUp={true} />
        <StatCard title="Outpatients" value={stats.outpatients.count} icon={Calendar} color="green" trend="-2.1%" isUp={false} />
        <StatCard title="Medicines" value={stats.medicines.count} icon={Pill} color="purple" trend="+8.4%" isUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inpatient Trends */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Inpatient Admission Trends</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>Last 12 Months</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bed Status Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Bed Occupancy Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.bedStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="count"
                  nameKey="status"
                >
                  {stats.bedStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {stats.bedStatus.map((s: any, i: number) => (
              <div key={s.status} className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{s.status}</p>
                <p className="text-lg font-bold text-gray-900">{s.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Departmental Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Department</th>
                <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Doctors</th>
                <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Active Patients</th>
                <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Bed Utilization</th>
                <th className="pb-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'].map((dept, i) => (
                <tr key={dept} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 font-bold text-gray-900">{dept}</td>
                  <td className="py-6 text-gray-500">{4 + i} Specialists</td>
                  <td className="py-6 text-gray-500">{25 + i * 5} Total</td>
                  <td className="py-6">
                    <div className="w-full max-w-[120px] h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${70 + i * 5}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Optimal</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, trend, isUp }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1 truncate">{value}</p>
      </div>
    </motion.div>
  );
}

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'];
