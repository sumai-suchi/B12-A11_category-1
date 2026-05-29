import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Heart, Shield, Activity, Sparkles } from "lucide-react";

/* ---------------- PREMIUM SCROLL FRAMEWORKS ---------------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 45,
      damping: 14,
      duration: 0.85
    },
  },
};

const steps = [
  {
    badge: "Step 01",
    title: "Secure Registry",
    desc: "Simplified onboarding digital profile cards encased in absolute clinical security protocols.",
    gradientClass: "from-amber-500/20 via-orange-500/5 to-transparent hover:border-amber-500/30",
    iconColor: "text-amber-500 dark:text-amber-400",
    glowColor: "bg-amber-500/10",
    graphics: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Swirling celestial gold vortex overlay */}
        <div className="absolute inset-0 rounded-full bg-amber-500/5 border border-amber-500/10 animate-[spin_30s_linear_infinite]" />
        <motion.div 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-dashed border-amber-500/20 rounded-full"
        />
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/20 to-transparent blur-md opacity-60 animate-pulse" />
        <div className="relative z-10 p-4.5 bg-slate-900/90 dark:bg-slate-950 border border-amber-500/30 rounded-2xl shadow-[0_8px_32px_rgba(245,158,11,0.15)] text-amber-500">
          <UserPlus className="w-9 h-9 stroke-[1.5]" />
        </div>
        {/* Micro ID floating indicators */}
        <div className="absolute -right-2 top-4 p-1 bg-slate-950 border border-slate-800 rounded-md text-[8px] font-mono text-slate-500 shadow-md">ID_REQ</div>
      </div>
    )
  },
  {
    badge: "Step 02",
    title: "Trusted Matching",
    desc: "Instantly scan to calibrate live certificates, security layers, and verified medical streams.",
    gradientClass: "from-cyan-500/20 via-emerald-500/5 to-transparent hover:border-cyan-500/30",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    glowColor: "bg-cyan-500/10",
    graphics: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Tech crystalline shield geometries */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 transform rotate-45 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 transform -rotate-12 animate-[spin_20s_linear_infinite]" />
        <div className="relative z-10 p-4.5 bg-slate-900/90 dark:bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-[0_8px_32px_rgba(6,182,212,0.15)] text-cyan-400">
          <Search className="w-9 h-9 stroke-[1.5]" />
        </div>
        {/* Floating validation nodes */}
        <div className="absolute left-0 bottom-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-ping" />
        <div className="absolute right-2 bottom-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
      </div>
    )
  },
  {
    badge: "Step 03",
    title: "Safeguard Lives",
    desc: "Bridge direct conduits immediately to fast-track urgent requirements when seconds count.",
    gradientClass: "from-red-500/20 via-rose-500/5 to-transparent hover:border-red-500/30",
    iconColor: "text-red-500 dark:text-red-400",
    glowColor: "bg-red-500/10",
    graphics: (
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Organic branching pulse network */}
        <div className="absolute inset-0 border border-dashed border-red-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
        
        {/* Artery Vector Mapping Overlay */}
        <svg className="absolute inset-0 w-full h-full text-red-500/30" viewBox="0 0 100 100">
          <path d="M20,50 Q35,35 50,50 T80,50 M30,25 Q50,50 70,75" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="50" r="2" fill="currentColor" className="animate-ping" />
        </svg>

        <div className="relative z-10 p-4.5 bg-slate-900/90 dark:bg-slate-950 border border-red-500/30 rounded-2xl shadow-[0_8px_32px_rgba(239,68,68,0.15)] text-red-500">
          <Heart className="w-9 h-9 fill-current stroke-[1.5] animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
        {/* Floating network metadata counters */}
        <div className="absolute -right-3 bottom-6 px-1.5 py-0.5 bg-red-950/80 border border-red-500/30 rounded text-[7px] font-mono font-bold text-red-400">+3 CC</div>
      </div>
    )
  }
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gradient-to-b from-white via-red-50/15 to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden w-full flex items-center justify-center">
      
      {/* 1. CINEMATIC AMBIENT CANVAS LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Soft flowing brand color-blobs */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-200/20 dark:bg-red-950/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-rose-100/30 dark:bg-rose-900/5 rounded-full blur-[140px]" />
        
        {/* Fine architectural technical line grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10 w-full">
        
        {/* COMPONENT HEADER ARCHITECTURE */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-2 px-4.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/10 mb-6 tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3" />
            Seamless Optimization Flow
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            How It Safely <span className="text-red-600 dark:text-red-500 drop-shadow-[0_2px_15px_rgba(239,68,68,0.15)]">Connects</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Explore our structural communication architecture that accurately links community donors into medical supply vectors.
          </p>
        </div>

        {/* STEP MATRIX MESH LAYOUT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-8 relative items-stretch w-full"
        >
          
          {/* THE RIBBON PIPELINE LOOP (Desktop Dynamic Rendering Track) */}
          <div className="hidden md:block absolute top-[26%] inset-x-16 h-[2px] bg-gradient-to-r from-amber-500/20 via-cyan-500/30 to-red-500/20 z-0">
            <motion.div 
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-40 h-full bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444]"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              whileHover={{ y: -12, scale: 1.01 }}
              className="relative flex flex-col justify-between group h-full cursor-pointer"
            >
              
              {/* LIQUID PREMIUM CONTAINER CARD */}
              <div className={`h-full bg-gradient-to-b ${step.gradientClass} bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col items-center text-center relative z-10 shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-xl overflow-hidden`}>
                
                {/* Embedded Glowing Mesh Background Elements */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 ${step.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* STEP BADGE COUNTER */}
                <span className="absolute top-4 right-4 text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 z-20 shadow-sm">
                  {step.badge}
                </span>

                {/* MAIN CARD GEOMETRIC COMPONENT */}
                <div className="mb-6 transform transition-transform duration-500 group-hover:scale-105 relative z-10">
                  {step.graphics}
                </div>

                {/* TYPOGRAPHY BLOCKS */}
                <div className="relative z-10 flex-grow flex flex-col justify-between w-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-normal px-1">
                      {step.desc}
                    </p>
                  </div>

                  {/* MINI INTERNAL LINK PATHWAY ACCENT */}
                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-center gap-1.5 w-full text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                    <span>Learn process workflows</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* DATA METRICS SUB-FOOTER REASSURANCE */}
        <div className="mt-16 flex flex-wrap gap-y-3 gap-x-6 items-center justify-center text-xs text-slate-400 dark:text-slate-500 font-medium relative z-10 bg-white/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl py-3 px-6 max-w-2xl mx-auto backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Activity className="w-4 h-4" />
            <span className="font-bold">Encrypted Live Tracking Active</span>
          </div>
          <span className="hidden sm:inline text-slate-200 dark:text-slate-800">|</span>
          <p className="text-center sm:text-left">
            Average local configuration network bridge execution: <strong className="text-slate-800 dark:text-slate-300 font-bold">14 mins</strong>
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;