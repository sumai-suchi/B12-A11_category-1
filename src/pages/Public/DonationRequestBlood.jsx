import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

/* ================= Main Component ================= */
const DonationRequestBlood = () => {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/pending-request?status=all&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );
        setRequests(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalCount(res.data.totalCount);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate smart page number list with ellipsis
  const getPageNumbers = () => {
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    const range = [];
    for (let i = left; i <= right; i++) range.push(i);
    if (left > 2) range.unshift("...", 1);
    else if (left === 2) range.unshift(1);
    if (right < totalPages - 1) range.push("...", totalPages);
    else if (right === totalPages - 1) range.push(totalPages);
    return range;
  };

  // Status badge styles
  const statusStyles = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    inprogress: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    default: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  /* Skeleton loader rows (desktop) */
  const SkeletonRows = () => (
    <>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <tr key={i} className="border-b border-slate-800/50 animate-pulse">
          {Array.from({ length: 8 }).map((__, j) => (
            <td key={j} className="py-4 px-6">
              <div className="h-3 bg-slate-800 rounded-full w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  /* Pagination Bar */
  const PaginationBar = () => {
    if (totalPages <= 1) return null;
    const pages = getPageNumbers();
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

    return (
      <div className="flex flex-col items-center gap-3 px-6 py-6 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="text-slate-300 font-semibold">{start}&#8211;{end}</span>
          {" "}of{" "}
          <span className="text-slate-300 font-semibold">{totalCount}</span> requests
        </p>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800/70 border border-slate-700/50 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          {pages.map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-600 text-sm select-none">
                &#8230;
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border ${
                  page === currentPage
                    ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/40"
                    : "bg-slate-800/70 text-slate-400 border-slate-700/50 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800/70 border border-slate-700/50 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen px-4 py-12 md:py-16 bg-slate-950 font-sans antialiased overflow-x-hidden">

      {/* Atmospheric Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/BloodDonationImg.png"
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          alt="Blood Donation Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-red-950/40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live Campaign Requests
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-red-400">
            Blood Donation Requests
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto text-sm md:text-base">
            Review, track, and manage ongoing emergency requirements dynamically.
          </p>
          {totalCount > 0 && (
            <p className="mt-2 text-slate-500 text-xs">
              {totalCount} active pending request{totalCount !== 1 ? "s" : ""}
            </p>
          )}
        </motion.div>

        {/* Main Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Mobile Cards Layout */}
          <div className="lg:hidden p-4 space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 animate-pulse">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-800 rounded w-16" />
                        <div className="h-4 bg-slate-800 rounded w-32" />
                      </div>
                      <div className="h-7 w-12 bg-slate-800 rounded-lg" />
                    </div>
                    <div className="space-y-2 border-t border-slate-800/60 pt-3 mb-4">
                      <div className="h-3 bg-slate-800 rounded w-full" />
                      <div className="h-3 bg-slate-800 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : requests.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {requests.map((req) => (
                    <motion.div
                      variants={itemVariants}
                      key={req._id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/30 transition-all duration-300 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Recipient</span>
                          <h3 className="font-bold text-lg text-slate-200 mt-0.5">{req.recipientName}</h3>
                        </div>
                        <span className="px-3 py-1 rounded-xl bg-red-500 text-white font-black text-sm tracking-wide shadow-lg shadow-red-500/20">
                          {req.bloodGroup}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 text-sm text-slate-400 border-t border-slate-800/60 pt-3 mb-4">
                        <p><span className="text-slate-500 font-medium">Hospital:</span> <span className="text-slate-300">{req.hospitalName}</span></p>
                        <p><span className="text-slate-500 font-medium">Address:</span> <span className="text-slate-300">{req.address}, {req.upazila}, {req.district}</span></p>
                        <p><span className="text-slate-500 font-medium">Schedule:</span> <span className="text-red-400/90 font-medium">{req.donationDate}</span> at {req.donationTime}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border capitalize ${statusStyles[req.donationStatus] || statusStyles.default}`}>
                          {req.donationStatus}
                        </span>
                        <NavLink to={`/dashboard/donation-details-page/${req._id}`} className="shrink-0">
                          <button className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl transition-all active:scale-95 shadow-lg shadow-red-950/50">
                            View Details
                          </button>
                        </NavLink>
                      </div>

                      {req.donationStatus === "inprogress" && (
                        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-sky-500/10 text-xs text-slate-400">
                          <p className="text-sky-400 font-semibold mb-0.5">Assigned Donor Info:</p>
                          <p className="text-slate-300 font-medium">{req.requesterName}</p>
                          <p className="text-slate-500">{req.requesterEmail}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm">No operational requests found.</p>
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-5 px-6">Recipient</th>
                  <th className="py-5 px-4 text-center">Group</th>
                  <th className="py-5 px-6">Hospital Details</th>
                  <th className="py-5 px-6">Location</th>
                  <th className="py-5 px-6">Date &amp; Time</th>
                  <th className="py-5 px-4 text-center">Status</th>
                  <th className="py-5 px-6">Donor Context</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                {isLoading ? (
                  <SkeletonRows />
                ) : requests?.length > 0 ? (
                  requests?.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="py-4 px-6 font-semibold text-slate-100">{req.recipientName}</td>

                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-extrabold text-xs min-w-[40px]">
                          {req.bloodGroup}
                        </span>
                      </td>

                      <td className="py-4 px-6 max-w-[200px] truncate text-slate-300">{req.hospitalName}</td>

                      <td className="py-4 px-6 max-w-[220px] truncate text-slate-400 text-xs">
                        {`${req.address || ""}, ${req.upazila}, ${req.district}`}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap text-xs">
                        <span className="text-slate-200 font-medium">{req.donationDate}</span>
                        <span className="block text-slate-500 mt-0.5">{req.donationTime}</span>
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border capitalize ${statusStyles[req.donationStatus] || statusStyles.default}`}>
                          {req.donationStatus}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-xs max-w-[180px] truncate">
                        {req.donationStatus === "inprogress" ? (
                          <div>
                            <p className="font-medium text-slate-200">{req.requesterName}</p>
                            <p className="text-slate-500 mt-0.5">{req.requesterEmail}</p>
                          </div>
                        ) : (
                          <span className="text-slate-600">&#8212;</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <NavLink to={`/dashboard/donation-details-page/${req._id}`}>
                          <button className="px-4 py-2 text-xs font-bold bg-slate-800 group-hover:bg-red-600 text-slate-300 group-hover:text-white rounded-xl transition-all duration-300 border border-slate-700/60 group-hover:border-transparent active:scale-95 shadow-md">
                            Details
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-16 text-center text-slate-500 font-medium">
                      No active blood donation requests found at this moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <PaginationBar />

        </motion.div>
      </div>
    </div>
  );
};

export default DonationRequestBlood;
