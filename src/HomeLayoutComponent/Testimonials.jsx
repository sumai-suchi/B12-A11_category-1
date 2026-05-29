import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart, ShieldCheck, Sparkles } from "lucide-react";

/* ---------------- PREMIUM SCROLL VARIANTS ---------------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      duration: 0.8,
    },
  },
};

const stories = [
  {
    name: "Sarah Jenkins",
    role: "Emergency Recipient",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    story: "Within 15 minutes of requesting rare O-negative units during my emergency surgery, three local donors responded. This platform saved my life.",
    rating: 5,
    tagClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    name: "Marcus Vance",
    role: "Regular Blood Donor",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    story: "The smart notification algorithm makes matching painless. I get an alert when local hospitals run low on my blood group, walk in, and give.",
    rating: 5,
    tagClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    name: "Dr. Elena Rostova",
    role: "Clinic Administrator",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
    story: "Our urgent donor onboarding bottlenecks dropped completely after integration. Verification loops operate reliably under tight timelines.",
    rating: 5,
    tagClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gradient-to-b from-white via-slate-50 to-red-50/10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden w-full flex items-center justify-center">
      
      {/* BACKGROUND FLOATING ILLUMINATION */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-200/20 dark:bg-red-950/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-rose-100/30 dark:bg-rose-950/5 rounded-full blur-[120px]" />
        
        {/* Alignment Technical Fine Line Lattice */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10 w-full">
        
        {/* COMPONENT HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-2 px-4.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/10 mb-6 tracking-wider uppercase"
          >
            <Sparkles className="w-3 h-3" />
            Verified Impact Profiles
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Real Life <span className="text-red-600 dark:text-red-500 drop-shadow-[0_2px_15px_rgba(239,68,68,0.12)]">Stories</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Lives saved, direct connections securely verified, and medical support fast-tracked by real communities acting together.
          </p>
        </div>

        {/* TESTIMONIAL MATRIX MESH */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch w-full"
        >
          {stories.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              whileHover={{ y: -10, scale: 1.01 }}
              className="relative flex flex-col justify-between group h-full cursor-default"
            >
              {/* CYBER GLASS GRADIENT CARD */}
              <div className="h-full bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-red-500/30 dark:hover:border-red-500/30 rounded-3xl p-6 lg:p-8 flex flex-col justify-between relative z-10 shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-xl overflow-hidden">
                
                {/* Micro Ambient Radial Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* TOP BANNER ROW: ICONS & BADGES */}
                  <div className="flex items-center justify-between mb-6 w-full">
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-100/60 dark:border-red-950/40 rounded-2xl text-red-600 dark:text-red-400 shadow-inner">
                      <Quote className="w-5 h-5 stroke-[2] fill-current opacity-80" />
                    </div>
                    
                    {/* Minimal Meta-Verification Pill */}
                    <span className={`text-[10px] font-bold tracking-tight border rounded-full px-3 py-1 ${item.tagClass}`}>
                      {item.role}
                    </span>
                  </div>

                  {/* CORE STORY TEXT */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    "{item.story}"
                  </p>
                </div>

                {/* BOTTOM CARD PANEL: USER INFORMATION */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 w-full">
                  <div className="flex items-center justify-between w-full">
                    
                    <div className="flex items-center gap-3.5">
                      {/* Avatar with Custom Edge Ring */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified User</span>
                        </div>
                      </div>
                    </div>

                    {/* Clean Star Ratings Panel */}
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, starIdx) => (
                        <Star key={starIdx} className="w-3.5 h-3.5 fill-current stroke-[2]" />
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* REASSURANCE STATEMENT BOTTOM FLOATER */}
        <div className="mt-16 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium relative z-10 bg-white/70 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 rounded-full py-2.5 px-6 max-w-lg mx-auto backdrop-blur-md shadow-sm">
          <Heart className="w-4 h-4 text-red-500 animate-pulse fill-current" />
          <span>Every testimony is strictly audited for operational accuracy.</span>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;