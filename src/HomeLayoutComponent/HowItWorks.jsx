import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, HeartPulse } from "lucide-react";

/* ---------------- ANIMATION ---------------- */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const steps = [
  {
    title: "Register",
    desc: "Create your account as a donor or recipient in just a few seconds.",
    icon: UserPlus,
  },
  {
    title: "Find Donor",
    desc: "Search for available donors based on blood group and location.",
    icon: Search,
  },
  {
    title: "Save Life",
    desc: "Connect instantly and help save a life with your donation.",
    icon: HeartPulse,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-red-50 to-red-100 rounded-3xl relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          🩸 How It Works
        </h2>
        <p className="text-gray-500 mt-4">
          Simple steps to connect donors and save lives
        </p>
      </div>

      {/* Steps */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 px-6 md:px-16 relative z-10"
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -10, scale: 1.04 }}
              className="relative group"
            >
              {/* Line Connector (desktop) */}
              {i !== 2 && (
                <div className="hidden md:block absolute top-12 right-[-50%] w-full h-1 bg-gradient-to-r from-red-300 to-transparent"></div>
              )}

              {/* Card */}
              <div className="bg-white/80 backdrop-blur-xl border border-red-100 rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition">

                {/* Step Number */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4 mt-4">
                  <div className="p-4 bg-red-100 rounded-full text-red-500">
                    <Icon size={32} />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-center">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-center mt-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default HowItWorks;