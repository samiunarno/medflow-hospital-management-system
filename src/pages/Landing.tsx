import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hospital, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Stethoscope, 
  Bed, 
  Pill, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  Star,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Landing() {
  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <Hospital className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">MedFlow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">Services</a>
            <a href="#specialties" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">Specialties</a>
            <a href="#features" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">Why Us</a>
            <a href="#testimonials" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Sign In</Link>
            <Link to="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              Trusted by 500+ Medical Institutions
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-8">
              Modern Care for <span className="text-blue-600">Modern Hospitals.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
              MedFlow is an all-in-one hospital management ecosystem designed to streamline patient care, optimize staff workflows, and provide real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 rounded-2xl font-bold text-lg text-gray-900 border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/doctor${i}/100/100`} 
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    alt="Doctor"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900">Join 2,000+ Doctors</p>
                <p className="text-gray-500">Already using MedFlow daily</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100">
              <img 
                src="https://picsum.photos/seed/hospital-hero/1200/1000" 
                className="rounded-[2rem] w-full h-auto object-cover shadow-inner"
                alt="Hospital Dashboard"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 z-20 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Health</p>
                  <p className="text-xl font-bold text-gray-900">98.4% Stable</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 z-20 animate-float">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <Bed className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Occupancy</p>
                  <p className="text-xl font-bold text-gray-900">84% Full</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <StatItem value="100k+" label="Patients Served" />
            <StatItem value="500+" label="Hospitals" />
            <StatItem value="15k+" label="Medical Staff" />
            <StatItem value="99.9%" label="Uptime Guarantee" />
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Our Services</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Everything you need to run a modern hospital.</h3>
            <p className="text-lg text-gray-500">Streamline every aspect of your medical facility with our comprehensive suite of digital tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Users} 
              title="Patient Management" 
              desc="Comprehensive digital health records, admission tracking, and patient portals." 
              color="blue"
            />
            <ServiceCard 
              icon={Stethoscope} 
              title="Doctor Workflows" 
              desc="Optimized scheduling, clinical notes, and real-time collaboration tools." 
              color="purple"
            />
            <ServiceCard 
              icon={Bed} 
              title="Ward & Bed Tracking" 
              desc="Real-time occupancy monitoring and automated bed allocation systems." 
              color="orange"
            />
            <ServiceCard 
              icon={Pill} 
              title="Pharmacy Inventory" 
              desc="Automated stock management, prescription dispensing, and drug interaction alerts." 
              color="green"
            />
            <ServiceCard 
              icon={Activity} 
              title="Real-time Analytics" 
              desc="Advanced reporting, inpatient trend analysis, and predictive modeling." 
              color="red"
            />
            <ServiceCard 
              icon={ShieldCheck} 
              title="Security & Compliance" 
              desc="HIPAA-compliant data encryption and role-based access control." 
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* 4. Specialties Section */}
      <section id="specialties" className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Specialties</h2>
              <h3 className="text-4xl lg:text-5xl font-bold mb-6">Tailored solutions for every department.</h3>
            </div>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
              View All Departments
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpecialtyItem title="Cardiology" icon="â¤ï¸" count="12 Doctors" />
            <SpecialtyItem title="Neurology" icon="ðŸ§ " count="8 Doctors" />
            <SpecialtyItem title="Orthopedics" icon="ðŸ¦´" count="15 Doctors" />
            <SpecialtyItem title="Pediatrics" icon="ðŸ‘¶" count="20 Doctors" />
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://picsum.photos/seed/features-hospital/1000/1200" 
              className="rounded-[3rem] shadow-2xl"
              alt="Features"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Why MedFlow</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Designed for efficiency, built for care.</h3>
            
            <div className="space-y-8">
              <FeatureItem 
                title="Unified Data Ecosystem" 
                desc="No more siloed data. Every department works on a single source of truth for every patient."
              />
              <FeatureItem 
                title="Intelligent Resource Allocation" 
                desc="Our AI-driven engine suggests bed allocations and staff rotations based on real-time demand."
              />
              <FeatureItem 
                title="Mobile-First Experience" 
                desc="Access critical patient data and manage tasks from any device, anywhere in the hospital."
              />
            </div>

            <div className="mt-12 p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 rounded-xl text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">99.9% Accuracy</h4>
              </div>
              <p className="text-gray-600">Our system reduces administrative errors by up to 40%, allowing your staff to focus on what matters most: saving lives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Testimonials</h2>
            <h3 className="text-4xl font-bold text-gray-900">What medical leaders say.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Dr. Sarah Chen" 
              role="Chief of Surgery, City General" 
              content="MedFlow transformed our surgical scheduling. We've seen a 25% increase in OR efficiency since implementation."
              image="https://picsum.photos/seed/sarah/100/100"
            />
            <TestimonialCard 
              name="Mark Thompson" 
              role="Hospital Administrator" 
              content="The analytics dashboard is a game-changer. I can now predict admission surges and allocate staff weeks in advance."
              image="https://picsum.photos/seed/mark/100/100"
            />
            <TestimonialCard 
              name="Dr. James Wilson" 
              role="Head of Pediatrics" 
              content="The patient portal has significantly improved our communication with parents. It's intuitive and secure."
              image="https://picsum.photos/seed/james/100/100"
            />
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">FAQ</h2>
            <h3 className="text-4xl font-bold text-gray-900">Common Questions</h3>
          </div>

          <div className="space-y-4">
            <FaqItem 
              question="Is MedFlow HIPAA compliant?" 
              answer="Yes, MedFlow is fully HIPAA compliant. We use enterprise-grade AES-256 encryption for all data at rest and in transit."
            />
            <FaqItem 
              question="How long does implementation take?" 
              answer="A typical implementation for a mid-sized hospital takes 4-6 weeks, including data migration and staff training."
            />
            <FaqItem 
              question="Can we integrate with existing lab systems?" 
              answer="Absolutely. MedFlow features a robust API and HL7/FHIR support for seamless integration with most laboratory and imaging systems."
            />
            <FaqItem 
              question="What kind of support do you offer?" 
              answer="We provide 24/7 technical support with a dedicated account manager for enterprise clients."
            />
          </div>
        </div>
      </section>

      {/* 8. Contact & Footer */}
      <footer className="bg-gray-900 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Hospital className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight">MedFlow</span>
              </div>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Empowering healthcare providers with intelligent technology to deliver superior patient outcomes.
              </p>
              <div className="flex gap-4">
                <SocialLink icon={Facebook} />
                <SocialLink icon={Twitter} />
                <SocialLink icon={Instagram} />
                <SocialLink icon={Linkedin} />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8">Contact Us</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  contact@medflow.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  +1 (555) 000-1234
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  123 Medical Plaza, Suite 400<br />New York, NY 10001
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
            <p>© 2026 MedFlow Systems Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${colors[color]}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-4">{title}</h4>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function SpecialtyItem({ title, icon, count }: { title: string, icon: string, count: string }) {
  return (
    <div className="p-8 bg-gray-800 rounded-3xl border border-gray-700 hover:border-blue-500 transition-all group cursor-pointer">
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{count}</p>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ name, role, content, image }: { name: string, role: string, content: string, image: string }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
        ))}
      </div>
      <p className="text-gray-600 italic mb-8 leading-relaxed">"{content}"</p>
      <div className="flex items-center gap-4">
        <img src={image} className="w-12 h-12 rounded-full object-cover" alt={name} referrerPolicy="no-referrer" />
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-bold text-gray-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-500 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialLink({ icon: Icon }: any) {
  return (
    <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
      <Icon className="w-5 h-5" />
    </a>
  );
}
