import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../AuthContext/AuthContext";

const AllUser = () => {
  const { user: newUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [allUsers, setAllUsers] = useState([]);
  const [recentUser, setRecentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [usersRes, roleRes] = await Promise.all([
          axiosSecure.get("/user-all"),
          newUser?.email ? axiosSecure.get(`/user/role/data/${newUser.email}`) : Promise.resolve({ data: {} })
        ]);
        
        setAllUsers(usersRes.data);
        if (roleRes.data) setRecentUser(roleRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [newUser?.email, axiosSecure]);

  const handleChangeStatus = async (email, status) => {
    try {
      await axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`);
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.email === email ? { ...user, status } : user))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRoleChange = async (email, role) => {
    try {
      await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.email === email ? { ...user, role } : user))
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-red-400 opacity-75"></div>
          <span className="loading loading-spinner w-12 text-red-600 relative z-10"></span>
        </div>
        <p className="text-gray-500 font-medium tracking-wider animate-pulse">Loading Premium Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      
      {/* Header Section with dynamic counters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <span className="inline-flex items-center justify-center bg-red-100 text-red-600 p-2.5 rounded-2xl shadow-inner animate-bounce duration-1000">
              🩸
            </span>
            User Universe
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage platform credentials, authorization levels, and accounts securely.</p>
        </div>
        <div className="stats shadow-sm bg-white border border-gray-100 rounded-2xl px-4 py-1">
          <div className="stat p-2 flex flex-col items-end">
            <div className="stat-title text-xs font-semibold uppercase tracking-wider text-gray-400">Total Curated</div>
            <div className="stat-value text-2xl font-black text-red-600">{allUsers.length} Users</div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW (HIGH-END NEUMORPHIC CARDS) ================= */}
      <div className="grid grid-cols-1 gap-6 block md:hidden">
        {allUsers.map((user) => (
          <div 
            key={user.email} 
            className="group relative bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(239,68,68,0.08)] border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-4">
              <div className="avatar relative">
                <div className="w-16 h-16 rounded-2xl ring-2 ring-red-400/30 ring-offset-2 transition-all duration-500 group-hover:scale-105 group-hover:ring-red-500">
                  <img src={user.mainPhotoUrl || "https://placehold.co/150"} alt={user.name} className="object-cover" />
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-lg text-slate-800 tracking-tight group-hover:text-red-600 transition-colors duration-200">{user.name}</h3>
                <p className="text-xs text-gray-400 font-medium break-all">{user.email}</p>
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">Blood Group</span>
                <span className="font-black text-base text-red-600 inline-flex items-center gap-1">
                  🔴 {user.bloodGroup || "N/A"}
                </span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">Location</span>
                <span className="font-semibold text-xs text-slate-700 block truncate">{user.upazila}, {user.districts}</span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Authorization</span>
                <span className="badge badge-sm font-bold bg-indigo-50 text-indigo-600 border-indigo-100 capitalize px-2.5 py-2">{user.role}</span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Status</span>
                <span className={`badge badge-sm font-bold border-none px-2.5 py-2 uppercase tracking-wider ${
                  user.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600 animate-pulse"
                }`}>
                  {user.status}
                </span>
              </div>
            </div>

            {/* Responsive Actions Row */}
            <div className="flex items-center gap-3 pt-4 mt-2 border-t border-gray-50">
              <button
                className={`btn btn-sm flex-1 font-bold rounded-xl border transition-all duration-300 ${
                  user.status === "active" 
                    ? "bg-white border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 shadow-sm" 
                    : "bg-emerald-600 text-white border-none hover:bg-emerald-700 shadow-md shadow-emerald-200"
                }`}
                onClick={() => handleChangeStatus(user.email, user.status === "active" ? "blocked" : "active")}
              >
                {user.status === "active" ? "🛑 Block" : "⚡ Activate"}
              </button>

              {(recentUser?.role === "admin" || recentUser?.role === "volunteer") && (
                <div className="dropdown dropdown-top dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm bg-slate-900 text-white rounded-xl hover:bg-slate-800 px-4">
                    Promote ⚙️
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-white rounded-2xl w-44 z-50 border border-slate-100 mb-2 animate-fade-in-up">
                    <li className="menu-title text-[10px] uppercase font-bold tracking-widest text-slate-400 p-2">Assign Role</li>
                    <li><button className="rounded-xl font-medium text-slate-700 active:bg-red-50" onClick={() => handleRoleChange(user.email, "volunteer")}>Volunteer</button></li>
                    <li><button className="rounded-xl font-medium text-slate-700 active:bg-red-50" onClick={() => handleRoleChange(user.email, "admin")}>Admin</button></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW (PREMIUM GLOSS GRID VISUAL) ================= */}
      <div className="hidden md:block overflow-hidden bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-300">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white/90 uppercase tracking-wider text-xs font-bold border-none">
              <th className="py-5 pl-8 rounded-tl-3xl">Identity profile</th>
              <th className="py-5">Blood metrics</th>
              <th className="py-5">Geographic node</th>
              <th className="py-5">Role clearance</th>
              <th className="py-5">Status state</th>
              <th className="py-5 pr-8 text-center rounded-tr-3xl">Systems Override</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allUsers.map((user) => (
              <tr key={user.email} className="group hover:bg-slate-50/70 transition-all duration-200">
                <td className="py-4 pl-8">
                  <div className="flex items-center gap-4">
                    <div className="avatar relative">
                      <div className="w-12 h-12 rounded-2xl ring-2 ring-red-100 ring-offset-1 overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:ring-red-400">
                        <img src={user.mainPhotoUrl || "https://placehold.co/150"} alt={user.name} className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-800 text-base tracking-tight group-hover:text-red-600 transition-colors duration-150">{user.name}</p>
                      <p className="text-xs text-gray-400 font-medium tracking-wide">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center justify-center font-black text-sm bg-rose-50 text-rose-600 rounded-xl px-3 py-1.5 border border-rose-100 shadow-sm shadow-rose-100/50">
                    {user.bloodGroup || "N/A"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="text-slate-700 font-medium text-sm max-w-[200px] truncate">
                    <span className="text-slate-400 text-xs block font-normal uppercase tracking-wider">Upazila / District</span>
                    {user.upazila}, <span className="text-slate-400 font-normal">{user.districts}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="badge font-bold capitalize px-3 py-2.5 bg-indigo-50 border-indigo-100 text-indigo-600 rounded-xl text-xs">
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full relative ${user.status === "active" ? "bg-emerald-500" : "bg-rose-500"}`}>
                      {user.status !== "active" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${user.status === "active" ? "text-emerald-600" : "text-rose-600"}`}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 pr-8">
                  <div className="flex items-center justify-center gap-2.5">
                    {/* Operational Action Switch */}
                    <button
                      className={`btn btn-xs h-9 rounded-xl font-bold border px-4 tracking-wide shadow-sm transition-all duration-300 transform active:scale-95 ${
                        user.status === "active" 
                          ? "bg-white border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600" 
                          : "bg-emerald-600 text-white border-none hover:bg-emerald-700"
                      }`}
                      onClick={() => handleChangeStatus(user.email, user.status === "active" ? "blocked" : "active")}
                    >
                      {user.status === "active" ? "Block Account" : "Authorize"}
                    </button>

                    {/* Role Elevation Dropdown */}
                    {(recentUser?.role === "admin" || recentUser?.role === "volunteer") && (
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-xs h-9 bg-slate-100 border-none text-slate-700 rounded-xl hover:bg-slate-200 px-3 tracking-wide transform active:scale-95">
                          Modify ⚙️
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-white rounded-2xl w-40 z-50 border border-slate-100 mt-1">
                          <li className="menu-title text-[10px] uppercase font-bold tracking-widest text-slate-400 p-2">Elevate To</li>
                          <li>
                            <button className="rounded-xl font-medium text-slate-700 text-xs py-2 hover:bg-slate-50" onClick={() => handleRoleChange(user.email, "volunteer")}>Volunteer</button>
                          </li>
                          <li>
                            <button className="rounded-xl font-medium text-slate-700 text-xs py-2 hover:bg-slate-50" onClick={() => handleRoleChange(user.email, "admin")}>Admin</button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;