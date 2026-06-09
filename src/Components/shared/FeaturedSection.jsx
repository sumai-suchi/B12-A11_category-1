import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, HeartHandshake } from 'lucide-react';

const FeaturedSection = () => {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-red-600 dark:text-red-400 stroke-[2]" />,
      title: "Life-Saving Impact",
      description: "Every single blood donation can save up to three lives. Your selflessness creates an immediate ripple of hope for families in critical care.",
      badge: "Critical Impact",
      accentBg: "bg-red-50 dark:bg-red-950/40",
      glowColor: "group-hover:shadow-red-600/10",
      hoverBorder: "hover:border-red-500/40",
      innerGraphic: (
        <div className="absolute inset-x-0 bottom-16 h-12 pointer-events-none flex items-center justify-center overflow-hidden opacity-30 group-hover:opacity-70 transition-opacity duration-500">
          <svg className="w-full h-full text-red-600" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
            <path d="M0,50 L90,50 L100,20 L115,80 L125,40 L135,55 L145,50 L300,50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-red-600 dark:text-red-400 stroke-[2]" />,
      title: "Verified & Trusted",
      description: "All users, blood networks, and hospital requests strictly undergo thorough verification protocols to ensure 100% safety and transparency.",
      badge: "100% Secure",
      accentBg: "bg-red-50 dark:bg-red-950/40",
      glowColor: "group-hover:shadow-red-600/10",
      hoverBorder: "hover:border-red-500/40",
      innerGraphic: (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transition-all duration-500">
          <ShieldCheck className="w-32 h-32 text-red-900 dark:text-white" />
        </div>
      )
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-red-600 dark:text-red-400 stroke-[2]" />,
      title: "Easy & Compassionate",
      description: "Find local blood banks, request urgent matching types, or track live networks instantly through an engineered, deeply accessible design.",
      badge: "User Friendly",
      accentBg: "bg-red-50 dark:bg-red-950/40",
      glowColor: "group-hover:shadow-red-600/10",
      hoverBorder: "hover:border-red-500/40",
      innerGraphic: (
        <div className="absolute right-6 bottom-16 left-1/2 pointer-events-none opacity-20 group-hover:opacity-50 transition-all duration-500 flex justify-between items-center">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <div className="w-16 h-[2px] bg-gradient-to-r from-red-200 to-red-600" />
        </div>
      )
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-red-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-950/50 dark:to-slate-900 overflow-hidden">
      
      {/* BRANDING BACKGROUND ELEMENTS (Matching your image overlays) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Blood Plasma Blend Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-200/30 rounded-full mix-blend-multiply filter blur-3xl dark:bg-red-950/10" />
        <div className="absolute bottom-12 -right-20 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl dark:bg-red-900/10" />
        
        {/* Very subtle grid system to align with premium landing layouts */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          {/* Crimson Pill Badge - Perfectly matching the "Save Lives Today" pill */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-semibold bg-red-600 text-white shadow-md shadow-red-600/10 mb-6 tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Why Choose BloodCare?
          </motion.div>
          
          {/* Main Typography Treatment */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            Making Blood Donation <br />
            <span className="relative inline-block mt-2 text-red-600 dark:text-red-500">
              Fast, Safe & Transparent
            </span>
          </h2>
          
          <p className="mt-6 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            A single donation can save up to <span className="font-semibold text-slate-900 dark:text-white">three lives</span>. 
            We bridge your empathy into immediate network pipelines where every second is vital.
          </p>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 ${feature.hoverBorder} rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl ${feature.glowColor} transition-all duration-300`}
            >
              <div>
                {/* Header elements inside card */}
                <div className="flex justify-between items-start w-full relative z-10">
                  {/* Clean Crimson Container Icon */}
                  <div className={`p-3 ${feature.accentBg} rounded-xl border border-red-100 dark:border-red-950/60 transition-transform duration-300 group-hover:scale-105`}>
                    {feature.icon}
                  </div>
                  
                  {/* Fine micro-badge line */}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-0.5 bg-slate-50 dark:bg-slate-950">
                    {feature.badge}
                  </span>
                </div>

                {/* Inline Subtle Vector Graphic */}
                {feature.innerGraphic}

                {/* Content Details */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Action Link Footer - Inherits button styling look */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  Learn more
                </span>
                <span className="text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transform translate-x-0 group-hover:translate-x-1.5 transition-all duration-200 text-sm font-bold">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;