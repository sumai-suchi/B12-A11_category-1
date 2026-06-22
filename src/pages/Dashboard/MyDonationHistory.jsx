import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  CalendarClock,
  MapPin,
  Clock3,
  HeartPulse,
  Activity,
  Droplet,
} from "lucide-react";

const getStatusBadge = (status) => {
  switch (status) {
    case "done":
      return "bg-emerald-100 text-emerald-700";
    case "inprogress":
      return "bg-blue-100 text-blue-700";
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "canceled":
    case "cancel":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const MyDonationHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchHistory = async () => {
      try {
        const res = await axiosSecure.get(
          `/donation-history?email=${user.email}`
        );
        setHistory(res.data || []);
      } catch (error) {
        console.error("Failed to fetch donation history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [axiosSecure, user?.email]);

  return (
    <div className="min-h-screen bg-[#f6f7f9] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl"
      >
        <header className="mb-8">
          <p className="text-sm font-bold text-red-600 uppercase tracking-wider">
            Your Contributions
          </p>
          <h1 className="mt-1 text-3xl font-black text-slate-950 sm:text-4xl">
            Donation History
          </h1>
          <p className="mt-2 text-slate-500">
            A complete record of the blood donation requests you have accepted.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner text-red-500 loading-lg"></span>
          </div>
        ) : history.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.map((record, index) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={record._id || index}
                className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-red-200"
              >
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-lg font-black text-red-700">
                      {record.bloodGroup || "N/A"}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400">
                        Recipient
                      </p>
                      <h3 className="font-black text-slate-950">
                        {record.recipientName || "Unknown"}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusBadge(
                      record.donationStatus
                    )}`}
                  >
                    Donated
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Activity className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {record.hospitalName || "Hospital Not Specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <p className="text-sm text-slate-600">
                        {record.address}, {record.upazila}, {record.district}
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <p className="text-sm text-slate-600">
                        {record.donationDate} at {record.donationTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Requester: {record.requesterName || "N/A"}</span>
                      {record.donationStatus === "done" && (
                        <HeartPulse className="h-4 w-4 text-red-500" />
                      )}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm"
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-red-50 text-red-500 mb-4">
              <Droplet className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-950">
              No History Found
            </h2>
            <p className="mt-2 max-w-sm text-slate-500">
              You haven't accepted any donation requests yet. When you do, they
              will appear here.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyDonationHistory;
