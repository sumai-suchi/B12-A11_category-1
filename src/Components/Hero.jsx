import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "Blood1.webp",
  "Blood2.jpg",
  "Blood4.jpg",
  "Blood5.jpg",
  "Blood6.avif",
  "Blood7.webp",
  "Blood8.webp",
  "Blood9.jpg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // FIX: Added modulo to loop through ALL images
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* --- BACKGROUND SLIDER --- */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundImage: `url(${images[index]})`,
              // FIX: "contain" shows full image, "cover" fills screen
              backgroundSize: "cover", 
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

     <div className="relative z-50 container mx-auto px-6 h-full flex items-center justify-center text-center">
  
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.2 } }
    }}
    className="max-w-4xl"
  >

    {/* Badge */}
    <motion.div
      variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
      className="inline-block mb-6 px-4 py-2 bg-red-600/20 text-red-400 text-sm font-semibold rounded-full tracking-wide"
    >
      ❤️ Save Lives Today
    </motion.div>

    {/* Heading */}
    <motion.h1
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tight"
    >
      Donate Blood, <br />
      <span className="text-red-600">Save Lives</span>
    </motion.h1>

    {/* Description */}
    <motion.p
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
    >
      A single donation can save up to <span className="text-white font-bold">three lives</span>.  
      Join a growing community of donors and make a real impact today.
    </motion.p>

    {/* Buttons */}
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavLink
          to="/auth/register"
          className="px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-all text-lg flex items-center gap-2"
        >
          Start Donating →
        </NavLink>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavLink
          to="/searchDonner"
          className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white hover:text-red-600 transition-all text-lg"
        >
          Find a Donor
        </NavLink>
      </motion.div>
    </motion.div>

    {/* Trust Stats */}
    <motion.div
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      className="mt-12 grid grid-cols-3 gap-6 text-center"
    >
      <div>
        <h3 className="text-2xl font-bold text-white">10K+</h3>
        <p className="text-gray-400 text-sm">Active Donors</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">5K+</h3>
        <p className="text-gray-400 text-sm">Lives Saved</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">24/7</h3>
        <p className="text-gray-400 text-sm">Support</p>
      </div>
    </motion.div>

  </motion.div>
</div>

      {/* Progress Indicators - These will now accurately show all 8 dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? "w-12 bg-red-600" : "w-4 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;