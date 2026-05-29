import React from 'react';
import { motion } from "framer-motion";
import { Droplet, HelpCircle } from "lucide-react";

/* ---------------- ANIMATIONS ---------------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const BloodGroups = () => {
  const bloodTypes = [
    { type: "A+", label: "Receive: A+, A-, O+, O-", universal: false },
    { type: "A-", label: "Receive: A-, O-", universal: false },
    { type: "B+", label: "Receive: B+, B-, O+, O-", universal: false },
    { type: "B-", label: "Receive: B-, O-", universal: false },
    { type: "O+", label: "Receive: O+, O-", universal: false },
    { type: "O-", label: "Universal Donor", universal: true, badge: "Donor" },
    { type: "AB+", label: "Universal Recipient", universal: true, badge: "Recipient" },
    { type: "AB-", label: "Receive: AB-, A-, B-, O-", universal: false },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-red-50/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 pointer-events-none opacity-20 mix-blend-multiply dark:mix-blend-overlay z-0">
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-red-300 rounded-full blur-3xl dark:bg-red-950/30" />
        <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-rose-200 rounded-full blur-3xl dark:bg-rose-900/20" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 mb-4">
            <Droplet className="w-3.5 h-3.5 fill-current animate-pulse" />
            Live Inventory Compatibility
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Available <span className="text-red-600 dark:text-red-500">Blood Groups</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base font-normal">
            Select a blood group to view immediate availability or explore compatibility streams across our real-time clinic networks.
          </p>
        </div>

        {/* Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
        >
          {bloodTypes.map((item) => (
            <motion.div
              key={item.type}
              variants={cardVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative bg-white dark:bg-slate-900 border ${
                item.universal 
                  ? 'border-red-300 dark:border-red-800/60 shadow-sm shadow-red-500/5' 
                  : 'border-slate-200/80 dark:border-slate-800'
              } rounded-2xl p-5 md:p-6 flex flex-col justify-between items-center text-center cursor-pointer transition-colors duration-300 hover:border-red-500 dark:hover:border-red-500`}
            >
              {/* Universal Badges */}
              {item.badge && (
                <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                  {item.badge}
                </span>
              )}

              {/* Blood Drop & Text Wrapper */}
              <div className="relative mt-2 flex items-center justify-center">
                {/* Glowing Background Glow behind the blood type */}
                <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {item.type}
                </h3>
              </div>

              {/* Subtitle Info / Compatibility Line */}
              <div className="mt-6 w-full">
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase">
                  Compatibility
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300 truncate px-1">
                  {item.label}
                </p>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="mt-4 w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-red-500 to-rose-600 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Micro-Footer Info */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-normal">
          <HelpCircle className="w-4 h-4 text-slate-300 dark:text-slate-700" />
          <span>Not sure about your blood type? Contact your local center via MediLink.</span>
        </div>
      </div>
    </section>
  );
};

export default BloodGroups;