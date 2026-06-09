import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../AuthContext/AuthContext";
import { NavLink } from "react-router";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";

const AllDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [MyRequest, setMyRequest] = useState([]);
  const [AllRequest, setAllRequest] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/all-donation-request`);
      setAllRequest(res.data);
      setMyRequest(res.data);
    };
    fetchData();
  }, [axiosSecure, user?.email]);

  const handleFilter = (status) => {
    setStatusFilter(status);
    if (status === "all") return setMyRequest(AllRequest);

    setMyRequest(
      AllRequest.filter((req) => req.donationStatus === status)
    );
  };

  const handleDeleteOne = async (id) => {
    try {
      await axiosSecure.delete(`/userRequest/${id}`);
      setMyRequest((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* 🌌 Background */}
      <img
        src="/BloodDonationImg.png"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🔥 Gradient overlay (premium) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-red-900/40 to-black/70"></div>

      {/* 💎 Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide">
          🩸 Donation Requests
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${
                  statusFilter === status
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* 📱 Mobile */}
        <div className="lg:hidden space-y-5">
          {MyRequest.map((req) => (
            <div
              key={req._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 text-white shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{req.recipientName}</h3>
                <span className="bg-red-600 px-3 py-1 rounded-full text-xs">
                  {req.bloodGroup}
                </span>
              </div>

              <p className="mt-2 text-sm opacity-90">{req.hospitalName}</p>
              <p className="text-sm opacity-80">
                {req.address}, {req.upazila}, {req.district}
              </p>

              <p className="text-sm mt-1 opacity-80">
                {req.donationDate} • {req.donationTime}
              </p>

              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white/20 text-xs capitalize">
                {req.donationStatus}
              </span>

              <div className="flex gap-2 mt-4">
                <NavLink to={`/dashboard/donation-request-details-page/${req._id}`}>
                  <button className="bg-black px-3 py-1 rounded-lg">
                    <MdEdit />
                  </button>
                </NavLink>

                <button
                  onClick={() => handleDeleteOne(req._id)}
                  className="bg-red-600 px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💻 Desktop Table */}
        <div className="hidden lg:block overflow-x-auto rounded-xl border border-white/20">
          <table className="w-full text-white backdrop-blur-lg">
            <thead className="bg-white/10">
              <tr>
                <th className="p-4 text-left">Recipient</th>
                <th>Blood</th>
                <th>Hospital</th>
                <th>Address</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {MyRequest.map((req, i) => (
                <tr
                  key={req._id}
                  className={`border-t border-white/10 ${
                    i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                  }`}
                >
                  <td className="p-4">{req.recipientName}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.hospitalName}</td>
                  <td>{req.address}</td>
                  <td>{req.donationDate}</td>
                  <td className="capitalize">{req.donationStatus}</td>

                  <td className="flex justify-center gap-2 py-2">
                    <NavLink to={`/dashboard/donation-request-details-page/${req._id}`}>
                      <button className="bg-black px-3 py-1 rounded-lg">
                        <MdEdit />
                      </button>
                    </NavLink>

                    <button
                      onClick={() => handleDeleteOne(req._id)}
                      className="bg-red-600 px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </motion.div>
    </div>
  );
};

export default AllDonationRequest;