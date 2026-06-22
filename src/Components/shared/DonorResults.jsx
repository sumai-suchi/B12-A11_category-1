import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, CheckCircle, Droplets, Search, Navigation } from 'lucide-react';
import HeroContactModal from '../modals/HeroContactModal';

const DonorResults = ({ donors = [], loading }) => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openContactModal = (donor) => {
    setSelectedDonor(donor);
    setIsModalOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6">
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Droplets size={60} className="text-rose-500 fill-rose-100" />
        </motion.div>
        <p className="text-slate-400 font-semibold tracking-wide animate-pulse">
          LOCATING NEARBY HEROES...
        </p>
      </div>
    );
  }

  if (!donors || donors.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50">
        <Search size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-2xl font-black text-slate-800">No Heroes Found</h3>
        <p className="text-slate-500 mt-2">Adjust your filters to see more life-savers.</p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {donors.map((donor) => (
        <motion.div
          key={donor._id}
          variants={item}
          whileHover={{ y: -12 }}
          className="relative group"
        >
          {/* Main Card Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-700 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          
          <div className="bg-white rounded-[2.8rem] p-2 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="bg-slate-50/50 rounded-[2.5rem] p-6">
              
              {/* Top Row: Profile & Group */}
              <div className="flex justify-between items-start mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white">
                    <img 
                      src={donor.mainPhotoUrl || `https://ui-avatars.com/api/?name=${donor.name}&background=random`} 
                      className="w-full h-full object-cover"
                      alt={donor.name}
                    />
                  </div>
                  {donor.status === 'active' && (
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-4 border-white"></span>
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end">
                  <div className="bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-2xl flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Group</span>
                    <span className="text-2xl font-black text-rose-600 leading-none">{donor.bloodGroup}</span>
                  </div>
                </div>
              </div>

              {/* Identity Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{donor.name}</h2>
                  <CheckCircle size={18} className="text-blue-500 fill-blue-50" />
                </div>
                <div className="flex items-center text-slate-500 gap-1.5 bg-white/60 self-start py-1 px-3 rounded-full border border-slate-100 w-fit">
                  <MapPin size={14} className="text-rose-500" />
                  <span className="text-xs font-bold truncate tracking-tight">
                    {donor.upazila}, {donor.districts || donor.district}
                  </span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex gap-3 mb-8">
                <div className="flex-1 bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Distance</span>
                   <div className="flex items-center gap-1">
                      <Navigation size={12} className="text-rose-500 fill-rose-500" />
                      <span className="text-sm font-black text-slate-800">
                        {/* THE FIX: Safe check for distance */}
                        {(Number(donor.distance) || 0).toFixed(1)} km
                      </span>
                   </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</span>
                   <span className={`text-sm font-black ${donor.status === 'active' ? 'text-green-600' : 'text-slate-400'}`}>
                     {donor.status === 'active' ? 'READY' : 'AWAY'}
                   </span>
                </div>
              </div>

              {/* Call Button */}
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => openContactModal(donor)}
                className="w-full bg-slate-900 group-hover:bg-rose-600 text-white py-5 rounded-[1.8rem] font-black flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] group-hover:shadow-rose-200 transition-all duration-300"
              >
                <Phone size={20} className="fill-current" />
                <span className="tracking-wide uppercase">Contact Hero</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
      {isModalOpen && selectedDonor && (
        <HeroContactModal
          donor={selectedDonor}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default DonorResults;