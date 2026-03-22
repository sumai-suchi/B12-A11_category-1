import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import { motion } from "framer-motion";
import { Listbox } from "@headlessui/react";

/* ================= Floating Input ================= */
const FloatingInput = ({ label, name, value, onChange, type = "text", readOnly = false }) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={!readOnly}
        readOnly={readOnly}
        placeholder=" "
        className="peer w-full p-4 pt-6 rounded-xl bg-white/20 border border-white/40 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
      />
      <label className="absolute left-4 top-2 text-sm text-white/80 transition-all 
        peer-placeholder-shown:top-4 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-white/60
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-white">
        {label}
      </label>
    </div>
  );
};

/* ================= Floating Select ================= */
const FloatingSelect = ({ label, value, setValue, options }) => {
  return (
    <div className="relative">
      <Listbox value={value} onChange={setValue}>
        <div className="relative">
          <Listbox.Button className="w-full p-4 pt-6 rounded-xl bg-white/20 border border-white/40 text-white text-left">
            {value || label}
          </Listbox.Button>

          <Listbox.Options className="absolute mt-2 w-full bg-white rounded-xl shadow-lg max-h-60 overflow-auto z-50">
            {options.map((opt, i) => (
              <Listbox.Option
                key={i}
                value={opt}
                className="cursor-pointer px-4 py-2 text-black hover:bg-red-100"
              >
                {opt}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <label className="absolute left-4 top-2 text-sm text-white/80">
        {label}
      </label>
    </div>
  );
};

/* ================= Main Component ================= */
const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

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
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas));
    axios.get("/districts.json").then(res => setDistricts(res.data.districts));
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

    try {
      const res = await axiosSecure.post("/blood-donation-request", donationRequest);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Request Added!",
          text: "Blood donation request submitted successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* ✅ Static Background */}
      <img
        src="/BloodDonationImg.png"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50"></div>

      {/* 💎 Glass Form */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Blood Donation Request
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* User Info */}
          <FloatingInput label="Requester Name" value={user?.displayName || ""} readOnly />
          <FloatingInput label="Requester Email" value={user?.email || ""} readOnly />

          {/* Inputs */}
          <FloatingInput
            label="Recipient Name"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
          />

          <FloatingSelect
            label="Blood Group"
            value={formData.bloodGroup}
            setValue={(val) => setFormData({ ...formData, bloodGroup: val })}
            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
          />

          <FloatingSelect
            label="District"
            value={formData.district}
            setValue={(val) => setFormData({ ...formData, district: val })}
            options={districts.map(d => d.name)}
          />

          <FloatingSelect
            label="Upazila"
            value={formData.upazila}
            setValue={(val) => setFormData({ ...formData, upazila: val })}
            options={upazilas.map(u => u.name)}
          />

          <FloatingInput
            label="Hospital Name"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
          />

          <FloatingInput
            label="Full Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <FloatingInput
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            label="Donation Date"
          />

          <FloatingInput
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            label="Donation Time"
          />

          {/* Message */}
          <div className="md:col-span-2 relative">
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows={4}
              placeholder=" "
              className="peer w-full p-4 pt-6 rounded-xl bg-white/20 border border-white/40 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
            />
            <label className="absolute left-4 top-2 text-sm text-white/80 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/60 peer-focus:top-2 peer-focus:text-sm">
              Request Message
            </label>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg"
          >
            Submit Request
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddRequest;