import React from 'react';
import { 
  Bed, 
  Pill, 
  Users, 
  Activity, 
  Clock, 
  ArrowRight, 
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function StaffDashboard({ user, stats }: any) {
  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Header */}
      <div className="relative bg-emerald-900 p-12 lg:p-16 rounded-[3rem] text-white overflow-hidden shadow-2xl shadow-emerald-100 group">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3" />
              System Status • Operational
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight break-words">
              Welcome back, <br />
              <span className="text-emerald-400">{user?.username}</span>
            </h2>
            <p className="text-emerald-100/70 text-lg font-medium mb-10 leading-relaxed">
              Hospital operations are running <span className="text-white font-bold">smoothly</span>. 
              There are <span className="text-emerald-300 font-bold underline underline-offset-4">4 new registrations</span> pending and 2 low-stock alerts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/patients" className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-600 hover:text-white transition-all shadow-xl shadow-black/20">
                <Plus className="w-5 h-5" />
                Register Patient
              </Link>
              <Link to="/wards" className="bg-emerald-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-700 transition-all border border-emerald-700">
                <Bed className="w-5 h-5 text-emerald-400" />
                Manage Beds
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/20 to-transparent -z-0" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-30 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-600 rounded-full blur-[100px] opacity-20 group-hover:translate-x-10 transition-transform duration-1000" />
        
        {/* Floating Stat Card */}
        <div className="absolute top-12 right-12 hidden xl:block">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] w-64 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-emerald-300">Active</span>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-1">124</p>
            <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Total Staff</p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bed Status Summary */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-display font-bold text-gray-900">Bed Status</h3>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Bed className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-3xl border border-emerald-100 group hover:bg-emerald-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-700 uppercase tracking-tight">Available</span>
              </div>
              <span className="text-2xl font-display font-bold text-emerald-700">12</span>
            </div>
            <div className="flex items-center justify-between p-6 bg-blue-50 rounded-3xl border border-blue-100 group hover:bg-blue-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-bold text-blue-700 uppercase tracking-tight">Occupied</span>
              </div>
              <span className="text-2xl font-display font-bold text-blue-700">18</span>
            </div>
            <div className="flex items-center justify-between p-6 bg-orange-50 rounded-3xl border border-orange-100 group hover:bg-orange-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm font-bold text-orange-700 uppercase tracking-tight">Maintenance</span>
              </div>
              <span className="text-2xl font-display font-bold text-orange-700">2</span>
            </div>
          </div>
          <Link to="/wards" className="mt-10 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-gray-200 hover:shadow-emerald-200">
            View All Wards
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-1 flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-600" />
                Recent Activity
              </h3>
              <p className="text-sm text-gray-400 font-medium">Real-time log of hospital operations.</p>
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:underline underline-offset-4">View Full Log</button>
          </div>
          <div className="divide-y divide-gray-50">
            <ActivityItem 
              icon={Plus} 
              title="New Patient Admission" 
              desc="Alice Johnson admitted to ICU, Bed #4" 
              time="10 mins ago" 
              color="emerald"
            />
            <ActivityItem 
              icon={Package} 
              title="Prescription Dispensed" 
              desc="Amoxicillin dispensed for Robert Smith" 
              time="25 mins ago" 
              color="blue"
            />
            <ActivityItem 
              icon={AlertCircle} 
              title="Low Stock Alert" 
              desc="Paracetamol stock below 50 units" 
              time="1 hour ago" 
              color="orange"
            />
            <ActivityItem 
              icon={Bed} 
              title="Bed Status Updated" 
              desc="Bed #12 moved to Maintenance" 
              time="2 hours ago" 
              color="gray"
            />
          </div>
          <div className="p-8 mt-auto bg-gray-50/50 text-center">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 mx-auto">
              Load More Activity
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, title, desc, time, color }: any) {
  const colors: any = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    gray: 'bg-gray-50 text-gray-600 border-gray-100',
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50/50 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-emerald-600 gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
        <div className={`p-4 rounded-2xl ${colors[color]} border group-hover:scale-110 transition-transform duration-300 w-fit`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">{title}</p>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-tight truncate">{desc}</p>
        </div>
      </div>
      <div className="text-right flex items-center justify-between sm:justify-end gap-6">
        <div className="sm:block">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{time}</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
