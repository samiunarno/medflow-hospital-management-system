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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">Analytics & Reports</h1>
          <p className="text-gray-500 font-medium">Comprehensive hospital performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-400 border border-white/5 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
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
        <div className="bg-white/2 p-8 rounded-3xl border border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Inpatient Admission Trends</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Last 12 Months</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bed Status Distribution */}
        <div className="bg-white/2 p-8 rounded-3xl border border-white/5 shadow-sm">
          <h3 className="text-xl font-bold text-white mb-8">Bed Occupancy Analysis</h3>
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
                  stroke="none"
                >
                  {stats.bedStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {stats.bedStatus.map((s: any, i: number) => (
              <div key={s.status} className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{s.status}</p>
                <p className="text-lg font-bold text-white">{s.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white/2 p-8 rounded-3xl border border-white/5 shadow-sm">
        <h3 className="text-xl font-bold text-white mb-8">Departmental Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 font-bold text-gray-600 text-[10px] uppercase tracking-widest">Department</th>
                <th className="pb-4 font-bold text-gray-600 text-[10px] uppercase tracking-widest">Doctors</th>
                <th className="pb-4 font-bold text-gray-600 text-[10px] uppercase tracking-widest">Active Patients</th>
                <th className="pb-4 font-bold text-gray-600 text-[10px] uppercase tracking-widest">Bed Utilization</th>
                <th className="pb-4 font-bold text-gray-600 text-[10px] uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'].map((dept, i) => (
                <tr key={dept} className="group hover:bg-white/5 transition-colors">
                  <td className="py-6 font-bold text-white">{dept}</td>
                  <td className="py-6 text-gray-400 text-sm">{4 + i} Specialists</td>
                  <td className="py-6 text-gray-400 text-sm">{25 + i * 5} Total</td>
                  <td className="py-6">
                    <div className="w-full max-w-[120px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                        style={{ width: `${70 + i * 5}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="px-3 py-1 bg-green-600/10 text-green-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-500/20">Optimal</span>
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
    blue: 'bg-blue-600/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-600/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-600/10 text-orange-400 border-orange-500/20',
    green: 'bg-green-600/10 text-green-400 border-green-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/2 p-6 rounded-3xl border border-white/5 shadow-sm group hover:bg-white/5 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]} border`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${isUp ? 'text-green-400 bg-green-600/10 border-green-500/20' : 'text-red-400 bg-red-600/10 border-red-500/20'}`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest truncate">{title}</p>
        <p className="text-3xl font-display font-bold text-white mt-1 truncate">{value}</p>
      </div>
    </motion.div>
  );
}

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'];
