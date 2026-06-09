

import React, { useContext, useEffect, useState } from 'react';
import { MapPin, Droplet, Send } from 'lucide-react'; // Optional: for nice icons
import ChatModal from "../modals/ChatModal";
import { AuthContext } from '../../AuthContext/AuthContext';
import axios from 'axios';

const NearByRearchResult = ({ donors }) => {
         const [openChat, setOpenChat] = useState(false);
         const {user}=useContext(AuthContext);
         console.log(user?.email)
  const [CurrentUser,setCurrentUser]=useState({})
  
  
  useEffect(() => {

  axios
    .get(`http://localhost:5000/user/db?email=${user.email}`)
    .then(res => {
      setCurrentUser(res.data);
    },[user?.email]);

}, [user?.email]);
      if (donors.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100"
      >
        <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
           <Search size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">No Donors Found nearby</h3>
        <p className="text-slate-500">you can see the nearby donors on the map.</p>
      </motion.div>
    );
  }
  return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {donors.map((donor) => (
        <div 
          key={donor._id} 
          className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          {/* Top Decorative Banner */}
          <div className="h-2 bg-red-500" />

          <div className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Profile Image */}
                <img 
                  src={donor.mainPhotoUrl} 
                  alt={donor.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-50"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{donor.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} className="text-red-400" />
                    {donor.upazila}, {donor.districts}
                  </p>
                </div>
              </div>

              {/* Blood Group Badge */}
              <div className="flex flex-col items-center justify-center bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Group</span>
                <span className="text-xl font-black text-red-600">{donor.bloodGroup}</span>
              </div>
            </div>

            <hr className="my-4 border-gray-50" />

            {/* Info Stats */}
            <div className="flex justify-between items-center mb-5">
              <div className="text-center">
                <p className="text-xs text-gray-400 uppercase tracking-tight">Distance</p>
                <p className="font-semibold text-gray-700">{donor.distance.toFixed(2)} km</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 uppercase tracking-tight">Status</p>
                <p className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  ● {donor.status}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group"
              onClick={() => setOpenChat(true)}>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Contact Donor
            </button>
           </div>

             {
        openChat && (
          <ChatModal
            donor={donor}
           CurrentUser={CurrentUser}
            closeModal={() => setOpenChat(false)}
          />
        )
      }
        </div>
      ))}

       
        
    </div>
  );
};

export default NearByRearchResult;