import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/userRequest/${id}`);
        setFormData({
          requesterName: res.data.requesterName || "",
          requesterEmail: res.data.requesterEmail || "",
          recipientName: res.data.recipientName || "",
          district: res.data.district || "",
          upazila: res.data.upazila || "",
          hospitalName: res.data.hospitalName || "",
          address: res.data.address || "",
          bloodGroup: res.data.bloodGroup || "",
          donationDate: res.data.donationDate || "",
          donationTime: res.data.donationTime || "",
          requestMessage: res.data.requestMessage || "",
          createdAt: res.data.createdAt || "",
          donationStatus: res.data.donationStatus || "pending",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [axiosSecure, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(
        `/update/singleUserRequest/${id}`,
        formData
      );
      console.log(res.data);
      alert("Donation request updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update request.");
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "/BloodDonationImg.png",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-5xl p-8 lg:p-12"
      >
        <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
          Edit Blood Donation Request
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Requester Name</label>
            <input
              type="text"
              name="requesterName"
              value={formData?.requesterName}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Requester Email</label>
            <input
              type="email"
              name="requesterEmail"
              value={formData?.requesterEmail}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData?.bloodGroup}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option disabled>Select blood group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (bg) => (
                  <option key={bg}>{bg}</option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              value={formData?.recipientName}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData?.district}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Upazila</label>
            <input
              type="text"
              name="upazila"
              value={formData?.upazila}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Hospital</label>
            <input
              type="text"
              name="hospitalName"
              value={formData?.hospitalName}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData?.address}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={formData?.donationDate}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={formData?.donationTime}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Donation Status</label>
            <select
              name="donationStatus"
              value={formData?.donationStatus}
              onChange={handleChange}
              className="select select-bordered"
            >
              {["pending", "inprogress", "done", "cancel"].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label className="font-semibold mb-2">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData?.requestMessage}
            onChange={handleChange}
            rows={5}
            placeholder="Explain why blood is needed in detail..."
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-error btn-lg">
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestDetailsPage;