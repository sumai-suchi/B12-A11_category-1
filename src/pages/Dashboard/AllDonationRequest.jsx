import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../AuthContext/AuthContext";
import { NavLink } from "react-router";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt, FaHospital, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AllDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [myRequest, setMyRequest] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/all-donation-request`);
        setAllRequest(res.data);
        setMyRequest(res.data);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };
    fetchData();
  }, [axiosSecure, user?.email]);

  const handleFilter = (status) => {
    setStatusFilter(status);
    if (status === "all") return setMyRequest(allRequest);
    setMyRequest(allRequest.filter((req) => req.donationStatus === status));
  };

  const handleDeleteOne = async (id) => {
    try {
      await axiosSecure.delete(`/userRequest/${id}`);
      setMyRequest((prev) => prev.filter((u) => u._id !== id));
      setAllRequest((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending": return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "inprogress": return "bg-sky-500/20 text-sky-300 border-sky-500/40";
      case "done": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "canceled": return "bg-neutral-500/30 text-neutral-400 border-neutral-500/40";
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 26 } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 md:py-20 font-sans overflow-x-hidden">
      
      {/* 🌌 Background Elements */}
      <img
        src="/BloodDonationImg.png"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        alt="Background"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/95 to-red-950/85 mix-blend-multiply"></div>

      {/* 💎 Main Interface Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl bg-slate-900/50 backdrop-blur-3xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Header Block */}
        <div className="text-center mb-8">
          <motion.div 
            animate={{ scale: [0.9, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
            className="inline-block mb-2 text-3xl"
          >
            🩸
          </motion.div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase bg-clip-text bg-gradient-to-r from-white to-slate-300">
            Donation Requests
          </h2>
          <p className="text-xs text-slate-400 mt-1">Realtime filtering index and account operations</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 bg-slate-950/60 p-1.5 rounded-xl border border-white/5 max-w-xl mx-auto">
          {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-200
                ${statusFilter === status
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-black scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {status === "inprogress" ? "In Progress" : status}
            </button>
          ))}
        </div>

        {/* 📱 Mobile UI (Under 1024px width screens) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="block lg:hidden space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {myRequest.map((req) => (
              <motion.div
                key={req._id}
                variants={itemVariants}
                layout
                className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-white shadow-md hover:border-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-100">{req.recipientName}</h3>
                    <p className="text-xs text-red-400 font-bold mt-0.5">Recipient</p>
                  </div>
                  <span className="bg-red-600 font-black text-xs px-3 py-1 rounded-lg">
                    {req.bloodGroup}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300/90 border-y border-white/5 py-3">
                  <p className="flex items-center gap-2"><FaHospital className="text-slate-400 shrink-0" /> {req.hospitalName}</p>
                  <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-slate-400 shrink-0" /> {req.address}, {req.upazila}, {req.district}</p>
                  <p className="flex items-center gap-2"><FaCalendarAlt className="text-slate-400 shrink-0" /> {req.donationDate} • {req.donationTime}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-black tracking-widest border ${getStatusStyles(req.donationStatus)}`}>
                    {req.donationStatus}
                  </span>

                  <div className="flex gap-2">
                    <NavLink to={`/dashboard/donation-request-details-page/${req._id}`}>
                      <button className="bg-white/10 hover:bg-white text-white hover:text-slate-900 p-2 rounded-lg transition-colors">
                        <MdEdit size={14} />
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDeleteOne(req._id)}
                      className="bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white p-2 rounded-lg transition-colors"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 💻 Desktop Structural UI (Using CSS Grids to prevent layout breaking on filter animations) */}
        <div className="hidden lg:block w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/20">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 bg-white/5 p-4 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-white/10">
            <div className="col-span-2 pl-2">Recipient</div>
            <div className="col-span-1 text-center">Blood</div>
            <div className="col-span-2">Medical Center</div>
            <div className="col-span-3">Dropoff Point</div>
            <div className="col-span-2">Schedule</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-center pr-2">Actions</div>
          </div>

          {/* Rows Body Grid Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-white/5 relative"
          >
            <AnimatePresence mode="popLayout">
              {myRequest.map((req) => (
                <motion.div
                  key={req._id}
                  variants={itemVariants}
                  layout
                  className="grid grid-cols-12 gap-2 items-center p-4 text-white hover:bg-white/[0.02] transition-colors origin-center"
                >
                  <div className="col-span-2 font-extrabold text-slate-100 truncate pl-2">{req.recipientName}</div>
                  
                  <div className="col-span-1 text-center">
                    <span className="inline-block font-black text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg px-2.5 py-0.5">
                      {req.bloodGroup}
                    </span>
                  </div>

                  <div className="col-span-2 text-xs font-semibold text-slate-300 truncate">{req.hospitalName}</div>
                  
                  <div className="col-span-3 text-xs text-slate-400 truncate pr-2">
                    {req.address}{req.upazila ? `, ${req.upazila}` : ''}{req.district ? `, ${req.district}` : ''}
                  </div>
                  
                  <div className="col-span-2 text-xs text-slate-300">
                    <span className="font-semibold block">{req.donationDate}</span>
                    <span className="text-[10px] text-slate-500">{req.donationTime}</span>
                  </div>

                  <div className="col-span-1 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] uppercase font-black tracking-wider border ${getStatusStyles(req.donationStatus)}`}>
                      {req.donationStatus}
                    </span>
                  </div>

                  <div className="col-span-1 flex justify-center items-center gap-1.5 pr-2">
                    <NavLink to={`/dashboard/donation-request-details-page/${req._id}`}>
                      <button className="bg-white/5 hover:bg-white text-white hover:text-slate-900 border border-white/5 p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow">
                        <MdEdit size={14} />
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDeleteOne(req._id)}
                      className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/10 p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Empty State */}
        {myRequest.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-500 border border-dashed border-white/10 rounded-xl mt-2 bg-slate-950/10"
          >
            <p className="text-base font-medium text-slate-400">No active entries match this filter</p>
            <p className="text-xs text-slate-600 mt-0.5">Toggle different parameters above</p>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default AllDonationRequest;