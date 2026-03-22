import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaHeartbeat } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // fixed import
import { AuthContext } from "../AuthContext/AuthContext";
import { FaStethoscope } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const { SignIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleFormData = (data) => {
    console.log(data);

    SignIn(data?.email, data?.Password)
      .then((res) => {
        console.log(res?.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error); // fixed error handling
      });
  };

  return (
    <div className="w-full lg:w-6xl mx-auto  flex bg-red-50">
      {/* Left Side - Info Panel */}
     <motion.div
  initial={{ x: -120, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.5, ease: "easeIn" }}
  className="hidden lg:flex w-1/2 flex-col justify-center bg-red-900 text-white  p-12 rounded-l-3xl relative overflow-hidden"
>
  {/* Animated Stethoscope Background */}
  <div className="absolute top-[-50px] left-[-50px] w-60 h-60 opacity-20 animate-stethoscope-spin">
    <FaStethoscope className="w-full h-full text-white" />
  </div>
  <div className="absolute -bottom-10 -right-10 w-72 h-72 opacity-15 animate-stethoscope-bounce">
    <FaStethoscope className="w-full h-full text-red-300" />
  </div>

  {/* Main Content */}
  <div className="mb-8 relative z-10">
    <FaStethoscope className="w-16 h-16 mb-4 text-white animate-bounce-slow" />
    <h1 className="text-3xl font-extrabold mb-2">Welcome to Blood Donor</h1>
    <p className="text-red-100">
      Join the community and save lives with blood donation.
    </p>
  </div>

  {/* Features */}
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

  {/* Stats Box */}
  <div className="mt-auto bg-white/20 p-4 rounded-xl w-40 text-center text-white relative z-10">
    <p className="text-xs">Total Donations</p>
    <p className="text-2xl font-bold">128</p>
    <p className="text-xs text-green-300">+15% this month</p>
  </div>
   </motion.div>
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-2 lg:p-8">
        <div className="w-full max-w-md  rounded-3xl p-2 lg:p-10 ">
          <div className="flex flex-col items-center gap-4 mb-8">
            <h1 className="text-2xl font-extrabold text-red-600">Sign In</h1>
            <p className="text-gray-500 text-center">
              Welcome back — we missed you!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleFormData)}
            className="flex flex-col gap-2 lg:gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                {...register("Password", { required: true })}
                placeholder="Enter your password"
                className="input input-bordered w-full focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <NavLink
                to="/auth/forgot"
                className="text-red-500 hover:underline"
              >
                Forgot password?
              </NavLink>
            </div>

            <button className="btn bg-red-800 hover:bg-red-600 text-white font-bold mt-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              Sign In
            </button>
          </form>

          {/* OAuth Buttons */}
          <div className="flex items-center my-4 text-gray-400">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="btn btn-outline w-full mb-2">
            Continue with Google
          </button>
          <button className="btn btn-outline w-full">
            Continue with GitHub
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-500 mt-6">
            New here?{" "}
            <NavLink
              to="/auth/register"
              className="text-red-500 font-bold hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>

      {/* Animations */}
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

export default Login;