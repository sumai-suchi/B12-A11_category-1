import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle, ShieldAlert, Heart, Info } from "lucide-react";

const FAQSection = () => {
  const [activeId, setActiveId] = useState(0);

  const faqs = [
    { 
      q: "Is blood donation completely safe?", 
      a: "Absolutely. Blood donation is conducted in highly regulated environments using brand new, sterile, and 100% disposable equipment that is never reused. Your body naturally replenishes the lost fluid within 24 to 48 hours.",
      icon: <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
    },
    { 
      q: "Who exactly is eligible to donate blood?", 
      a: "Generally, healthy individuals who are between 18 and 65 years old, weigh at least 50kg (110 lbs), and haven't contracted transmissible infections or undergone specific recent medical treatments are eligible. Our medical assistants run a quick, painless check before every session.",
      icon: <Info className="w-5 h-5 text-red-600 dark:text-red-400" />
    },
    { 
      q: "How often am I allowed to donate?", 
      a: "You can safely donate whole blood every 3 months (56 days for specific types) to give your red blood cells time to recover entirely. Plasma or platelets can be donated more frequently—typically every 2 to 3 weeks.",
      icon: <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
    },
    { 
      q: "How long does the whole process take?", 
      a: "The actual blood draw takes only about 8 to 10 minutes. However, the entire workflow—including a brief health questionnaire, mini-physical screening, and enjoying post-donation refreshments—takes roughly 45 to 60 minutes.",
      icon: <MessageCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-red-50/10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
      
      {/* BRANDED AMBIENT BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-200/30 dark:bg-red-950/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100/40 dark:bg-rose-950/5 rounded-full blur-[100px]" />
        {/* Subtle dot mesh pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e11d48_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDEBAR: CONTENT INTRODUCTION */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-semibold bg-red-600 text-white shadow-md shadow-red-600/10 tracking-wide">
              <HelpCircle className="w-3.5 h-3.5" />
              Got Questions?
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2]">
              Information That <br />
              <span className="text-red-600 dark:text-red-500">Saves Lives</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Everything you need to know about the safety, protocol, and life-altering impact of your donation. Can't find your answer here? Our clinic support team is available 24/7.
            </p>

            {/* Support Callout Box */}
            <div className="pt-4 hidden lg:block">
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-600 dark:text-red-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Still confused?</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Speak with a clinical representative directly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: LUXURY ACCORDION MODULES */}
          <div className="lg:col-span-7 space-y-4 w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = activeId === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`bg-white dark:bg-slate-900 border ${
                    isOpen 
                      ? 'border-red-500 dark:border-red-500 shadow-md shadow-red-600/[0.03]' 
                      : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  } rounded-2xl overflow-hidden transition-colors duration-300`}
                >
                  {/* Accordion Toggle Trigger */}
                  <button
                    onClick={() => setActiveId(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon Box */}
                      <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                        isOpen ? 'bg-red-50 dark:bg-red-950/40' : 'bg-slate-50 dark:bg-slate-950'
                      }`}>
                        {faq.icon}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                        isOpen ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {faq.q}
                      </h3>
                    </div>

                    {/* Chevron Indicator */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`text-slate-400 transition-colors ${isOpen && 'text-red-500'}`}
                    >
                      <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                    </motion.div>
                  </button>

                  {/* Collapsible Answer Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="pb-6 pl-16 pr-6 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal border-t border-slate-50 dark:border-slate-800/40 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;