import { NavLink } from "react-router";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const Hero = () => {
  return (
    <div>
      <div className="relative bg-red-300  text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b')] bg-cover bg-center opacity-10"></div>

       <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center"
    >
      {/* Title */}
     <motion.h1
  variants={item}
  className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
>
  Donate Blood,
  <span className="block text-red-900 relative">
    Save Lives Today{" "}
    
    {/* Animated Blood Drop */}
    <motion.span
      className="inline-block"
      animate={{
        y: [0, 20, 40],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeIn",
      }}
    >
      🩸
    </motion.span>
  </span>
</motion.h1>

      {/* Description */}
      <motion.p
        variants={item}
        className="mt-6 max-w-2xl text-lg md:text-xl text-white leading-relaxed"
      >
        Every drop of blood is a gift of life. Join our community of heroes
        and help patients in urgent need of blood donation.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={item}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/auth/register"
            className="btn btn-lg bg-white text-red-600 hover:bg-red-100 border-none shadow-lg"
          >
            ❤️ Join as a Donor
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/searchDonner"
            className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-red-600 shadow-lg"
          >
            🔍 Search Donors
          </NavLink>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div
        variants={item}
        className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-red-100"
      >
        <span>✔ Trusted by Hospitals</span>
        <span>✔ Verified Donors</span>
        <span>✔ 24/7 Emergency Support</span>
      </motion.div>
    </motion.div>

      </div>
    </div>
  );
};

export default Hero;
