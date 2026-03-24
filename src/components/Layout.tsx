import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AIChatBot from './AIChatBot';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  Bed, 
  Pill, 
  FileText, 
  BarChart3, 
  LogOut, 
  Menu,
  X,
  Activity,
  Bell,
  Search,
  Settings,
  ChevronRight,
  Command,
  HelpCircle,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth > 1024);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['Admin', 'Doctor', 'Patient', 'Staff'] },
    { label: 'Patients', icon: Users, path: '/patients', roles: ['Admin', 'Doctor', 'Staff'] },
    { label: 'Doctors', icon: UserRound, path: '/doctors', roles: ['Admin', 'Staff'] },
    { label: 'Wards & Beds', icon: Bed, path: '/wards', roles: ['Admin', 'Staff'] },
    { label: 'Pharmacy', icon: Pill, path: '/pharmacy', roles: ['Admin', 'Staff', 'Doctor'] },
    { label: 'Medical Records', icon: FileText, path: '/records', roles: ['Admin', 'Doctor', 'Patient'] },
    { label: 'Analytics', icon: BarChart3, path: '/analytics', roles: ['Admin'] },
    { label: 'Users', icon: Users, path: '/users', roles: ['Admin'] },
  ];

  const filteredNavItems = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden font-sans text-white">
      {/* Noise Overlay */}
      <div className="fixed inset-0 noise z-50 pointer-events-none" />

      {/* Sidebar - Atmospheric Dark */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed lg:relative w-80 h-full bg-black/40 backdrop-blur-3xl border-r border-white/5 flex-shrink-0 flex flex-col z-50 lg:z-30"
            >
            <div className="p-10 flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-2xl shadow-white/10 group-hover:rotate-12 transition-transform duration-500">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tighter uppercase">MedFlow</span>
              </Link>
            </div>

            <nav className="flex-1 px-6 space-y-3 overflow-y-auto custom-scrollbar pt-4">
              <div className="px-4 mb-6">
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Navigation</p>
              </div>
              {filteredNavItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                      isActive
                        ? 'text-black shadow-[0_20px_50px_rgba(255,255,255,0.15)]'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div
                        initial={false}
                        animate={isActive ? { x: 0, opacity: 1 } : { x: -10, opacity: 0.5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'group-hover:text-blue-500'} transition-colors duration-500`} />
                      </motion.div>
                      <span className="font-bold text-sm uppercase tracking-widest whitespace-nowrap">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    )}
                    {isActive && (
                      <>
                        <motion.div 
                          layoutId="nav-active"
                          className="absolute inset-0 bg-white"
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.div
                          animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-transparent pointer-events-none"
                        />
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-8">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-black font-bold text-xl shadow-2xl">
                      {user?.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate uppercase tracking-widest overflow-hidden text-ellipsis">{user?.username}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] truncate">{user?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500 border border-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    Terminate Session
                  </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/20 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 lg:h-28 bg-black/20 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-12 flex-shrink-0 relative z-20">
          <div className="flex items-center gap-4 lg:gap-10">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all duration-500 border border-white/5"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="hidden md:flex items-center bg-white/5 px-6 py-3.5 rounded-2xl border border-white/5 focus-within:border-white/20 focus-within:bg-white/10 transition-all duration-500 w-[300px] lg:w-[400px]">
              <Search className="w-4 h-4 text-gray-500 mr-4" />
              <input 
                type="text" 
                placeholder="EXECUTE SEARCH..." 
                className="bg-transparent border-none focus:ring-0 text-[10px] font-bold tracking-[0.2em] w-full placeholder:text-gray-600 text-white"
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10 ml-2">
                <Command className="w-3 h-3 text-gray-500" />
                <span className="text-[8px] font-bold text-gray-500">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-white relative transition-all duration-500 border border-white/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all duration-500 border border-white/5">
                <Zap className="w-5 h-5" />
              </button>
            </div>
            <div className="h-10 w-px bg-white/10 mx-4" />
            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">System Operator</p>
                <p className="text-sm font-bold text-white uppercase tracking-widest">{user?.username}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-2xl">
                {user?.username[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 lg:p-20 custom-scrollbar relative">
          <div className="max-w-[1400px] mx-auto relative z-10">
            {children}
          </div>
          
          {/* Background Atmospheric Elements */}
          <div className="fixed top-1/4 right-0 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse" />
          <div className="fixed bottom-1/4 left-0 w-[30vw] h-[30vw] bg-purple-600/5 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse delay-1000" />
          <div className="fixed inset-0 bg-mesh opacity-20 -z-20 pointer-events-none" />
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.1);
        }
      `}} />
      <AIChatBot />
    </div>
  );
}
