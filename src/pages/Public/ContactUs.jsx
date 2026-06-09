import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, PhoneCall, Send, Sparkles, ShieldCheck, Heart } from "lucide-react";

/* ---------------- PREMIUM SCROLL ANIMATIONS ---------------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 55,
      damping: 14,
      duration: 0.8,
    },
  },
};

const ContactUs = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gradient-to-b from-white via-slate-50 to-red-50/10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden w-full flex items-center justify-center">
      
      {/* 1. CINEMATIC AMBIENT CANVAS LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-red-200/20 to-rose-200/0 dark:from-red-950/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-200/15 dark:bg-red-900/5 rounded-full blur-[120px]" />
        
        {/* Architectural Technical Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10 w-full">
        
        {/* COMPONENT HEADER ARCHITECTURE */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-2 px-4.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/10 mb-6 tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3" />
            24/7 Global Response Conduit
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Get In <span className="text-red-600 dark:text-red-500 drop-shadow-[0_2px_15px_rgba(239,68,68,0.12)]">Touch</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Have questions or operational bottlenecks? Reach out immediately. Our secure channel helps fast-track vital cross-network solutions.
          </p>
        </div>

        {/* WORKFLOW SPLIT VIEW MESH */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch w-full"
        >
          
          {/* LEFT INTERACTIVE INPUT CONDUIT CARD */}
          <motion.div 
            variants={fadeUpVariant}
            className="md:col-span-7 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
              Send Us a Message
            </h3>

            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Message</label>
                <textarea
                  rows="4"
                  placeholder="Elaborate details regarding your request here..."
                  className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 transition-all duration-300 resize-none"
                />
              </div>

              {/* HIGH LEVEL IMPACT INTERACTIVE SUBMIT BUTTON */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full py-3.5 px-6 font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-500/30 flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
              >
                <span>Dispatch Encryption Logs</span>
                <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT METADATA COMMUNICATION CHANNELS CARD */}
          <motion.div 
            variants={fadeUpVariant}
            className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-900/50 dark:to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden text-white shadow-xl"
          >
            {/* Soft dark mode crimson backing spot */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-8">
                Emergency Telemetry
              </h3>

              {/* STREAMLINED DATA DIRECTORY PLATFORMS */}
              <div className="space-y-6">
                {[
                  { icon: PhoneCall, label: "Live Urgent Hotline", value: "+880 17XX-XXXXXX", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                  { icon: Mail, label: "Secure Digital Conduit", value: "support@bloodcare.com", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                  { icon: MapPin, label: "HQ Command Vector", value: "Dhaka, Bangladesh", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className={`p-3 rounded-xl border ${item.color} transition-transform duration-300 group-hover/item:scale-105 shrink-0`}>
                      <item.icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">{item.label}</span>
                      <span className="text-sm sm:text-base font-semibold text-slate-200 tracking-tight mt-0.5 block">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC PRIORITY MEDICAL BANNER CRADLE */}
            <div className="mt-12 bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-500/20 rounded-2xl p-4.5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
              
              <div className="flex gap-3.5 items-start">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg shrink-0 mt-0.5 animate-pulse">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-red-400">Critical Priority Protocols</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1 font-normal">
                    Filing real-time requests via telephone bypasses the operational queue loop. Use directly for critical hospital updates.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* SECURITY REASSURANCE SUB FOOTER */}
        <div className="mt-16 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium relative z-10 bg-white/70 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 rounded-full py-2.5 px-6 max-w-md mx-auto backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>All operational text routing utilizes SSL end-to-end security loops.</span>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;