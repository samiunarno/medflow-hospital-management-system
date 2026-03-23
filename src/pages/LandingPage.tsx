import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Shield, 
  Zap, 
  Heart, 
  ArrowRight, 
  Users, 
  Stethoscope, 
  Database, 
  Globe, 
  ChevronRight,
  Play,
  CheckCircle,
  Plus,
  Minus,
  Star,
  Sparkles,
  Layers,
  MousePointer2,
  Terminal,
  Cpu,
  Network,
  Lock,
  BarChart3,
  Server
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.2,
        ease: "circOut"
      }
    }
  } as const;

  return (
    <div ref={containerRef} className="relative bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans">
      {/* Noise Overlay */}
      <div className="fixed inset-0 noise z-50 pointer-events-none opacity-20" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[60] px-6 py-8 flex justify-between items-center mix-blend-difference">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-black group-hover:rotate-12 transition-transform duration-500">
            <Activity className="w-4 h-4 lg:w-6 lg:h-6" />
          </div>
          <span className="text-lg lg:text-2xl font-display font-bold tracking-tighter uppercase">MedFlow</span>
        </Link>
        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          <a href="#solutions" className="hover:text-blue-500 transition-colors">Solutions</a>
          <a href="#architecture" className="hover:text-blue-500 transition-colors">Architecture</a>
          <a href="#security" className="hover:text-blue-500 transition-colors">Security</a>
          <Link to="/login" className="hover:text-blue-500 transition-colors">Portal</Link>
        </div>
        <Link 
          to="/register" 
          className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-500"
        >
          Initialize
        </Link>
      </nav>

      {/* Hero Section - Editorial Style */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center relative z-10 w-full max-w-[1400px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-12 backdrop-blur-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              System Status: Operational
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-[12vw] sm:text-[10vw] lg:text-[14vw] font-display font-black leading-[0.85] tracking-tighter uppercase mb-12 break-words">
              The Core <br />
              <span className="text-transparent stroke-text">Protocol</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:items-end">
              <div className="text-center md:text-left max-w-xs mx-auto md:mx-0">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">v3.1.0-stable</span>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
                  A high-performance infrastructure for modern medical institutions. Precision-engineered for zero-latency care.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center group relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.3)]"
                >
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <ArrowRight className="w-8 h-8 relative z-10 group-hover:text-black transition-colors duration-500" />
                </motion.button>
              </div>
              <div className="text-center md:text-right flex flex-col items-center md:items-end gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                      className="w-12 h-12 rounded-full border-4 border-black bg-gray-800 overflow-hidden"
                    >
                      <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Network Capacity: 500+ Nodes
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Background Atmospheric Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[120px]" />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600">Explore</span>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 lg:py-12 border-y border-white/5 overflow-hidden bg-white/2">
        <div className="marquee">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex items-center gap-12 lg:gap-24 px-6 lg:px-12">
              <span className="text-[8vw] md:text-[4vw] font-display font-black uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity duration-500 cursor-default">
                Precision
              </span>
              <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500/50" />
              <span className="text-[8vw] md:text-[4vw] font-display font-black uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity duration-500 cursor-default">
                Scalability
              </span>
              <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-purple-500/50" />
              <span className="text-[8vw] md:text-[4vw] font-display font-black uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity duration-500 cursor-default">
                Innovation
              </span>
              <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500/50" />
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Section - Technical & Structured */}
      <section id="architecture" className="py-20 lg:py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-20 lg:mb-32">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] mb-8 text-blue-500">
              <Cpu className="w-3 h-3" />
              MedFlow Core
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
              The Architecture <br className="hidden lg:block" />of Trust
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-wider">
              Our infrastructure is built on a distributed data mesh, ensuring that patient records are always available, secure, and synchronized across the entire network.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {[
              { icon: Network, title: "Distributed Mesh", desc: "Decentralized data nodes for zero-point failure." },
              { icon: Server, title: "Edge Computing", desc: "Local processing for instantaneous diagnostic results." },
              { icon: Lock, title: "Quantum-Safe", desc: "Military-grade encryption for every medical transaction." },
              { icon: BarChart3, title: "Neural Analytics", desc: "Predictive models that anticipate patient needs." }
            ].map((item, i) => (
              <div key={i} className="p-12 border border-white/5 bg-white/2 hover:bg-white/5 transition-colors group">
                <item.icon className="w-8 h-8 text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-display font-bold uppercase tracking-tighter mb-4">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Grid Features - Refined Hardware Style */}
        <div id="solutions" className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-8 bg-white/2 border border-white/10 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-20 relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-mono text-gray-600">MODULE_01</span>
                </div>
                <h3 className="text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
                  Unified <br />Patient View
                </h3>
                <p className="text-gray-500 text-lg max-w-md leading-relaxed uppercase tracking-wider">
                  A single source of truth for every patient, accessible from any node in the network.
                </p>
              </div>
              <div className="mt-20 flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold">0.02ms</span>
                  <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Sync Speed</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold">100%</span>
                  <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Data Integrity</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent blur-[100px]" />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-4 bg-gray-900 border border-white/10 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-8">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-bold uppercase tracking-tighter mb-4">
                Compliance <br />Engine
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest mb-8">
                Automated HIPAA and GDPR compliance monitoring built into the core.
              </p>
              <div className="space-y-2">
                {[1,2,3].map(i => (
                  <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, delay: i * 0.2 }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-4 bg-blue-600 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 relative overflow-hidden group text-white"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8 backdrop-blur-md">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-bold uppercase tracking-tighter mb-4">
                Instant <br />Diagnostics
              </h3>
              <p className="text-blue-100 text-xs leading-relaxed uppercase tracking-widest">
                AI-assisted imaging and lab results delivered in seconds.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-8 bg-white/2 border border-white/10 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-20 relative overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h3 className="text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-6">
                  Predictive <br />Care
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 uppercase tracking-wider">
                  Anticipate patient needs with neural models trained on millions of clinical outcomes.
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/5 rounded-full text-[8px] font-bold uppercase tracking-widest border border-white/10">Neural_Net</div>
                  <div className="px-4 py-2 bg-white/5 rounded-full text-[8px] font-bold uppercase tracking-widest border border-white/10">v4.2</div>
                </div>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-black rounded-[2rem] border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full px-8 space-y-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.random() * 100}%` }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            className="h-full bg-blue-500/50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section - Professional Process */}
      <section className="py-20 lg:py-32 bg-white text-black relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-8">
                Seamless <br />Integration
              </h2>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                Deployment to full operational status in under 14 days.
              </p>
            </div>
            <div className="hidden lg:block text-[10vw] font-display font-black text-gray-50 uppercase leading-none">
              Process
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {[
              { step: "01", title: "Infrastructure Audit", desc: "We map your existing data silos and hardware nodes." },
              { step: "02", title: "Core Deployment", desc: "MedFlow Core is initialized on your private cloud." },
              { step: "03", title: "Data Migration", desc: "Legacy records are sanitized and ingested into the mesh." },
              { step: "04", title: "Operational Live", desc: "Full system activation with zero-downtime transition." }
            ].map((item, i) => (
              <div key={i} className="p-12 border border-gray-100 hover:bg-gray-50 transition-colors">
                <span className="text-5xl font-display font-black text-blue-100 mb-8 block">{item.step}</span>
                <h4 className="text-xl font-display font-bold uppercase tracking-tighter mb-4">{item.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section - Trust & Compliance */}
      <section id="security" className="py-32 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-6xl font-display font-black uppercase tracking-tighter mb-8 leading-none">
              Fortress <br />Security
            </h2>
            <p className="text-gray-500 text-lg mb-12 uppercase tracking-wider leading-relaxed">
              In healthcare, security isn't a feature—it's the foundation. MedFlow employs quantum-resistant encryption and hardware-level security modules.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <CheckCircle className="w-6 h-6 text-blue-500 mb-4" />
                <h5 className="text-sm font-bold uppercase tracking-widest mb-2">HIPAA Compliant</h5>
                <p className="text-xs text-gray-600 uppercase tracking-widest">Full regulatory alignment.</p>
              </div>
              <div>
                <CheckCircle className="w-6 h-6 text-blue-500 mb-4" />
                <h5 className="text-sm font-bold uppercase tracking-widest mb-2">AES-256 Bit</h5>
                <p className="text-xs text-gray-600 uppercase tracking-widest">Military-grade encryption.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full aspect-square relative">
            <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-[100px]" />
            <div className="relative z-10 w-full h-full border border-white/10 rounded-[4rem] bg-white/2 backdrop-blur-3xl p-12 flex flex-col justify-center items-center text-center">
              <Shield className="w-32 h-32 text-blue-500 mb-8 animate-pulse" />
              <div className="space-y-4 w-full max-w-xs">
                <div className="h-2 bg-white/5 rounded-full w-full" />
                <div className="h-2 bg-white/5 rounded-full w-3/4 mx-auto" />
                <div className="h-2 bg-white/5 rounded-full w-1/2 mx-auto" />
              </div>
              <p className="mt-12 text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em]">Security_Protocol_Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Atmospheric */}
      <section className="py-24 lg:py-48 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-[12vw] sm:text-[8vw] lg:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase mb-12">
              Ready to <br />
              <span className="text-blue-500">Initialize?</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mb-16 font-bold uppercase tracking-[0.3em]">
              Join the elite institutions building the future of medical care on MedFlow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/register" 
                className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl shadow-white/10"
              >
                Request Access
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-6 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-500 backdrop-blur-xl"
              >
                Portal Login
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background Atmospheric Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter uppercase">MedFlow</span>
            </div>
            <p className="text-gray-500 max-w-sm text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-12">
              The definitive operating system for modern healthcare. Built for precision, security, and the human experience.
            </p>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-all cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-all cursor-pointer">
                <Users className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Platform</h5>
            <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Company</h5>
            <ul className="space-y-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-24 pt-12 border-t border-white/5 flex justify-between items-center text-[8px] font-bold text-gray-700 uppercase tracking-[0.4em]">
          <span>© 2026 MedFlow Systems Inc.</span>
          <span>All Protocols Active.</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        .bg-mesh {
          background-image: radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.1) 0, transparent 50%),
                            radial-gradient(at 50% 0%, rgba(147, 51, 234, 0.1) 0, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(37, 99, 235, 0.1) 0, transparent 50%);
        }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
