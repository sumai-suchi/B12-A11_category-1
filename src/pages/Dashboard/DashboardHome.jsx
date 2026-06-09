import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [MyRequest, setMyRequest] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchData = async () => {
      const res = await axiosSecure.get(
        `/my-donation-request?email=${user?.email}&limit=3`
      );
      setMyRequest(res.data);
    };
    fetchData();
  }, [axiosSecure, user?.email]);

  const handleStatus = async (donationStatus, _id) => {
    try {
      await axiosSecure.patch(
        `/update/userRequest/status?id=${_id}&donationStatus=${donationStatus}`
      );
      setMyRequest((prev) =>
        prev.map((u) =>
          u._id === _id ? { ...u, donationStatus } : u
        )
      );
    } catch (error) {
      console.log(error);
    }
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
    <div className="relative min-h-screen flex flex-col items-center px-4 py-10">

      {/* Background */}
      <img
        src="/BloodDonationImg.png"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative w-full max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Welcome,{" "}
            <span className="text-red-300">{user?.displayName}</span> ❤️
          </h1>
          <p className="text-gray-200 mt-2">
            Be the reason someone smiles today
          </p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            🩸 My Donation Requests
          </h2>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {MyRequest.length > 0 ? (
              MyRequest.map((req) => (
                <div
                  key={req._id}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-white"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">{req.recipientName}</h3>
                    <span className="bg-red-600 px-2 py-1 rounded text-sm">
                      {req.bloodGroup}
                    </span>
                  </div>

                  <p className="text-sm mt-2">
                    {req.hospitalName}
                  </p>

                  <p className="text-sm">
                    {req.address}, {req.upazila}, {req.district}
                  </p>

                  <p className="text-sm">
                    {req.donationDate} at {req.donationTime}
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded bg-white/30 text-sm capitalize">
                    {req.donationStatus}
                  </span>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {req.donationStatus === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatus("done", req._id)}
                          className="bg-green-600 px-3 py-1 rounded"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatus("cancel", req._id)}
                          className="bg-red-600 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    <NavLink to={`/dashboard/donation-request-details-page/${req._id}`}>
                      <button className="bg-black px-3 py-1 rounded">
                        <MdEdit />
                      </button>
                    </NavLink>

                    <button
                      onClick={() => handleDeleteOne(req._id)}
                      className="bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center">
                No donation requests found.
              </p>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/30 text-left">
                  <th className="py-3">Recipient</th>
                  <th>Blood</th>
                  <th>Hospital</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {MyRequest.map((req) => (
                  <tr key={req._id} className="border-b border-white/20">
                    <td>{req.recipientName}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.hospitalName}</td>
                    <td>{req.address}</td>
                    <td>{req.donationDate}</td>
                    <td className="capitalize">{req.donationStatus}</td>

                    <td className="flex gap-2 py-2">
                      <NavLink to={`/dashboard/donation-request-details-page/${req._id}`}>
                        <button className="bg-black px-3 py-1 rounded">
                          <MdEdit />
                        </button>
                      </NavLink>

                      <button
                        onClick={() => handleDeleteOne(req._id)}
                        className="bg-red-600 px-3 py-1 rounded"
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

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <NavLink
            to="/dashboard/my-donation-request"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            View All Requests
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;