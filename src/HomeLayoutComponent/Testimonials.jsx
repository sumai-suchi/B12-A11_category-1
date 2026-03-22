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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};
const Testimonials = () => {
  return (
   <section className="py-24 bg-linear-to-br from-red-100 via-white to-red-200 rounded-3xl overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          💬 Real Life Stories
        </h2>
        <p className="text-gray-500 mt-4">
          Lives saved. Smiles restored. Humanity at its best.
        </p>
      </div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 px-6 md:px-16 relative z-10"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{
              rotateX: 5,
              rotateY: -5,
              scale: 1.05,
            }}
            className="group relative p-[2px] rounded-3xl bg-gradient-to-r from-red-400 via-pink-400 to-red-500"
          >
            {/* Inner Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 h-full shadow-xl group-hover:shadow-2xl transition">

              {/* Quote Icon */}
              <div className="text-5xl text-red-300 mb-2">“</div>

              {/* Text */}
              <p className="text-gray-600 leading-relaxed">
                This platform helped me find blood within minutes. I never
                imagined strangers would come forward so quickly. Truly a
                life-saving experience.
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 20}`}
                  className="w-14 h-14 rounded-full border-2 border-red-400 shadow-md"
                />
                <div>
                  <h4 className="font-semibold text-lg">User {i}</h4>
                  <p className="text-sm text-gray-400">Blood Recipient</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex mt-4 text-yellow-400 text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;