import React from 'react';
import { motion } from "framer-motion";

/* ---------------- ANIMATION ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } }
};

const FAQSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-red-50 via-white to-red-100 rounded-3xl relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative z-10">
        {/* Heading */}
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800">
          ❓ Frequently Asked Questions
        </motion.h2>

        {/* FAQ Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { q: "Is blood donation safe?", a: "Yes, it is completely safe and done under medical supervision." },
            { q: "Who can donate blood?", a: "Healthy individuals aged 18-65, meeting weight and health criteria, can donate." },
            { q: "How often can I donate?", a: "You can donate whole blood every 3 months, platelets every 2 weeks." },
          ].map((faq, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -5, scale: 1.02 }} className="relative group p-6 bg-white/80 backdrop-blur-xl border border-red-100 rounded-3xl shadow-lg hover:shadow-2xl transition cursor-pointer">

              {/* Glow circle */}
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-red-200 rounded-full blur-2xl opacity-40"></div>

              <h4 className="font-semibold text-lg text-red-600 mb-2">{faq.q}</h4>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
