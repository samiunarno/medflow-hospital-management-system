import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { 
  FileText, 
  Search, 
  Plus, 
  User, 
  Stethoscope, 
  Calendar, 
  Clock, 
  ChevronRight,
  Filter,
  X,
  Sparkles,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

export default function MedicalRecords() {
  const { token, user } = useAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    details: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{ id: string, text: string, type: 'fast' | 'deep' } | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchPatientsAndDoctors();
    }
  }, [isModalOpen]);

  const fetchPatientsAndDoctors = async () => {
    try {
      const [pRes, dRes] = await Promise.all([
        fetch('/api/patients', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/doctors', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (pRes.ok) setPatients(await pRes.json());
      if (dRes.ok) setDoctors(await dRes.json());
    } catch (err) {
      console.error('Failed to fetch patients/doctors');
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/medical-records', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(r => 
    r.patient_name.toLowerCase().includes(search.toLowerCase()) || 
    r.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
    r.details.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchRecords();
        setFormData({
          patient_id: '',
          doctor_id: '',
          type: '',
          date: new Date().toISOString().split('T')[0],
          details: ''
        });
      }
    } catch (err) {
      console.error('Failed to create record');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAIAnalysis = async (record: any, type: 'fast' | 'deep') => {
    setAnalyzingId(`${record.id}-${type}`);
    try {
      let result = '';
      if (type === 'fast') {
        result = await geminiService.analyzeMedicalRecord(record);
      } else {
        const prompt = `Perform a deep clinical analysis of this medical record. Think through the implications, potential underlying conditions, and provide a high-level expert consultation summary:
        Record Type: ${record.type}
        Date: ${record.date}
        Details: ${record.details}
        Patient: ${record.patient_name}
        Doctor: ${record.doctor_name}`;
        result = await geminiService.complexAnalysis(prompt);
      }
      setAnalysisResult({ id: record.id, text: result, type });
    } catch (error) {
      console.error('AI Analysis error:', error);
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">Medical Records</h1>
          <p className="text-gray-500 font-medium">View and manage patient medical history.</p>
        </div>
        {user?.role === 'Doctor' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Record
          </button>
        )}
      </header>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">New Medical Record</h2>
                    <p className="text-gray-500 text-sm font-medium">Initialize a new patient record in the system.</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/5"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Patient</label>
                      <select
                        required
                        value={formData.patient_id}
                        onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="" className="bg-[#0a0a0a]">SELECT PATIENT</option>
                        {patients.map(p => (
                          <option key={p.id} value={p.id} className="bg-[#0a0a0a]">{p.name.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Doctor</label>
                      <select
                        required
                        value={formData.doctor_id}
                        onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="" className="bg-[#0a0a0a]">SELECT DOCTOR</option>
                        {doctors.map(d => (
                          <option key={d.id} value={d.id} className="bg-[#0a0a0a]">{d.name.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Record Type</label>
                      <input
                        type="text"
                        required
                        placeholder="E.G. GENERAL CHECKUP"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Clinical Details</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="ENTER DETAILED CLINICAL OBSERVATIONS..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-800 resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-white/5 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {submitting ? 'Processing...' : 'Authorize Record'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="bg-white/2 p-4 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search records by patient, doctor, or details..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-400 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all border border-white/5">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Records Timeline */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading records...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="py-20 text-center text-gray-400">No records found.</div>
        ) : (
          filteredRecords.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/5"
            >
              <div className="absolute left-[-4px] top-4 w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" />
              
              <div className="bg-white/2 p-6 rounded-3xl border border-white/5 shadow-sm hover:bg-white/5 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 text-blue-400 rounded-2xl border border-blue-500/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-lg truncate group-hover:text-blue-400 transition-colors">{record.type}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 shrink-0 border border-white/5">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Patient</p>
                        <p className="text-sm font-bold text-white truncate">{record.patient_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Doctor</p>
                        <p className="text-sm font-bold text-white truncate">{record.doctor_name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm">{record.details}</p>
                </div>

                {/* AI Analysis Result */}
                <AnimatePresence>
                  {analysisResult?.id === record.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <div className={`p-6 rounded-2xl border ${
                        analysisResult.type === 'deep' 
                          ? 'bg-purple-600/5 border-purple-500/20' 
                          : 'bg-blue-600/5 border-blue-500/20'
                      }`}>
                        <div className="flex items-center gap-2 mb-4">
                          {analysisResult.type === 'deep' ? (
                            <BrainCircuit className="w-5 h-5 text-purple-400" />
                          ) : (
                            <Sparkles className="w-5 h-5 text-blue-400" />
                          )}
                          <h4 className={`text-xs font-bold uppercase tracking-[0.2em] ${
                            analysisResult.type === 'deep' ? 'text-purple-400' : 'text-blue-400'
                          }`}>
                            {analysisResult.type === 'deep' ? 'Deep Clinical Insight' : 'Gemini AI Summary'}
                          </h4>
                          <button 
                            onClick={() => setAnalysisResult(null)}
                            className="ml-auto text-gray-600 hover:text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {analysisResult.text}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleAIAnalysis(record, 'fast')}
                      disabled={analyzingId === `${record.id}-fast`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                    >
                      {analyzingId === `${record.id}-fast` ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3" />
                      )}
                      AI Summary
                    </button>
                    <button 
                      onClick={() => handleAIAnalysis(record, 'deep')}
                      disabled={analyzingId === `${record.id}-deep`}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-xl text-xs font-bold hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50"
                    >
                      {analyzingId === `${record.id}-deep` ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <BrainCircuit className="w-3 h-3" />
                      )}
                      Deep Insight
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors text-sm uppercase tracking-widest">
                    View Full Report
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
