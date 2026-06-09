
import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Search, Droplet, MapPin, Heart, Users, Activity } from 'lucide-react';
import DonorResults from  "../../Components/shared/DonorResults"
import NearByRearchResult from "../../Components/shared/NearByRearchResult"

const SearchDonner = () => {
  const [bloodGroup, setBloodGroup] = useState("");
const [districts, setDistricts] = useState("");
const [donors, setDonors] = useState([]);
const [loading, setLoading] = useState(false);
const [nearbyDonors, setNearbyDonors] = useState([]);

const handleSearch = async () => {
  setLoading(true);
 
console.log("Searching for donors with:", { bloodGroup, districts });
  try {
    const query = new URLSearchParams({
      bloodGroup,
      districts,
    }).toString();

    const res = await fetch(`http://localhost:5000/donors/search?${query}`);
    console.log("API Response:", res);
    const data = await res.json();

    setDonors(data);
  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};
const findNearbyDonors = () => {
     
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("User location:", { lat, lng });

  

      const res = await fetch(
        `http://localhost:5000/nearby-donors?lat=${lat}&lng=${lng}&bloodGroup=${encodeURIComponent(bloodGroup)}`
      );

      const data = await res.json();

      setNearbyDonors(data);
    },

    (error) => {
      console.log(error);
    }
  );
};
  return (
    <div className="min-h-screen bg-[#fff5f5] pt-24 text-slate-800 font-sans selection:bg-red-200">
      {/* Soft Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-rose-100 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Heart size={16} fill="currentColor" />
            <span>Join 10,000+ Daily Donors</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Find a Match, <span className="text-rose-600">Save a Life.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Connecting heroes with those in need. Search by blood group and location with real-time availability.
          </p>
        </motion.div>

        {/* 3D Search Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ perspective: 1000, rotateX: 1 }}
          className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(225,29,72,0.1)] transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            {/* Blood Type Picker */}
            <div className="md:col-span-4 space-y-3">
              <label className="flex items-center text-sm font-bold text-slate-600 ml-1 italic uppercase tracking-wider">
                <Droplet className="w-4 h-4 mr-2 text-rose-500" /> Need Blood Group
              </label>
              <div className="relative group">
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  required
                 className="w-full bg-slate-50 border-2 border-slate-100 hover:border-rose-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-rose-100 outline-none transition-all appearance-none cursor-pointer text-slate-700 font-medium">
                  <option>Select Group</option>
                  <option>A+</option>
                  <option>O-</option>
                  <option>B+</option>
                  <option>O+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ↓
                </div>
              </div>
            </div>

            {/* Location Input */}
            <div className="md:col-span-5 space-y-3">
              <label className="flex items-center text-sm font-bold text-slate-600 ml-1 italic uppercase tracking-wider">
                <MapPin className="w-4 h-4 mr-2 text-rose-500" /> Districts
              </label>
              <input 
                type="text" 
                placeholder="e.g. New York, NY" 
                value={districts}
                onChange={(e) => setDistricts(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 hover:border-rose-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-700 font-medium"
              />
            </div>

            {/* Search Buttons */}
<div className="md:col-span-3 flex flex-col gap-3">
  
  {/* Find Donor */}
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={handleSearch}
    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300"
  >
    <Search className="w-5 h-5" />
    Find Donor
  </motion.button>

  {/* Find Nearby Donors */}
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={findNearbyDonors}
    className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300"
  >
    <span>📍</span>
    Find Donors Near Me
  </motion.button>

</div>
            
          </div>

          {/* Eye-Soothing Trust Badges */}
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-8 opacity-70">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><Activity size={16}/></div>
              100% Verified
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><Users size={16}/></div>
              Privacy Protected
            </div>
          </div>
        </motion.div>

        {/* <div className="mt-12">
  {loading ? (
    <p className="text-center text-gray-500">Searching donors...</p>
  ) : donors.length === 0 ? (
    <p className="text-center text-red-400 font-semibold">
      No donors found 😔
    </p>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">
      {donors.map((donor) => (
        <div
          key={donor._id}
          className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-800">
              {donor.name}
            </h2>
            <span className="text-rose-600 font-bold text-lg">
              {donor.bloodGroup}
            </span>
          </div>

          <p className="text-slate-500 mb-2">
            📍 {donor.upazila}, {donor.district}
          </p>

          <div className="flex gap-3 mb-4">
            {donor.isAvailable && (
              <span className="text-green-600 text-sm font-semibold">
                🟢 Available
              </span>
            )}
            {donor.isVerified && (
              <span className="text-blue-600 text-sm font-semibold">
                ✔ Verified
              </span>
            )}
          </div>

          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl font-semibold">
            Contact Donor
          </button>
        </div>
      ))}
    </div>
  )}
</div> */}
   <DonorResults donors={donors} loading={loading} />
   {
     nearbyDonors.length > 0 && (
       <NearByRearchResult donors={nearbyDonors} />
     )
   }

  
     
        {/* Visual Decoration Footer */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-6 rounded-3xl bg-white/40 border border-white text-center">
              <p className="text-3xl font-bold text-rose-600">2 min</p>
              <p className="text-slate-500 text-sm uppercase font-bold tracking-tighter">Fast Response</p>
           </div>
           <div className="p-6 rounded-3xl bg-white/40 border border-white text-center">
              <p className="text-3xl font-bold text-rose-600">24/7</p>
              <p className="text-slate-500 text-sm uppercase font-bold tracking-tighter">Support Available</p>
           </div>
           <div className="p-6 rounded-3xl bg-white/40 border border-white text-center">
              <p className="text-3xl font-bold text-rose-600">Free</p>
              <p className="text-slate-500 text-sm uppercase font-bold tracking-tighter">No Service Fees</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonner;