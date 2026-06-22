import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTint, FaHome, FaPlusCircle, FaHeartbeat, 
  FaHistory, FaInbox, FaUsers, FaClipboardList, 
  FaUser, FaSignOutAlt 
} from 'react-icons/fa';

export default function Sidebar({ role, handleLogOut }) {
  return (
    <div className="drawer-side h-full z-40">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-64 h-full bg-slate-900 text-slate-200 p-6 flex flex-col border-r border-slate-800 antialiased shadow-xl">
        
        {/* Elegant Brand Header */}
        <div className="mb-10 text-center pb-6 border-b border-slate-800/60">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center justify-center gap-2.5">
            <span className="p-2 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
              <FaTint className="animate-pulse" />
            </span>
            BloodCare
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-medium tracking-wide uppercase">Donation Workspace</p>
        </div>

        {/* Intuitive Navigation Menu */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          <SidebarLink
            to="/dashboard"
            icon={<FaHome size={16} />}
            label="Dashboard"
          />

          {/* Donor Links */}
          {role === "donor" && (
            <>
              <SidebarLink
                to="/dashboard/add-request"
                icon={<FaPlusCircle size={16} />}
                label="Add Request"
              />
              <SidebarLink
                to="/dashboard/my-donation-request"
                icon={<FaClipboardList size={16} />}
                label="My Requests"
              />
              <SidebarLink
                to="/dashboard/donation-eligibility"
                icon={<FaHeartbeat size={16} />}
                label="Eligibility Check"
              />
              <SidebarLink
                to="/dashboard/donation-history"
                icon={<FaHistory size={16} />}
                label="Donation History"
              />
              <SidebarLink
                to="/dashboard/personal-requests"
                icon={<FaInbox size={16} />}
                label="Personal Requests"
              />
            </>
          )}

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <SidebarLink
                to="/dashboard/all-users"
                icon={<FaUsers size={16} />}
                label="All Users"
              />
              <SidebarLink
                to="/dashboard/all-donation-request"
                icon={<FaClipboardList size={16} />}
                label="All Requests Management"
              />
            </>
          )}

          {/* Volunteer Links */}
          {role === "volunteer" && (
            <SidebarLink
              to="/dashboard/all-donation-request-volunteer"
              icon={<FaClipboardList size={16} />}
              label="Volunteer Feed"
            />
          )}

          {/* Shared Profile Link */}
          <div className="pt-4 mt-4 border-t border-slate-800/60">
            <SidebarLink
              to="/dashboard/profile"
              icon={<FaUser size={16} />}
              label="My Profile"
            />
          </div>
        </nav>

        {/* Polished Action Footer */}
        <div className="border-t border-slate-800/80 pt-4 space-y-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition duration-200"
          >
            <span>🏠</span> Go Home
          </NavLink>
          
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition duration-200"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}

// Beautiful Custom Active-State Helper Wrapper
function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) => `
        flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-rose-600 text-white shadow-md shadow-rose-900/20 font-semibold' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}