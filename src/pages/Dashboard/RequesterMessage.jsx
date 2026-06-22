import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, Mail, FileText } from 'lucide-react';

const RequesterMessage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const fetchMessages = async () => {
      try {
        const res = await axiosSecure.get(`/hero-contact?donorEmail=${user.email}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch requester messages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [user?.email, axiosSecure]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading messages...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <MessageSquare className="text-rose-500" />
          Requester Messages
        </h1>
        <p className="text-slate-500 mt-2">People who have contacted you for blood donation.</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
          <MessageSquare size={48} className="mx-auto mb-4 text-slate-300" />
          <h3 className="text-xl font-bold text-slate-700">No Messages Yet</h3>
          <p className="text-slate-500 mt-2">You haven't received any blood requests yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={msg._id}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(225,29,72,0.08)] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <Mail size={16} className="text-rose-400" />
                  {msg.requesterEmail}
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                  <Calendar size={12} />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="bg-rose-50/50 p-4 rounded-2xl mb-4 border border-rose-100/50">
                <p className="text-slate-800 font-medium leading-relaxed">
                  "{msg.requestMessage}"
                </p>
              </div>

              {msg.requestDetails && (
                <div className="flex items-start gap-2 mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <FileText size={16} className="mt-0.5 shrink-0 text-slate-400" />
                  <p>{msg.requestDetails}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequesterMessage;
