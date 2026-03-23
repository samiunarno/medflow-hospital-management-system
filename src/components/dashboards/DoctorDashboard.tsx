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
      <div className="relative bg-gray-900 p-8 lg:p-16 rounded-[2rem] lg:rounded-[3rem] text-white overflow-hidden shadow-2xl shadow-gray-200 group">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-500/20 backdrop-blur-sm">
              <Activity className="w-3 h-3" />
              On Duty • General Medicine
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight break-words">
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
              <Link to="/patients" className="bg-gray-800 text-white px-6 lg:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-700 transition-all border border-gray-700 text-sm lg:text-base">
                <Search className="w-5 h-5 text-gray-400" />
                Search Patients
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent -z-0" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 group-hover:translate-x-10 transition-transform duration-1000" />
        
        {/* Floating Stat Card */}
        <div className="absolute top-12 right-12 hidden xl:block">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] w-64 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-green-400">+12%</span>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-1">92%</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recovery Rate</p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 lg:p-10 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-1 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                Today's Schedule
              </h3>
              <p className="text-sm text-gray-400 font-medium">Manage your daily patient consultations.</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline underline-offset-4 text-left">View Full Calendar</button>
          </div>
          <div className="divide-y divide-gray-50">
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
          <div className="p-8 mt-auto bg-gray-50/50 text-center">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 mx-auto">
              Load More Appointments
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-8">
          <div className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-gray-50 shadow-sm relative overflow-hidden group">
            <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-8">Performance</h3>
            <div className="space-y-8 relative z-10">
              <QuickStat label="Total Patients" value="142" icon={Users} color="blue" trend="+5%" />
              <QuickStat label="Records Created" value="28" icon={FileText} color="purple" trend="+2" />
              <QuickStat label="Avg. Consultation" value="22m" icon={Clock} color="orange" trend="-3m" />
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
          </div>

          <div className="bg-blue-600 p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] text-white shadow-2xl shadow-blue-100 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 leading-tight">Patient <br />Feedback</h3>
              <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">
                "Dr. {user?.username} is incredibly thorough and empathetic. Highly recommend for any concerns."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full border border-white/20" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">— Sarah M.</span>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentItem({ time, patient, type, status, color, avatar }: any) {
  const colors: any = {
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50/50 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600 gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
        <div className="flex sm:flex-col items-center justify-center sm:w-20 lg:w-24 gap-2 sm:gap-0">
          <p className="text-sm font-bold text-gray-900">{time.split(' ')[0]}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{time.split(' ')[1]}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all text-xs lg:text-base">
            {avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm lg:text-base truncate">{patient}</p>
            <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-tight truncate">{type}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 lg:gap-6">
        <span className={`px-3 lg:px-4 py-1.5 rounded-xl text-[8px] lg:text-[10px] font-bold uppercase tracking-widest border ${colors[color]}`}>
          {status}
        </span>
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-300 group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon: Icon, color, trend }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="flex items-center justify-between group/stat">
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-2xl ${colors[color]} group-hover/stat:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-display font-bold text-gray-900 truncate">{value}</span>
            <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-orange-500'}`}>
              {trend}
            </span>
          </div>
        </div>
      </div>
      <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg text-gray-300 opacity-0 group-hover/stat:opacity-100 transition-all">
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}
