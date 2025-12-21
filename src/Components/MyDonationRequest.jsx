import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../AuthContext/AuthContext";

const MyDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [MyRequest, setMyRequest] = useState([]);
  const { user } = useContext(AuthContext);

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/my-donation-request`);
      setMyRequest(res.data);
    };
    fetchData();
  }, [axiosSecure, user]);

  console.log(MyRequest);

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md ">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        🩸 My Donation Requests
      </h2>

      {/* Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`btn btn-sm ${
              statusFilter === status ? "btn-primary" : "btn-outline"
            } capitalize`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Blood Group</th>
              <th>Hospital</th>
              <th>Address</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {MyRequest.length > 0 ? (
              MyRequest.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium">{req.recipientName}</span>
                      <span className="text-xs text-gray-500">
                        {req.requesterName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-error">{req.bloodGroup}</span>
                  </td>
                  <td>{req.hospitalName}</td>
                  <td>{`${req.address || ""}, ${req.upazila}, ${
                    req.district
                  }`}</td>
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
                  <td className="max-w-xs truncate">{req.requestMessage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequest;
