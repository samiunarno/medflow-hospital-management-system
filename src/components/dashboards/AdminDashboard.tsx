import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Bed, 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Zap,
  Shield,
  Layers,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function AdminDashboard({ stats, trends, pendingUsers, onApprove }: any) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const filteredPendingUsers = pendingUsers?.filter((user: any) => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const headers = ['ID', 'Username', 'Role', 'Status', 'Created At'];
    const csvData = pendingUsers.map((u: any) => [
      u._id,
      u.username,
      u.role,
      u.status,
      new Date(u.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pending_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pieData = [
    { name: 'Occupied', value: stats?.occupiedBeds || 0 },
    { name: 'Available', value: (stats?.totalBeds || 0) - (stats?.occupiedBeds || 0) }
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header - Mission Control Style */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/5 pb-12">
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-500 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] mb-6 border border-blue-500/20">
            <Cpu className="w-3 h-3" />
            System Core v4.2.0
          </div>
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-4 tracking-tighter uppercase leading-none break-words">
            Mission <br />
            <span className="text-transparent stroke-text">Control</span>
          </h1>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            All systems operational • 0.1s Latency
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-mono text-xs font-bold text-gray-400 flex items-center gap-4 backdrop-blur-xl">
            <Calendar className="w-4 h-4 text-blue-500" />
            23 MAR 2026 • 14:27 UTC
          </div>
          <button 
            onClick={handleExport}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl shadow-white/5 flex items-center gap-3"
          >
            Export Telemetry
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid - Hardware Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <StatCard 
          title="Total Patients" 
          value={stats?.totalPatients || 0} 
          icon={Users} 
          trend="+12.5%" 
          trendUp={true}
          color="blue"
        />
        <StatCard 
          title="Active Doctors" 
          value={stats?.totalDoctors || 0} 
          icon={Stethoscope} 
          trend="+2" 
          trendUp={true}
          color="purple"
        />
        <StatCard 
          title="Bed Occupancy" 
          value={`${stats?.bedOccupancy || 0}%`} 
          icon={Bed} 
          trend="-3.2%" 
          trendUp={false}
          color="orange"
        />
        <StatCard 
          title="Departments" 
          value={stats?.totalDepartments || 0} 
          icon={Activity} 
          trend="Stable" 
          trendUp={true}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Chart - Immersive Dark */}
        <div className="lg:col-span-2 bg-white/2 border border-white/5 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-12 relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
            <div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2 uppercase tracking-tighter">Inpatient Trends</h3>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">Telemetry Stream • 30 Day Window</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button className="px-4 py-2 bg-white/10 rounded-lg text-[8px] font-bold uppercase tracking-widest text-white">Live</button>
                <button className="px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">History</button>
              </div>
            </div>
          </div>
          <div className="h-[300px] lg:h-[400px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#4b5563', fontSize: 10, fontWeight: 800, fontFamily: 'Space Grotesk'}} 
                  dy={20} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#4b5563', fontSize: 10, fontWeight: 800, fontFamily: 'Space Grotesk'}} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#000', 
                    borderRadius: '24px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 40px 60px -15px rgba(0,0,0,0.5)',
                    padding: '20px 24px',
                    backdropFilter: 'blur(20px)'
                  }}
                  itemStyle={{color: '#3b82f6', fontWeight: 'bold', fontSize: '12px', fontFamily: 'Space Grotesk'}}
                  labelStyle={{fontWeight: 'bold', color: '#fff', marginBottom: '8px', fontSize: '14px', fontFamily: 'Syne'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  animationDuration={3000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] group-hover:scale-125 transition-transform duration-1000" />
        </div>

        {/* Bed Distribution - Hardware Style */}
        <div className="bg-white/2 border border-white/5 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-12 flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-12 relative z-10">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-white uppercase tracking-tighter">Resource</h3>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 border border-white/10 group-hover:text-blue-500 transition-colors">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="h-[250px] lg:h-[300px] relative mb-12 z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={12}
                  dataKey="value"
                  animationDuration={2000}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="none"
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{backgroundColor: '#000', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-6xl font-display font-black text-white leading-none mb-2 tracking-tighter">{stats?.occupiedBeds || 0}</p>
              <p className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.4em]">Occupied</p>
            </div>
          </div>
          <div className="space-y-4 mt-auto relative z-10">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i], boxShadow: `0 0 10px ${COLORS[i]}`}} />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-lg font-mono font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
        </div>
      </div>

      {/* Pending Approvals - Data Grid Style */}
      <div className="bg-white/2 border border-white/5 rounded-[2rem] lg:rounded-[3rem] overflow-hidden relative group">
        <div className="p-6 lg:p-12 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 relative z-10">
          <div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2 uppercase tracking-tighter">Queue Management</h3>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">Awaiting Authorization • High Priority</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" />
              <input 
                type="text" 
                placeholder="SCAN USERS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold tracking-[0.2em] w-full sm:w-64 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-700"
              />
            </div>
            <Link 
              to="/users"
              className="w-full sm:w-auto bg-blue-600/10 text-blue-400 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20 text-center"
            >
              Manage All Users
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 lg:px-12 py-6 lg:py-8 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Subject Profile</th>
                <th className="px-6 lg:px-12 py-6 lg:py-8 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Classification</th>
                <th className="px-6 lg:px-12 py-6 lg:py-8 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Timestamp</th>
                <th className="px-6 lg:px-12 py-6 lg:py-8 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em] text-right">Authorization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPendingUsers?.map((user: any) => (
                <tr key={user._id} className="hover:bg-white/5 transition-all duration-500 group/row">
                  <td className="px-6 lg:px-12 py-6 lg:py-10">
                    <div className="flex items-center gap-4 lg:gap-6">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/5 text-white rounded-2xl flex items-center justify-center font-display font-bold text-xl lg:text-2xl border border-white/10 group-hover/row:bg-blue-600 group-hover/row:border-blue-500 transition-all duration-500">
                        {user.username[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-base lg:text-lg uppercase tracking-tighter truncate">{user.username}</p>
                        <p className="text-[8px] font-mono font-bold text-gray-600 uppercase tracking-widest truncate">ID: {user._id.slice(-12)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-12 py-6 lg:py-10">
                    <span className={`px-4 lg:px-6 py-2 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] border ${
                      user.role === 'Doctor' ? 'bg-purple-600/10 text-purple-500 border-purple-500/20' :
                      user.role === 'Patient' ? 'bg-blue-600/10 text-blue-500 border-blue-500/20' :
                      'bg-green-600/10 text-green-500 border-green-500/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 lg:px-12 py-6 lg:py-10">
                    <div className="flex items-center gap-3 text-xs font-mono font-bold text-gray-500">
                      <Clock className="w-4 h-4 text-gray-700" />
                      {new Date(user.createdAt).toISOString().split('T')[0].replace(/-/g, ' / ')}
                    </div>
                  </td>
                  <td className="px-6 lg:px-12 py-6 lg:py-10 text-right">
                    <div className="flex items-center justify-end gap-2 lg:gap-4">
                      <button 
                        onClick={() => onApprove(user._id, 'Approved')}
                        className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center bg-green-600/10 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                        title="Authorize"
                      >
                        <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                      <button 
                        onClick={() => onApprove(user._id, 'Rejected')}
                        className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center bg-red-600/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                        title="Decline"
                      >
                        <XCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!pendingUsers || pendingUsers.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-12 py-32 text-center">
                    <div className="max-w-sm mx-auto">
                      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-700 border border-white/10">
                        <Shield className="w-10 h-10" />
                      </div>
                      <p className="text-white font-display font-bold text-2xl uppercase tracking-tighter mb-2">Queue Empty</p>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">No pending authorizations detected in the stream.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute inset-0 bg-mesh opacity-10 -z-10 pointer-events-none" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
      `}} />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendUp, color }: any) {
  const colors: any = {
    blue: 'bg-blue-600/10 text-blue-500 border-blue-500/20',
    purple: 'bg-purple-600/10 text-purple-500 border-purple-500/20',
    orange: 'bg-orange-600/10 text-orange-500 border-orange-500/20',
    green: 'bg-green-600/10 text-green-500 border-green-500/20',
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white/2 p-6 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-white/5 relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-8 lg:mb-10 relative z-10">
        <div className={`p-4 lg:p-5 rounded-2xl border ${colors[color]} group-hover:scale-110 transition-transform duration-700`}>
          <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
        </div>
        <div className={`flex items-center gap-2 px-3 lg:px-4 py-1.5 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest ${trendUp ? 'bg-green-600/10 text-green-500' : 'bg-red-600/10 text-red-500'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" /> : <ArrowDownRight className="w-3 h-3 lg:w-4 lg:h-4" />}
          {trend}
        </div>
      </div>
        <div className="relative z-10 min-w-0">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-2 tracking-tighter uppercase leading-none truncate">{value}</p>
          <p className="text-[8px] lg:text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em] truncate">{title}</p>
        </div>
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-mesh opacity-10 -z-10" />
    </motion.div>
  );
}
