import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Activity, 
  Search, 
  MessageCircle, 
  Award,
  ArrowRight
} from 'lucide-react';

// Common Animation Settings
const fadeInDuration = 0.6;
const easeMethod = [0.22, 1, 0.36, 1]; // Smooth Cubic Bezier

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: fadeInDuration, ease: easeMethod } }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const ScaleCard = ({ children, className }) => (
  <motion.div
    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    className={`bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const AboutPage = () => {
  // Parallax Scroll for Hero Text
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-red-100 overflow-x-hidden">
      
      {/* SECTION 1: PROFESSIONAL PARALLAX HERO */}
      <section className="relative pt-24 pb-40 px-6 overflow-hidden">
        {/* Soft Background Blurs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50 -z-10" />
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-100/60 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerVariants}>
            <motion.div variants={fadeInVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-100 rounded-full text-red-700 text-sm font-bold mb-6">
              <Activity size={16} className="text-red-600" />
              <span>THE NEW ERA OF DONATION</span>
            </motion.div>
            
            <motion.h1 
              style={{ y: heroY, opacity: heroOpacity }}
              variants={fadeInVariants} 
              className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter mb-8 leading-[0.95]"
            >
              Every second <br /> 
              is a <span className="text-red-700">Lifeline.</span>
            </motion.h1>
            
            <motion.p variants={fadeInVariants} className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              We've created a digital ecosystem that bridges the critical gap between blood donors and recipients. Our focus is speed, verification, and human connection.
            </motion.p>
            
            <motion.div variants={fadeInVariants} className="flex flex-wrap gap-5">
              <button className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2 group shadow-xl shadow-red-200/50">
                Register to Save Lives <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Interactive Stat Card Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 rounded-[3rem] shadow-[0_32px_80px_-16px_rgba(185,28,28,0.1)] border border-slate-100 relative group overflow-hidden"
          >
             <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Network Impact</p>
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                   <div className="w-2 h-2 bg-red-200 rounded-full" />
                </div>
             </div>
             
             <div className="space-y-6">
               {[
                 { label: 'Lives Saved Globally', val: '1.2 Million+', icon: <Heart /> },
                 { label: 'Active Verified Donors', val: '850,000+', icon: <Award /> },
                 { label: 'Avg. Response Time', val: 'Under 2 Minutes', icon: <Zap /> }
               ].map((item, i) => (
                 <div key={i} className="flex gap-5 items-center p-5 bg-slate-50/50 hover:bg-slate-50 rounded-2xl transition-colors">
                    <div className="w-14 h-14 bg-red-100 text-red-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-950">{item.val}</h4>
                      <p className="text-slate-500 font-medium">{item.label}</p>
                    </div>
                 </div>
               ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PROCESS BENTO GRID (Highly Informative) */}
      <section className="py-24 bg-slate-50/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight">Trust in Every Step</h2>
            <div className="h-1.5 w-16 bg-red-600 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-6">
            
            {/* The Main Bento Block */}
            <motion.div whileHover={{ scale: 0.99 }} className="lg:col-span-2 lg:row-span-2 bg-red-800 p-12 rounded-[2.5rem] flex flex-col justify-between text-white shadow-2xl shadow-red-200/50 relative overflow-hidden group">
               <div className="relative z-10">
                 <ShieldCheck size={56} className="mb-8" />
                 <h3 className="text-4xl font-extrabold mb-6 leading-tight">Verified, HIPAA Compliant Data</h3>
                 <p className="text-red-100 text-lg leading-relaxed">Security is never compromised. Our rigorous multi-step donor verification process ensures legitimacy and medical integrity.</p>
               </div>
               <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-red-700/50 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
            </motion.div>
            
            {/* Bento Block 1: Search */}
            <ScaleCard className="lg:col-span-2 flex gap-8 items-center">
              <Search className="text-red-700 flex-shrink-0" size={48} />
              <div>
                <h4 className="text-2xl font-bold mb-1">Precision Matchmaking</h4>
                <p className="text-slate-600">Instantly locate compatible blood groups across our verified regional database.</p>
              </div>
            </ScaleCard>
            
            {/* Bento Block 2: Global */}
            <ScaleCard>
              <Globe className="text-red-700 mb-6" size={32} />
              <h4 className="text-2xl font-bold mb-1">Global Database</h4>
              <p className="text-slate-600 text-sm">Spanning multiple cities for unified emergency access.</p>
            </ScaleCard>
            
            {/* Bento Block 3: Chat */}
            <ScaleCard>
              <MessageCircle className="text-red-700 mb-6" size={32} />
              <h4 className="text-2xl font-bold mb-1">Real-time Coordination</h4>
              <p className="text-slate-600 text-sm">Instant, direct communication with connected donors.</p>
            </ScaleCard>
            
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE PHILOSOPHY */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-950">Built on Human Connection.</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
               <p>Savior isn't just technology; it's a social compact. We believe everyone deserves access to life-saving blood without delays or bureaucratic hurdles.</p>
               <p>Our philosophy focuses on simplifying complex matching algorithms into a seamless, user-friendly interface that anyone can use during an emergency.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-0.5 bg-red-300 mt-3" />
              <p className="text-sm font-bold uppercase tracking-widest text-red-900">Empathy-First Tech</p>
            </div>
          </div>
          <div className="relative aspect-square bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 group">
             <img src="/api/placeholder/600/600" alt="Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 to-transparent p-10 flex flex-col justify-end">
                <Award className="text-red-300 mb-2" />
                <h4 className="text-3xl font-black text-white leading-tight">Healthcare Innovation Award Winner</h4>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-24 px-6 border-t border-slate-100 bg-white">
        <motion.div 
          whileHover={{ y: -5 }}
          className="max-w-5xl mx-auto bg-slate-950 rounded-[3rem] p-12 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6">Change a Life Today.</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">Be the savior someone is desperately searching for. Join our network as a donor or coordinate a vital match.</p>
            <button className="bg-red-700 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl transition-all">
              Become a Verified Donor
            </button>
          </div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-900/30 blur-[100px] rounded-full" />
        </motion.div>
      </footer>
    </div>
  );
};

export default AboutPage;