import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Activity, Lock, User, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden relative">
      {/* Noise Overlay */}
      <div className="fixed inset-0 noise z-50 pointer-events-none opacity-20" />

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-between relative z-10">
        <Link to="/" className="flex items-center gap-3 group mb-20">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-white/10">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter uppercase">MedFlow</span>
        </Link>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] mb-8">
              <Lock className="w-3 h-3 text-blue-500" />
              Secure Authentication
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-4 leading-none break-words">
              System <br />
              <span className="text-blue-500">Access</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-12">Authorized personnel only.</p>
            
            <div className="mb-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <p className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mb-2">Demo Credentials</p>
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>ID: admin</span>
                <span>CODE: password123</span>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-3"
              >
                <Shield className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Username</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500/20 focus:bg-white/10 transition-all outline-none placeholder:text-gray-800"
                    placeholder="OPERATOR_ID"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] ml-4">Access Code</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500/20 focus:bg-white/10 transition-all outline-none placeholder:text-gray-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-6 rounded-[2rem] font-bold text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl shadow-white/5 flex items-center justify-center gap-4 group"
              >
                {isLoading ? 'Authenticating...' : 'Initialize Session'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>

            <p className="mt-12 text-center lg:text-left text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
              New operator? <Link to="/register" className="text-blue-500 hover:underline underline-offset-4">Request Credentials</Link>
            </p>
          </motion.div>
        </div>

        <div className="mt-20 text-[8px] font-bold text-gray-800 uppercase tracking-[0.5em]">
          © 2026 MedFlow Systems Inc • All rights reserved
        </div>
      </div>

      {/* Right Side - Immersive Visual */}
      <div className="hidden lg:flex w-1/2 bg-white/2 border-l border-white/5 relative items-center justify-center p-24 overflow-hidden">
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-48 h-48 bg-blue-600 rounded-[3rem] flex items-center justify-center mx-auto mb-16 shadow-[0_0_100px_rgba(59,130,246,0.3)] rotate-12">
              <Zap className="w-24 h-24 text-white" />
            </div>
          </motion.div>
          <h2 className="text-5xl font-display font-black uppercase tracking-tighter mb-8 leading-none">
            Precision <br />
            <span className="text-transparent stroke-text">Diagnostics</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed uppercase tracking-widest">
            "The definitive operating system for modern healthcare. Built for precision and security."
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">System Status</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-green-500">All Cores Optimal</p>
            </div>
          </div>
        </div>

        {/* Background Atmospheric Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
      `}} />
    </div>
  );
}
