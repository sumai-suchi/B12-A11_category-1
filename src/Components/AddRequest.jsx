import { useContext, useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      ...formData,
      donationStatus: "pending",
      createdAt: new Date(),
    };

    console.log("Donation Request:", donationRequest);

    try {
      const res = await axiosInstance.post(
        "/blood-donation-request",
        donationRequest
      );
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Donation request added successfully!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-full w-full flex items-center justify-center 
                    bg-linear-to-br from-red-900 via-black to-red-800 
                    px-3 sm:px-6 py-6"
    >
      <div
        className="w-full max-w-4xl 
                      bg-black/50 backdrop-blur-xl 
                      border border-red-500/30 
                      rounded-2xl shadow-2xl 
                      p-4 sm:p-6 md:p-8 
                      text-gray-100"
      >
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-6
                       bg-linear-to-r from-red-400 to-red-600 
                       bg-clip-text text-transparent"
        >
          Blood Donation Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
        >
          {/* Requester Name */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Requester Name
              </span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full 
                         bg-black/60 text-gray-200 
                         border-gray-600"
            />
          </div>

          {/* Requester Email */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Requester Email
              </span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full 
                         bg-black/60 text-gray-200 
                         border-gray-600"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Recipient Name
              </span>
            </label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Enter recipient name"
              required
              className="input input-bordered w-full 
                         bg-black/50 text-gray-100 
                         placeholder-gray-400 
                         border-gray-600 
                         focus:border-red-500"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Blood Group
              </span>
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="select select-bordered w-full 
                         bg-black/50 text-gray-100 
                         border-gray-600 
                         focus:border-red-500"
            >
              <option value="" disabled className="text-white">
                Select Blood Group
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg} className="text-white">
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Recipient District
              </span>
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="select select-bordered w-full 
                         bg-black/50 text-gray-100 
                         border-gray-600 
                         focus:border-red-500"
            >
              <option value="" disabled className="text-white">
                Select District
              </option>
              {districts.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Recipient Upazila
              </span>
            </label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              required
              className="select select-bordered w-full 
                         bg-black/50 text-gray-100 
                         border-gray-600 
                         focus:border-red-500"
            >
              <option value="" disabled className="text-white">
                Select Upazila
              </option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital */}
          <div className="lg:col-span-2">
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Hospital Name
              </span>
            </label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Dhaka Medical College Hospital"
              required
              className="input input-bordered w-full 
                         bg-black/50 text-gray-100 
                         placeholder-gray-400 
                         border-gray-600 
                         focus:border-red-500"
            />
          </div>

          {/* Address */}
          <div className="lg:col-span-2">
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Full Address
              </span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Zahir Raihan Rd, Dhaka"
              required
              className="input input-bordered w-full 
                         bg-black/50 text-gray-100 
                         placeholder-gray-400 
                         border-gray-600 
                         focus:border-red-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Donation Date
              </span>
            </label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              required
              className="input input-bordered w-full 
                         bg-black/50 text-gray-100 
                         border-gray-600 
                         focus:border-red-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Donation Time
              </span>
            </label>
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              required
              className="input input-bordered w-full 
                         bg-black/50 text-gray-100 
                         border-gray-600 
                         focus:border-red-500"
            />
          </div>

          {/* Message */}
          <div className="lg:col-span-2">
            <label className="label">
              <span className="label-text text-gray-200 font-medium">
                Request Message
              </span>
            </label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Explain why blood is needed in detail..."
              className="textarea textarea-bordered w-full 
                         bg-black/50 text-gray-100 
                         placeholder-gray-400 
                         border-gray-600 
                         focus:border-red-500"
            />
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 pt-2">
            <button
              type="submit"
              className="btn w-full 
                         bg-linear-to-r from-red-600 to-red-900 
                         hover:from-red-500 hover:to-black 
                         text-white text-lg 
                         border-none shadow-lg 
                         transition-all duration-300"
            >
              Submit Donation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
