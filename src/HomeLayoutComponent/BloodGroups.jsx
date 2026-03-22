import React from 'react';
import { motion } from "framer-motion";

/* ---------------- ANIMATION ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};
const BloodGroups = () => {
  return (
   <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="text-center space-y-10"
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold">
        Available Blood Groups
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4">
        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
          <motion.div
            key={type}
            variants={fadeUp}
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow cursor-pointer"
          >
            {type}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BloodGroups;