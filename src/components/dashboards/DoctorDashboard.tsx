import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Clock, 
  ArrowRight, 
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function DoctorDashboard({ user }: any) {
  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Header */}
      <div className="relative bg-white/2 p-8 lg:p-16 rounded-[2rem] lg:rounded-[3rem] text-white overflow-hidden border border-white/5 group">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-400 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-500/20 backdrop-blur-sm">
              <Activity className="w-3 h-3" />
              On Duty • General Medicine
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight break-words">
              Welcome back, <br />
              <span className="text-blue-500">Dr. {user?.username}</span>
            </h2>
            <p className="text-gray-400 text-base lg:text-lg font-medium mb-8 lg:mb-10 leading-relaxed">
              You have <span className="text-white font-bold">8 appointments</span> scheduled for today. 
              Your first patient is arriving in <span className="text-blue-400 font-bold underline underline-offset-4">15 minutes</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/records" className="bg-white text-gray-900 px-6 lg:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-black/20 text-sm lg:text-base">
                <Plus className="w-5 h-5" />
                New Medical Record
              </Link>
              <Link to="/patients" className="bg-white/5 text-white px-6 lg:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/10 text-sm lg:text-base">
                <Search className="w-5 h-5 text-gray-400" />
                Search Patients
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent -z-0" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-10 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-10 group-hover:translate-x-10 transition-transform duration-1000" />
        
        {/* Floating Stat Card */}
        <div className="absolute top-12 right-12 hidden xl:block">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] w-64 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-green-400">+12%</span>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-1">92%</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recovery Rate</p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white/2 rounded-[2rem] lg:rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col group">
          <div className="p-6 lg:p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-1 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                Today's Schedule
              </h3>
              <p className="text-sm text-gray-500 font-medium">Manage your daily patient consultations.</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline underline-offset-4 text-left">View Full Calendar</button>
          </div>
          <div className="divide-y divide-white/5">
            <AppointmentItem 
              time="09:00 AM" 
              patient="Alice Johnson" 
              type="Follow-up Consultation" 
              status="Waiting" 
              color="orange"
              avatar="AJ"
            />
            <AppointmentItem 
              time="10:30 AM" 
              patient="Robert Smith" 
              type="Initial Consultation" 
              status="Confirmed" 
              color="green"
              avatar="RS"
            />
            <AppointmentItem 
              time="11:45 AM" 
              patient="Emma Davis" 
              type="Lab Results Review" 
              status="Confirmed" 
              color="green"
              avatar="ED"
            />
            <AppointmentItem 
              time="02:15 PM" 
              patient="Michael Brown" 
              type="General Checkup" 
              status="Scheduled" 
              color="blue"
              avatar="MB"
            />
          </div>
          <div className="p-8 mt-auto bg-white/2 text-center">
            <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
              Load More Appointments
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-8">
          <div className="bg-white/2 p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-8">Performance</h3>
            <div className="space-y-8 relative z-10">
              <QuickStat label="Total Patients" value="142" icon={Users} color="blue" trend="+5%" />
              <QuickStat label="Records Created" value="28" icon={FileText} color="purple" trend="+2" />
              <QuickStat label="Avg. Consultation" value="22m" icon={Clock} color="orange" trend="-3m" />
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
          </div>

          <div className="bg-blue-600/20 border border-blue-500/20 p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] text-white relative overflow-hidden group backdrop-blur-sm">
            <div className="relative z-10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-blue-500/20">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 leading-tight">Patient <br />Feedback</h3>
              <p className="text-blue-100/70 text-sm mb-8 leading-relaxed font-medium">
                "Dr. {user?.username} is incredibly thorough and empathetic. Highly recommend for any concerns."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full border border-blue-500/20" />
                <span className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">— Sarah M.</span>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentItem({ time, patient, type, status, color, avatar }: any) {
  const colors: any = {
    orange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    green: 'bg-green-500/10 text-green-500 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/5 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600 gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
        <div className="flex sm:flex-col items-center justify-center sm:w-20 lg:w-24 gap-2 sm:gap-0">
          <p className="text-sm font-bold text-white">{time.split(' ')[0]}</p>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{time.split(' ')[1]}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all text-xs lg:text-base border border-white/5">
            {avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white group-hover:text-blue-400 transition-colors text-sm lg:text-base truncate">{patient}</p>
            <p className="text-[10px] lg:text-xs text-gray-500 font-bold uppercase tracking-tight truncate">{type}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 lg:gap-6">
        <span className={`px-3 lg:px-4 py-1.5 rounded-xl text-[8px] lg:text-[10px] font-bold uppercase tracking-widest border ${colors[color]}`}>
          {status}
        </span>
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-white/5 rounded-xl text-gray-500 group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all border border-white/5">
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon: Icon, color, trend }: any) {
  const colors: any = {
    blue: 'bg-blue-600/10 text-blue-500 border-blue-500/20',
    purple: 'bg-purple-600/10 text-purple-500 border-purple-500/20',
    orange: 'bg-orange-600/10 text-orange-500 border-orange-500/20',
  };

  return (
    <div className="flex items-center justify-between group/stat">
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-2xl ${colors[color]} border group-hover/stat:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 truncate">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-display font-bold text-white truncate">{value}</span>
            <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-orange-500'}`}>
              {trend}
            </span>
          </div>
        </div>
      </div>
      <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-gray-500 opacity-0 group-hover/stat:opacity-100 transition-all border border-white/10">
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}
