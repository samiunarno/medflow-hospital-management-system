import React from 'react';
import { 
  Activity, 
  Calendar, 
  FileText, 
  Pill, 
  Clock, 
  ArrowRight, 
  Heart,
  Thermometer,
  Droplets,
  Wind,
  ChevronRight,
  Plus,
  Bell,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function PatientDashboard({ user }: any) {
  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Header */}
      <div className="relative bg-indigo-900 p-8 lg:p-16 rounded-[2rem] lg:rounded-[3rem] text-white overflow-hidden shadow-2xl shadow-indigo-100 group">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-indigo-200 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm">
              <Activity className="w-3 h-3" />
              Health Summary • Good
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight break-words">
              Hello, <br />
              <span className="text-indigo-400">{user?.username}</span>
            </h2>
            <p className="text-indigo-100/70 text-base lg:text-lg font-medium mb-8 lg:mb-10 leading-relaxed">
              Your health summary is looking <span className="text-white font-bold">excellent</span> today. 
              You have a follow-up appointment with <span className="text-indigo-300 font-bold underline underline-offset-4">Dr. Sarah Chen</span> tomorrow at 10:00 AM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/records" className="bg-white text-gray-900 px-6 lg:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-black/20 text-sm lg:text-base">
                <FileText className="w-5 h-5" />
                View My Records
              </Link>
              <Link to="/pharmacy" className="bg-indigo-800 text-white px-6 lg:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all border border-indigo-700 text-sm lg:text-base">
                <Pill className="w-5 h-5 text-indigo-400" />
                My Prescriptions
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent -z-0" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-30 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20 group-hover:translate-x-10 transition-transform duration-1000" />
        
        {/* Floating Stat Card */}
        <div className="absolute top-12 right-12 hidden xl:block">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] w-64 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-green-400">Normal</span>
            </div>
            <p className="text-2xl font-display font-bold text-white mb-1">72 bpm</p>
            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Resting Heart Rate</p>
          </motion.div>
        </div>
      </div>

      {/* Health Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalCard icon={Heart} label="Heart Rate" value="72 bpm" status="Normal" color="red" />
        <VitalCard icon={Thermometer} label="Body Temp" value="36.6 °C" status="Normal" color="orange" />
        <VitalCard icon={Droplets} label="Blood Pressure" value="120/80" status="Normal" color="blue" />
        <VitalCard icon={Wind} label="Oxygen Level" value="98%" status="Normal" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Prescriptions */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 lg:p-10 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-1 flex items-center gap-3">
                <Pill className="w-6 h-6 text-indigo-600" />
                Active Prescriptions
              </h3>
              <p className="text-sm text-gray-400 font-medium">Your current medication schedule.</p>
            </div>
            <button className="text-xs font-bold text-indigo-600 hover:underline underline-offset-4 text-left">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            <PrescriptionItem 
              medicine="Amoxicillin" 
              dosage="500mg, 3x daily" 
              duration="7 days" 
              status="In Progress" 
              color="blue"
            />
            <PrescriptionItem 
              medicine="Paracetamol" 
              dosage="1000mg, as needed" 
              duration="3 days" 
              status="Completed" 
              color="green"
            />
            <PrescriptionItem 
              medicine="Vitamin D3" 
              dosage="2000IU, 1x daily" 
              duration="30 days" 
              status="In Progress" 
              color="blue"
            />
          </div>
          <div className="p-8 mt-auto bg-gray-50/50 text-center">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 mx-auto">
              Request Refill
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900">Appointments</h3>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 lg:p-8 bg-indigo-900 rounded-[2rem] text-white relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-4">Tomorrow, 10:00 AM</p>
                <p className="text-xl lg:text-2xl font-display font-bold mb-1">Dr. Sarah Chen</p>
                <p className="text-sm text-indigo-200 mb-8 font-medium">Cardiology Follow-up</p>
                <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-bold text-sm shadow-xl hover:bg-indigo-50 transition-all">
                  Reschedule
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
            
            <div className="p-6 lg:p-8 bg-gray-50 rounded-[2rem] border border-gray-100 group cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">March 28, 02:30 PM</p>
              <p className="text-lg lg:text-xl font-display font-bold text-gray-900 mb-1">Dr. James Wilson</p>
              <p className="text-sm text-gray-500 font-medium">General Checkup</p>
            </div>
          </div>
          <button className="mt-8 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Book New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

function VitalCard({ icon: Icon, label, value, status, color }: any) {
  const colors: any = {
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-gray-50 shadow-sm relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={`p-3 lg:p-4 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <span className="text-[8px] lg:text-[10px] font-bold text-green-600 bg-green-50 px-2 lg:px-3 py-1 rounded-full uppercase tracking-widest">{status}</span>
      </div>
      <div className="relative z-10 min-w-0">
        <p className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-1 tracking-tight truncate">{value}</p>
        <p className="text-[8px] lg:text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{label}</p>
      </div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
    </motion.div>
  );
}

function PrescriptionItem({ medicine, dosage, duration, status, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50/50 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-600 gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
          <Pill className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base lg:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">{medicine}</p>
          <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-tight truncate">{dosage} • {duration}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 lg:gap-6">
        <span className={`px-3 lg:px-4 py-1.5 rounded-xl text-[8px] lg:text-[10px] font-bold uppercase tracking-widest border ${colors[color]}`}>
          {status}
        </span>
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </div>
    </div>
  );
}
