import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Bell, CheckCircle, XCircle, Calendar, MessageSquare } from "lucide-react";
import axios from "axios";

const Navbar = ({ segment }) => {
  const { user, SignOut } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Fetch notifications for the logged-in requester
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`http://localhost:5000/notifications?email=${user?.email}`);
        
        // CRITICAL FIX: Always ensure data is an array before setting state
        if (res.data && Array.isArray(res.data)) {
          setNotifications(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          // Fallback if your backend wraps it in a data object
          setNotifications(res.data.data);
        } else {
          // Safe fallback if user has no notifications or database is clear
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching navbar notifications:", error);
        // Fallback on request failure to prevent continuous application crashing
        setNotifications([]);
      }
    };

    fetchNotifications();
    // Long-poll or fetch new updates every 20 seconds
    const interval = setInterval(fetchNotifications, 20000);
    return () => clearInterval(interval);
  }, [user?.email]);

  const linkStyles = ({ isActive }) =>
    `group relative text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-500 ${
      isActive ? "text-red-600" : "text-white/50 hover:text-white"
    } `;

  // Helper to safely format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="flex justify-between items-start p-6 md:p-8 pointer-events-auto">
        
        {/* --- LEFT: BRANDING --- */}
        <div className="flex flex-col gap-1">
          <NavLink to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <span className="text-red-800">BlOoDCaRe</span>
          </NavLink>
          <div className="h-[1px] w-full bg-gradient-to-r from-red-600 to-transparent" />
          <span className="text-[8px] uppercase tracking-[0.5em] text-white/30 font-bold">
            Life Network v3.0
          </span>
        </div>

        {/* --- CENTER: DECONSTRUCTED MENU --- */}
        <nav className={`hidden md:flex bg-red-800 backdrop-blur-3xl border border-white/5 rounded-full px-10 py-4 gap-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${segment === "register" || segment === "login" ? " bg-red-800" : ""}`}>
          <NavLink to="/" className={linkStyles}>
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full" />
          </NavLink>
          <NavLink to="/DonationRequestBlood" className={linkStyles}>
            Requests
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full" />
          </NavLink>
          {user && (
            <NavLink to="/Donate" className={linkStyles}>
              Funding
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full" />
            </NavLink>
          )}
          <NavLink to="/searchDonner" className={linkStyles}>
            Search
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full" />
          </NavLink>
          <NavLink to="/about-page" className={linkStyles}>
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full" />
          </NavLink>
        </nav>

        {/* --- RIGHT: USER INTERFACE & NOTIFICATIONS --- */}
        <div className="flex items-center gap-6">
          {!user ? (
            <div className="flex flex-col items-end gap-1">
              <NavLink to="/auth/login" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-red-600 transition-colors">
                Auth // Login
              </NavLink>
              <NavLink to="/auth/register" className="text-[10px] font-black uppercase tracking-widest text-red-600 animate-pulse">
                _Join.now
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4 relative">
              
              {/* NOTIFICATION HUB BELL */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-full text-white/70 hover:text-red-500 transition-all duration-300 relative focus:outline-none"
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-black tabular-nums">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* NOTIFICATIONS DROPDOWN PANEL */}
                {showNotifDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                    
                    <div className="absolute right-0 mt-4 w-80 bg-[#0a0a0a] border border-white/10 shadow-2xl z-50 overflow-hidden max-h-[420px] flex flex-col">
                      <div className="p-4 bg-gradient-to-br from-red-950/40 to-transparent border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/80 flex items-center gap-2">
                          <MessageSquare size={12} className="text-red-600" /> Live Feed Updates
                        </span>
                        <span className="text-[9px] font-mono text-white/40">{notifications.length} alert(s)</span>
                      </div>

                      <div className="overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-white/30 text-[11px] uppercase tracking-wider italic font-medium">
                            No recent transmission updates.
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            const isAccepted = notif.message?.toLowerCase().includes("accepted");
                            return (
                              <div key={notif._id} className="p-4 bg-neutral-950/30 hover:bg-white/[0.02] transition-colors flex gap-3 items-start">
                                {isAccepted ? (
                                  <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                ) : (
                                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1 space-y-1">
                                  <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                                    {notif.message}
                                  </p>
                                  <span className="text-[9px] text-white/30 font-mono flex items-center gap-1">
                                    <Calendar size={10} /> {formatDate(notif.createdAt)}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* USER PROFILE DROPDOWN */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="relative group cursor-pointer">
                  <div className="w-12 h-12 border-2 border-red-600/20 group-hover:border-red-600 rounded-full p-1 transition-all duration-500">
                    <img
                      className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      src={user?.photoURL }
                      alt="user"
                    />
                  </div>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-black" />
                  )}
                </label>

                <ul tabIndex={0} className="dropdown-content mt-4 w-72 bg-[#0a0a0a] border border-white/10 p-0 overflow-hidden shadow-2xl z-50">
                  <div className="p-6 bg-gradient-to-br from-red-900/20 to-transparent">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1">Authenticated Account</p>
                    <p className="text-xl font-black text-white truncate uppercase">{user?.displayName || "Operator"}</p>
                  </div>
                  <div className="p-2 flex flex-col">
                    <NavLink to="/dashboard" className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/5 hover:text-white transition-all">
                      Access Dashboard
                    </NavLink>
                    <button 
                      onClick={() => SignOut()} 
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all text-left"
                    >
                      Terminate Session
                    </button>
                  </div>
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;