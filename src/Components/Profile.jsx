import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Listbox } from "@headlessui/react";

/* ================= Floating Input ================= */
const FloatingInput = ({ label, name, value, onChange, type = "text", readOnly = false }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      readOnly={readOnly}
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

/* ================= Floating Select ================= */
const FloatingSelect = ({ label, value, setValue, options }) => (
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
    <label className="absolute left-4 top-2 text-sm text-white/80">{label}</label>
  </div>
);

/* ================= Premium Profile Component with Background ================= */
const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/user/role/${user?.email}`);
        setFormData({
          name: res.data.name || "",
          email: res.data.email,
          mainPhotoUrl: res.data.mainPhotoUrl || "",
          bloodGroup: res.data.bloodGroup || "",
          districts: res.data.districts || "",
          upazila: res.data.upazila || "",
          role: res.data.role || "",
          status: res.data.status || "",
          createdAt: res.data.createdAt || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [axiosSecure, user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/update/singleUser?email=${user?.email}`, formData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* ✅ Full Background Image */}
      <img
        src="/BloodDonationImg.png" // replace with your background image path
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* ✅ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50"></div>

      {/* 💎 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">My Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-sm btn-outline btn-error"
            >
              ✏️ Edit
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <motion.img
            src={formData?.mainPhotoUrl || "/default-profile.png"}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-red-300 object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-semibold text-white">{formData?.name}</h2>
            <p className="text-gray-200">{formData?.email}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="badge badge-error">{formData?.bloodGroup}</span>
              <span className="badge badge-info">{formData?.role}</span>
              <span className="badge badge-success">{formData?.status}</span>
            </div>
          </div>
        </div>

        {/* Editable Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <FloatingInput label="Name" name="name" value={formData.name} onChange={handleChange} />
            <FloatingInput label="Email" name="email" value={formData.email} readOnly />
            <FloatingInput label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
            <FloatingInput label="District" name="districts" value={formData.districts} onChange={handleChange} />
            <FloatingInput label="Upazila" name="upazila" value={formData.upazila} onChange={handleChange} />
            <FloatingInput label="Photo URL" name="mainPhotoUrl" value={formData.mainPhotoUrl} onChange={handleChange} />

            <FloatingSelect
              label="Role"
              value={formData.role}
              setValue={(val) => setFormData({ ...formData, role: val })}
              options={["user", "moderator", "admin"]}
            />

            <FloatingSelect
              label="Status"
              value={formData.status}
              setValue={(val) => setFormData({ ...formData, status: val })}
              options={["active", "inactive", "blocked"]}
            />

            <FloatingInput label="Joined At" name="createdAt" value={formData.createdAt} readOnly />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg"
            >
              Save Changes
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;