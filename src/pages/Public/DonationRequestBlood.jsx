import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext"
import useAxiosSecure from  "../../hooks/useAxiosSecure"
import { motion } from "framer-motion";
import { NavLink } from "react-router";

/* ================= Main Component ================= */
const DonationRequestBlood = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/pending-request?status=pending`);
        setAllRequests(res.data);
        setMyRequests(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [axiosSecure]);

  return (
    <div className="relative min-h-screen px-4 py-10">

      {/* ✅ Background */}
      <img
        src="/BloodDonationImg.png"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-red-700/70 via-black/30 to-black/50"></div>

      {/* 💎 Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          🩸 My Blood Donation Requests
        </h2>

        {/* 🔹 Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {myRequests.length > 0 ? (
            myRequests.map((req) => (
              <div
                key={req._id}
                className="card bg-white/10 border border-red-100 shadow-md"
              >
                <div className="card-body p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-red-600">{req.recipientName}</h2>
                    <span className="badge badge-error">{req.bloodGroup}</span>
                  </div>
                  <p className="text-sm"><span className="font-semibold">Hospital:</span> {req.hospitalName}</p>
                  <p className="text-sm"><span className="font-semibold">Address:</span> {req.address}, {req.upazila}, {req.district}</p>
                  <p className="text-sm"><span className="font-semibold">Date:</span> {req.donationDate}</p>
                  <p className="text-sm"><span className="font-semibold">Time:</span> {req.donationTime}</p>
                  <span
                    className={`badge ${
                      req.donationStatus === "pending"
                        ? "badge-warning"
                        : req.donationStatus === "inprogress"
                        ? "badge-info"
                        : req.donationStatus === "done"
                        ? "badge-success"
                        : "badge-error"
                    } capitalize`}
                  >
                    {req.donationStatus}
                  </span>

                  {req.donationStatus === "inprogress" && (
                    <div className="bg-gray-100 p-2 rounded-md text-sm">
                      <p className="font-semibold">{req.requesterName}</p>
                      <p>{req.requesterEmail}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300">No donation requests found.</p>
          )}
        </div>

        {/* 🔹 Desktop Table */}
        <div className="hidden lg:block overflow-x-auto mt-6">
          <table className="table table-zebra w-full text-white">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Blood Group</th>
                <th>Hospital</th>
                <th>Address</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.length > 0 ? (
                myRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td><span className="badge badge-error">{req.bloodGroup}</span></td>
                    <td>{req.hospitalName}</td>
                    <td>{`${req.address || ""}, ${req.upazila}, ${req.district}`}</td>
                    <td>{`${req.donationDate} at ${req.donationTime}`}</td>
                    <td>
                      <span
                        className={`badge ${
                          req.donationStatus === "pending"
                            ? "badge-warning"
                            : req.donationStatus === "inprogress"
                            ? "badge-info"
                            : req.donationStatus === "done"
                            ? "badge-success"
                            : "badge-error"
                        } capitalize`}
                      >
                        {req.donationStatus}
                      </span>
                    </td>
                    <td>
                      {req.donationStatus === "inprogress" && (
                        <div>
                          <p className="font-semibold">{req.requesterName}</p>
                          <p>{req.requesterEmail}</p>
                        </div>
                      )}
                    </td>
                    <td>
                      <NavLink to={`/dashboard/donation-details-page/${req._id}`}>
                        <button className="btn p-1 bg-green-900 text-white">Details</button>
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-300">No donation requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationRequestBlood;