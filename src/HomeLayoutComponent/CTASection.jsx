import React from 'react';
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative text-center py-28 rounded-3xl overflow-hidden bg-red-200"
    >

      {/* Background Animated Blobs */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-red-300 rounded-full opacity-40 blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full opacity-40 blur-3xl"
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          Become a Hero Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 mb-8"
        >
          Donate blood and save lives. Your one action can make a huge difference.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-10 py-4 bg-white text-red-600 font-bold rounded-full shadow-2xl hover:shadow-red-400/50 transition-all"
        >
          Donate Now
        </motion.button>
      </div>

      {/* Floating Heart Animation */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 text-white text-6xl opacity-25"
      >
        ❤️
      </motion.div>

    </motion.section>
  );
};

export default CTASection;