import { Outlet } from "react-router";
import {
  FaUser,
  FaUsers,
  FaPlusCircle,
  FaTint,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import SidebarLink from "../Components/SidebarLink";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <aside className="w-64 min-h-screen bg-linear-to-b from-red-600 to-red-800 text-white p-5">
          {/* Logo */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
              <FaTint /> BloodCare
            </h1>
            <p className="text-sm opacity-80">Donation Dashboard</p>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <SidebarLink to="/dashboard" icon={<FaHome />} label="Dashboard" />
            <SidebarLink
              to="/dashboard/add-request"
              icon={<FaPlusCircle />}
              label="Add Request"
            />
            <SidebarLink
              to="/dashboard/all-users"
              icon={<FaUsers />}
              label="All Users"
            />
            <SidebarLink
              to="/dashboard/my-profile"
              icon={<FaUser />}
              label="My Profile"
            />
          </nav>

          {/* Footer */}
          <div className="mt-10 border-t border-white/20 pt-4">
            <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-white/20 transition">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </aside>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
