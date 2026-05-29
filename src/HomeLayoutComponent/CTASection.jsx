import React from 'react';
import { motion } from "framer-motion";
import { Heart, Activity, ArrowRight, Shield, HeartHandshake } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-red-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden flex items-center justify-center">
      
      {/* 1. BRANDED BLENDED BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Soft Blood Plasma Blend Blobs - Matching your specific overlay style */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] bg-red-200/40 dark:bg-red-950/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
        <div className="absolute -bottom-16 -right-16 w-[400px] h-[400px] bg-rose-100/50 dark:bg-rose-950/10 rounded-full blur-[80px]" />
        
        {/* Fine background micro-grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl w-full mx-auto px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: THE TYPOGRAPHY & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8 max-w-3xl mx-auto lg:mx-0">
            
            {/* Solid Crimson Pill Badge - Direct match to your "Save Lives Today" pill */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-red-600 text-white shadow-md shadow-red-600/10 text-xs font-semibold tracking-wide mx-auto lg:mx-0"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Urgent Network Demand Active
            </motion.div>

            {/* Immersive Bold Typography */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              Every Drop Generates <br />
              <span className="text-red-600 dark:text-red-500 relative inline-block mt-1">
                A Second Chance.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Your donation does not just enter an inventory; it activates an immediate, highly tracked network conduit built to secure human survival when seconds matter.
            </p>

            {/* Micro Live Network Stats Field */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800/80 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">10K+</p>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Active Conduits</p>
              </div>
              <div className="border-l border-slate-200 dark:border-slate-800/80 pl-4">
                <p className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-500">24/7</p>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Live Streams</p>
              </div>
              <div className="border-l border-slate-200 dark:border-slate-800/80 pl-4">
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100%</p>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Verified Safe</p>
              </div>
            </div>

            {/* Dual Matching Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-full shadow-lg shadow-red-600/20 transition-all duration-300 flex items-center justify-center gap-2 tracking-wide text-base"
              >
                Donate Blood Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ bg: "rgba(220,38,38,0.04)", y: -2 }}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold rounded-full border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 text-base"
              >
                Find Blood Request
              </motion.button>
            </div>

          </div>

          {/* RIGHT COLUMN: THE VISUAL FLOATING PLASMA CENTERPIECE */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] sm:min-h-[450px]">
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-72 h-72 sm:w-85 sm:h-85 flex items-center justify-center"
            >
              {/* Outer Pulsing Aura Tracks */}
              <div className="absolute inset-0 border-2 border-dashed border-red-600/20 dark:border-red-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute -inset-4 border border-slate-200 dark:border-slate-800/80 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              
              {/* Organic Fluid Bio-Mesh - Bright crimson liquid morph */}
              <motion.div 
                animate={{ 
                  borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 bg-gradient-to-tr from-red-600/10 via-red-500/5 to-transparent filter blur-sm border border-red-500/20 shadow-[inset_0_0_30px_rgba(220,38,38,0.1)]"
              />

              {/* The Core Clinical Glassmorphism Box */}
              <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-white dark:border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl flex flex-col items-center justify-center gap-3 group z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl duration-500" />
                
                {/* Clean Crimson Container Icon */}
                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-inner relative">
                  <Heart className="w-10 h-10 text-red-600 dark:text-red-400 fill-current animate-[pulse_2.5s_ease-in-out_infinite]" />
                </div>
                
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-1">BloodCare Core</span>
                
                {/* Crimson EKG Vector Wave */}
                <svg className="w-24 h-6 text-red-600/30 dark:text-red-400/30" viewBox="0 0 100 30" fill="none">
                  <path d="M0,15 L30,15 L38,2 L46,28 L52,11 L58,18 L64,15 L100,15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* SATELLITE INTERFACE NODES (Parallax Floating Overlays) */}
              {/* Node 1: Active Streams */}
              <motion.div 
                animate={{ y: [0, 10, 0], x: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 sm:-left-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg flex items-center gap-3 backdrop-blur-md z-20"
              >
                <div className="p-2 bg-red-50 dark:bg-red-950/40 rounded-lg text-red-600 dark:text-red-400"><Activity className="w-4 h-4" /></div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Transfer</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white">Active Stream</p>
                </div>
              </motion.div>

              {/* Node 2: Safety Shield */}
              <motion.div 
                animate={{ y: [0, -12, 0], x: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-2 -right-6 sm:-right-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg flex items-center gap-3 backdrop-blur-md z-20"
              >
                <div className="p-2 bg-red-50 dark:bg-red-950/40 rounded-lg text-red-600 dark:text-red-400"><Shield className="w-4 h-4" /></div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Security</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white">100% Verified</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;