import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Calendar, Check, X, Inbox } from 'lucide-react';
import { AuthContext } from '../../AuthContext/AuthContext';
import axios from 'axios';

const MOCK_DATA = [
  {
    _id: "6a381cfe2b03270f35a88195",
    donorId: "6a343ccf5edc6be0a6ad31fc",
    donorEmail: "hazrat@demo.com",
    donorName: "biya hazrat",
    donorBloodGroup: "O-",
    requesterEmail: "katha@demo.com",
    requestMessage: "I need blood for my mother. Please if you can donate blood contact with me as soon as possible.",
    requestDetails: "Ziaur Rahman Medical College, Bogura, phn no: 01790747374",
    status: "pending",
    createdAt: "2026-06-21T17:18:54.116+00:00"
  }
];

export default function PersonalRequest() {
  const [requests, setRequests] = useState(MOCK_DATA);
  const [activeTab, setActiveTab] = useState('pending');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`http://localhost:5000/hero-contact?email=${user?.email}`);
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [user?.email]);

  // Combined PATCH method handles both 'accepted' and 'declined' status updates
  const updateRequestStatus = async (id, newStatus) => {
    try {
      // Sends a PATCH request updating the status configuration in the backend
      const res = await axios.patch(`http://localhost:5000/hero-contact/${id}`, { status: newStatus });
      
      if (res.status === 200 || res.data) {
        // Updates local state UI instantly upon successful database write
        setRequests(prev =>
          prev.map(req => req._id === id ? { ...req, status: newStatus } : req)
        );
      }
    } catch (error) {
      console.log(`Error updating status to ${newStatus}:`, error);
      alert("Failed to update status. Please try again.");
    }
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-2xl mx-auto">
        
        {/* Animated Page Header */}
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            Personal Requests <span className="text-xs font-semibold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full border border-rose-100">{requests[0]?.donorBloodGroup || 'O-'} Feed</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, {requests[0]?.donorName || 'Donor'}. Manage your direct incoming requests below.</p>
          
          {/* Animated Tab Filter */}
          <div className="flex gap-6 mt-6 text-sm border-b border-slate-200/60 relative">
            {['pending', 'accepted', 'declined'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-medium capitalize transition-colors relative ${
                  activeTab === tab ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.header>

        {/* Requests Feed Container */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredRequests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 text-slate-400"
              >
                <Inbox size={32} className="stroke-[1.5] text-slate-300" />
                <p className="text-sm italic">No {activeTab} requests at this time.</p>
              </motion.div>
            ) : (
              filteredRequests.map((request) => (
                <motion.div 
                  key={request._id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md/5 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-rose-500/80 rounded-r" />

                  <div className="flex-1 space-y-3 pl-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold tracking-tight text-indigo-600">
                          Personal Request
                        </h2>
                        <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          From: {request.requesterEmail}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 tabular-nums flex items-center gap-1 shrink-0">
                        <Calendar size={12} />
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                    
                    <div className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-100/70">
                      <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
                        "{request.requestMessage}"
                      </p>
                    </div>
                    
                    <div className="pt-1 space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-start gap-1.5 leading-normal">
                        <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-600">{request.requestDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Layout */}
                  <div className="shrink-0 w-full sm:w-28 pt-1 flex sm:flex-col gap-2">
                    {request.status === 'pending' && (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateRequestStatus(request._id, 'accepted')}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Check size={14} /> Accept
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateRequestStatus(request._id, 'declined')}
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 text-xs font-medium py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                        >
                          <X size={14} /> Decline
                        </motion.button>
                      </>
                    )}

                    {request.status === 'accepted' && (
                      <span className="w-full text-center text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-lg flex items-center justify-center gap-1">
                        <Check size={14} /> Accepted
                      </span>
                    )}

                    {request.status === 'declined' && (
                      <span className="w-full text-center text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                        Declined
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}