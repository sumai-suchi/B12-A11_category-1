import { useEffect } from "react";
import { useState } from "react";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../AuthContext/AuthContext";
import { NavLink } from "react-router";
import { MdEdit } from "react-icons/md";

import useAxios from "../hooks/useAxios";

const DonationRequestBlood = () => {
  const axiosInstance = useAxios();
  //   const { user } = useContext(AuthContext);

  const [MyRequest, setMyRequest] = useState([]);
  const [AllRequest, setAllRequest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `/pending-request?status=${"pending"}`
      );
      setAllRequest(res.data);
      setMyRequest(res.data);
    };
    fetchData();
  }, [axiosInstance]);

  console.log(MyRequest);

  return (
    <div>
      <div className="p-4 bg-base-100 rounded-lg shadow-md ">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          🩸 My Donation Requests
        </h2>

        <div className="h-full py-8 h-screen bg-linear-to-r from-red-700/80 to-black/30 px-3">
          <div className="p-4 bg-base-100 rounded-lg shadow-md ">
            <div className="lg:hidden space-y-4">
              {MyRequest.length > 0 ? (
                MyRequest.map((req) => (
                  <div
                    key={req._id}
                    className="card bg-base-100 shadow-md border border-red-100"
                  >
                    <div className="card-body p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-red-600">
                          {req.recipientName}
                        </h2>
                        <span className="badge badge-error">
                          {req.bloodGroup}
                        </span>
                      </div>

                      <p className="text-sm">
                        <span className="font-semibold">Hospital:</span>{" "}
                        {req.hospitalName}
                      </p>

                      <p className="text-sm">
                        <span className="font-semibold">Address:</span>{" "}
                        {req.address}, {req.upazila}, {req.district}
                      </p>

                      <p className="text-sm">
                        <span className="font-semibold">Date:</span>{" "}
                        {req.donationDate}
                      </p>

                      <p className="text-sm">
                        <span className="font-semibold">Time:</span>{" "}
                        {req.donationTime}
                      </p>

                      <div>
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
                      </div>

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
                <p className="text-center text-gray-500">
                  No donation requests found.
                </p>
              )}
            </div>

            <div className="hidden lg:block h-full overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Blood Group</th>
                    <th>Hospital</th>
                    <th>Address</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>DonnerInfo</th>

                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {MyRequest.length > 0 ? (
                    MyRequest.map((req) => (
                      <tr key={req._id}>
                        <td>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {req.recipientName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-error">
                            {req.bloodGroup}
                          </span>
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
                        <td>
                          {req.donationStatus === "inprogress" && (
                            <div>
                              <span className=" text-black font-semibold">
                                {req.requesterName}
                                <p>{req.requesterEmail}</p>
                              </span>
                            </div>
                          )}
                        </td>

                        <td>
                          <NavLink
                            to={`/dashboard/donation-details-page/${req._id}`}
                          >
                            <button
                              type="button"
                              className="btn p-1 bg-green-900 text-white"
                            >
                              details
                            </button>
                          </NavLink>
                        </td>
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
        </div>
      </div>
    </div>
  );
};

export default DonationRequestBlood;
