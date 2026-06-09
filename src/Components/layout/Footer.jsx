import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, ShieldCheck, Heart, ArrowRight, Zap } from 'lucide-react';

/* ---------------- PREMIUM SCROLL VARIANT ---------------- */
const footerFadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 16,
      duration: 0.8,
    },
  },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20px" }}
      variants={footerFadeIn}
      className="relative bg-slate-50/60 text-slate-600 border-t border-slate-100/80 pt-28 pb-12 overflow-hidden w-full"
    >
      {/* 1. BALANCED BACKGROUND CANVAS ANCHORS */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Soft, organic warm illumination blooms with optimized opacity */}
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-red-200/30 to-rose-100/10 rounded-full blur-[140px]" />
        <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] bg-rose-100/20 rounded-full blur-[120px]" />
        {/* Subtle radial alignment lattice matrix */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10 w-full">
        
        {/* EYE-SOOTHING GRID ARCHITECTURE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-12 pb-20 w-full">
          
          {/* COLUMN 1: PLATFORM IDENTITY & OBJECTIVE LOG */}
          <div className="md:col-span-4 space-y-6 md:pr-4">
            <div className="flex items-center gap-3 group cursor-pointer w-max">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-red-500/10 group-hover:scale-[1.02] transition-transform duration-300">
                <Heart className="w-5 h-5 fill-current animate-pulse stroke-[1.5]" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Medi<span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">Link</span>
              </h2>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Connecting critical donor fields, healthcare institutions, and live transfusion pipelines within secure data validation loops.
            </p>

            {/* Clean Anti-Cramped Protocol Pill */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full text-[11px] font-semibold text-red-600 bg-red-50/60 border border-red-100/40 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Network Node</span>
            </div>
          </div>

          {/* COLUMN 2: APPS & CORE ROUTING DIRECTORY */}
          <div className="md:col-span-2 md:ml-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Home Base", path: "/" },
                { label: "Donation Requests", path: "/donation-requests" },
                { label: "Search Donors", path: "/search-donors" },
                { label: "Funding Stream", path: "/funding" }
              ].map((link, idx) => (
                <li key={idx}>
                  <NavLink 
                    to={link.path} 
                    className="group flex items-center text-slate-500 hover:text-red-600 transition-colors duration-200"
                  >
                    <span className="relative py-0.5">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SAFETY & LEGAL DOCUMENTATION */}
          <div className="md:col-span-3 md:ml-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
              Support Center
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Contact Channel", path: "/contact" },
                { label: "About Our Mission", path: "/about" },
                { label: "FAQ Matrices", path: "/faq" },
                { label: "Privacy Policy", path: "/privacy" }
              ].map((link, idx) => (
                <li key={idx}>
                  <NavLink 
                    to={link.path} 
                    className="group flex items-center text-slate-500 hover:text-red-600 transition-colors duration-200"
                  >
                    <span className="relative py-0.5">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: COMMUNICATION ROUTERS & COMMUNICATIONS */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
              Connect With Us
            </h3>
            
            <div className="space-y-4 text-sm font-medium">
              <a href="tel:+8801700000000" className="flex items-center gap-3.5 text-slate-600 hover:text-red-600 transition-all duration-200 group">
                <div className="w-9 h-9 bg-white border border-slate-200/60 text-slate-500 rounded-xl flex items-center justify-center group-hover:text-red-600 group-hover:border-red-200 group-hover:bg-red-50/30 shadow-xs transition-all duration-300">
                  <Phone className="w-4 h-4 stroke-[1.75]" />
                </div>
                <span className="font-bold tracking-tight text-slate-800 group-hover:text-red-600 transition-colors">+880 17XX-XXXXXX</span>
              </a>
              
              <a href="mailto:support@bloodcare.com" className="flex items-center gap-3.5 text-slate-600 hover:text-red-600 transition-all duration-200 group">
                <div className="w-9 h-9 bg-white border border-slate-200/60 text-slate-500 rounded-xl flex items-center justify-center group-hover:text-red-600 group-hover:border-red-200 group-hover:bg-red-50/30 shadow-xs transition-all duration-300">
                  <Mail className="w-4 h-4 stroke-[1.75]" />
                </div>
                <span className="text-slate-700 font-semibold group-hover:text-red-600 transition-colors">support@medilink.com</span>
              </a>
            </div>

            {/* HIGH FIDELITY CLEAN SOCIAL CONNECTIONS */}
            <div className="pt-2 flex items-center gap-3">
              {[Facebook, Twitter, Instagram].map((SocialIcon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  href={`#social-${idx}`}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 text-slate-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer"
                >
                  <SocialIcon className="w-4 h-4 stroke-[1.75]" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* METADATA PLATFORM FOOTER SYSTEM BAR */}
        <div className="pt-10 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-slate-400 w-full">
          <div className="tracking-tight text-center md:text-left">
            © {currentYear} MediLink Systems. Protected under global digital validation loops.
          </div>
          <div className="flex items-center gap-2 text-red-700 bg-red-50/60 border border-red-100/50 rounded-full px-5 py-2.5 backdrop-blur-xs shadow-xs text-center">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            <span className="font-bold tracking-tight">Saving lives through unified decentralized architecture 🩸</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;