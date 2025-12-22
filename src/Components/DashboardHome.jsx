import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [MyRequest, setMyRequest] = useState([]);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(
        `/my-donation-request?email=${user?.email}&limit=3`
      );
      setMyRequest(res.data);
    };
    fetchData();
  }, [axiosSecure, user?.email]);

  console.log(MyRequest);

  const handleStatus = async (donationStatus, _id) => {
    console.log(donationStatus);
    console.log(_id);

    try {
      const res = await axiosSecure.patch(
        `/update/userRequest/status?id=${_id}&donationStatus=${donationStatus}`
      );
      setMyRequest((prevUsers) =>
        prevUsers.map((user) =>
          user._id === _id ? { ...user, donationStatus } : user
        )
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOne = async (id) => {
    try {
      const res = await axiosSecure.delete(`/userRequest/${id}`);
      setMyRequest((prevUsers) => prevUsers.filter((user) => user._id !== id));

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full py-8 h-screen bg-linear-to-r from-red-700/80 to-black/30 px-3">
      <div className="text-center px-4 ">
        <h1
          className="
        text-4xl md:text-5xl font-extrabold italic text-white
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] pt-4
      "
        >
          Welcome to{" "}
          <span className="text-red-300 drop-shadow-[0_2px_8px_rgba(255,0,0,0.6)]">
            BloodCare Dashboard
          </span>
          , <span className="text-red-200">{user?.displayName}!</span>
        </h1>

        <p
          className="
        mt-3 text-lg md:text-xl italic text-gray-100
        drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
      "
        >
          Be the reason someone smiles today ❤️
        </p>
      </div>

      <div className="p-4 bg-base-100 rounded-lg shadow-md ">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          🩸 My Donation Requests
        </h2>

        <div className="lg:hidden space-y-4">
          {MyRequest.length > 0 ? (
            MyRequest.map((req) => (
              <div
                key={req._id}
                className="card bg-base-100 shadow-md border border-red-100"
              >
                <div className="card-body p-4 space-y-2">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-red-600">
                      {req.recipientName}
                    </h2>
                    <span className="badge badge-error">{req.bloodGroup}</span>
                  </div>

                  {/* Info */}
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

                  {/* Status */}
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

                  {/* Donor Info (only in progress) */}
                  {req.donationStatus === "inprogress" && (
                    <div className="bg-gray-100 p-2 rounded-md text-sm">
                      <p className="font-semibold">{req.requesterName}</p>
                      <p>{req.requesterEmail}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {req.donationStatus === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatus("done", req._id)}
                          className="btn btn-success btn-sm"
                        >
                          Done
                        </button>

                        <button
                          onClick={() => handleStatus("cancel", req._id)}
                          className="btn btn-error btn-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    <NavLink
                      to={`/dashboard/donation-request-details-page/${req._id}`}
                      className="btn btn-sm bg-black text-white"
                    >
                      <MdEdit />
                    </NavLink>

                    <NavLink
                      to={`donation-details-page/${req._id}`}
                      className="btn btn-sm bg-green-800 text-white"
                    >
                      Details
                    </NavLink>

                    <button
                      onClick={() => handleDeleteOne(req._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
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
                <th>change Status</th>
                <th>Edit request</th>
                <th> Delete</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {MyRequest.length > 0 ? (
                MyRequest.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium">{req.recipientName}</span>
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
                      {req.donationStatus === "inprogress" && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleStatus(`done`, `${req._id}`)}
                            className="btn p-1 btn-soft btn-success"
                          >
                            done
                          </button>
                          <button
                            onClick={() => handleStatus(`cancel`, `${req._id}`)}
                            className="btn p-1 btn-soft btn-error"
                          >
                            cancel
                          </button>
                        </div>
                      )}
                    </td>

                    <td>
                      <NavLink
                        to={`/dashboard/donation-request-details-page/${req._id}`}
                      >
                        <button className=" p-1 bg-black text-white rounded-2xl">
                          <MdEdit />
                        </button>
                      </NavLink>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteOne(req._id)}
                        type="button"
                        className="btn p-1 btn-error"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <NavLink to={`donation-details-page/${req._id}`}>
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
      <div className="flex justify-center items-center mt-8">
        <NavLink
          to={`/dashboard/my-donation-request`}
          className="btn bg-red-500 text-white "
        >
          View all my donation request
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardHome;
