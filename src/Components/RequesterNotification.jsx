import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext/AuthContext';
import { Bell, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RequesterNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`http://localhost:5000/notifications?email=${user?.email}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    // Optional: Set up a polling interval every 15 seconds to fetch new updates
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [user?.email]);

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
        <Bell className="text-rose-500" size={20} />
        <h2 className="text-lg font-semibold text-slate-800">Updates on Your Requests</h2>
        {notifications.length > 0 && (
          <span className="ml-auto bg-rose-100 text-rose-600 text-xs px-2 py-0.5 rounded-full font-bold">
            {notifications.length}
          </span>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6 italic">No recent updates.</p>
          ) : (
            notifications.map((notif) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/70"
              >
                {/* Dynamic Status Icon */}
                {notif.message.includes('accepted') ? (
                  <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                ) : (
                  <XCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                )}

                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-snug font-medium">
                    {notif.message}
                  </p>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <Calendar size={12} />
                    {new Date(notif.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}