import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import axios from "axios";
import { FaStethoscope } from "react-icons/fa";
import { motion } from "framer-motion";
const Register = () => {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();
  const { SignUpWithEmailPassword, UpdateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
const [selectedDistrictName, setSelectedDistrictName] = useState("");
  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));
  }, []);

const handleFormData = async (data) => {
  try {
    const file = data.photoURL[0];

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      const mainPhotoUrl = res.data.data.display_url;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const formData = {
            name: data.name,
            email: data.email,
            mainPhotoUrl,
            bloodGroup: data.bloodGroup,
            upazila: data.upazila,
           districts: selectedDistrictName,

            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          };

          console.log(formData);
        

          await SignUpWithEmailPassword(
            data.email,
            data.Password
          );

          await UpdateUser({
            displayName: data.name,
            photoURL: mainPhotoUrl,
          });

          await axios.post(
            "http://localhost:5000/user",
            formData
          );

          navigate("/");
        },

        (error) => {
          console.log(error);
          alert("Location permission is required");
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const filteredUpazilas = upazilas.filter(
  (u) => u.district_id === selectedDistrictId
);
  return (
    <div className="w-full lg:w-6xl p-4 lg:p-0 mx-auto flex bg-red-50 rounded-l-4xl">
      {/* Left Info Panel */}
       <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md  py-4">
          <div className="flex flex-col items-center gap-1 ">
            <h1 className="text-2xl font-extrabold text-red-600">Register</h1>
            <p className="text-gray-500 text-center">
              Create your account and join the blood donation community
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormData)} className="flex flex-col gap-2">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                {...registerForm("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300"
              />
            </div>

            {/* Photo */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Photo</label>
              <input
                type="file"
                {...registerForm("photoURL", { required: true })}
                className="input w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                {...registerForm("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                {...registerForm("Password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password must have at least 1 uppercase, 1 lowercase and minimum 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className="input input-bordered w-full focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300"
              />
              {errors.Password && (
                <p className="text-red-500 text-sm">{errors.Password.message}</p>
              )}
            </div>

            {/* Blood Group */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Blood Group</label>
              <select
                {...registerForm("bloodGroup", { required: true })}
                className="select w-full"
              >
                <option value="" disabled>Select blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* Districts */}
   {/* Districts */}
<div className="flex flex-col gap-2">
  <label className="text-gray-700 font-semibold">
    District
  </label>

  <select
    {...registerForm("districts", { required: true })}
    className="select w-full"
    defaultValue=""
    onChange={(e) => {
      const district = districts.find(
        (d) => d.id === e.target.value
      );

      setSelectedDistrictId(district.id);
      setSelectedDistrictName(district.name);
    }}
  >
    <option value="" disabled>
      Select district
    </option>

    {districts.map((d) => (
      <option key={d.id} value={d.id}>
        {d.name}
      </option>
    ))}
  </select>
</div>

           {/* Upazilas */}
<div className="flex flex-col gap-2">
  <label className="text-gray-700 font-semibold">
    Upazila
  </label>

  <select
    {...registerForm("upazila", { required: true })}
    className="select w-full"
  >
    <option value="" disabled selected>
      Select upazila
    </option>

    {filteredUpazilas.map((u) => (
      <option key={u.id} value={u.name}>
        {u.name}
      </option>
    ))}
  </select>
</div>

            <button type="submit" className="btn bg-red-800 hover:bg-red-600 text-white font-bold mt-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              Register
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <NavLink to="/auth/login" className="text-red-500 font-bold hover:underline">
              Sign In
            </NavLink>
          </p>
        </div>
      </div>

        {/* Right Form Panel */}
     <motion.div
  initial={{ x: 120, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
  className="hidden lg:flex w-1/2 flex-col justify-center bg-red-900 text-white p-12 rounded-l-3xl relative overflow-hidden"
> 
        <div className="absolute top-[-50px] left-[-50px] w-60 h-60 opacity-20 animate-stethoscope-spin">
          <FaStethoscope className="w-full h-full text-white" />
        </div>
        <div className="absolute bottom-[-40px] right-[-40px] w-72 h-72 opacity-15 animate-stethoscope-bounce">
          <FaStethoscope className="w-full h-full text-red-300" />
        </div>

        <div className="mb-8 relative z-10">
          <FaStethoscope className="w-16 h-16 mb-4 text-white animate-bounce-slow" />
          <h1 className="text-3xl font-extrabold mb-2">Join Blood Donor</h1>
          <p className="text-red-100">
            Create your account and start saving lives with blood donation.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-6 relative z-10">
          <div className="flex items-center gap-3 bg-red-500/30 p-3 rounded-lg hover:scale-105 transition-transform duration-300">
            <span>🩸</span>
            <p>Donate blood easily</p>
          </div>
          <div className="flex items-center gap-3 bg-red-500/30 p-3 rounded-lg hover:scale-105 transition-transform duration-300">
            <span>🚑</span>
            <p>Receive blood in emergencies</p>
          </div>
          <div className="flex items-center gap-3 bg-red-500/30 p-3 rounded-lg hover:scale-105 transition-transform duration-300">
            <span>🌍</span>
            <p>Connect with donors worldwide</p>
          </div>
        </div>
    </motion.div>

 
     

      {/* Animations */}
      <style>{`
        @keyframes stethoscope-spin {
          0% { transform: rotate(0deg) translateX(0) translateY(0); }
          50% { transform: rotate(45deg) translateX(10px) translateY(10px); }
          100% { transform: rotate(0deg) translateX(0) translateY(0); }
        }
        @keyframes stethoscope-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-stethoscope-spin {
          animation: stethoscope-spin 6s linear infinite;
        }
        .animate-stethoscope-bounce {
          animation: stethoscope-bounce 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;