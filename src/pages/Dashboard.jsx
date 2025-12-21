import { Outlet } from "react-router";
import {
  FaUser,
  FaUsers,
  FaPlusCircle,
  FaTint,
  FaHome,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import SidebarLink from "../Components/SidebarLink";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Dashboard = () => {
  const { SignOut, role } = useContext(AuthContext);

  const handleLogOut = () => {
    SignOut();
  };

  return (
    <div className="h-screen">
      {/* Mobile Topbar */}
      <div
        className="lg:hidden flex items-center justify-between 
                      bg-linear-to-r from-red-700 to-red-900 
                      text-white px-4 py-3"
      >
        <h1 className="text-lg font-bold flex items-center gap-2">
          <FaTint /> BloodCare
        </h1>
        <label htmlFor="dashboard-drawer" className="cursor-pointer">
          <FaBars size={22} />
        </label>
      </div>

      <div className="drawer lg:drawer-open  h-full">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* Main content */}
        <div className="drawer-content   flex flex-col">
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
            {/* This is where all your routes render */}
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side h-full">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <aside
            className="w-64 h-full 
                            bg-linear-to-b from-red-700 to-red-900 
                            text-white p-5 flex flex-col"
          >
            {/* Logo */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                <FaTint /> BloodCare
              </h1>
              <p className="text-sm opacity-80">Donation Dashboard</p>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-2">
              <SidebarLink
                to="/dashboard"
                icon={<FaHome />}
                label="Dashboard"
              />
              {role == "donor" && (
                <SidebarLink
                  to="/dashboard/add-request"
                  icon={<FaPlusCircle />}
                  label="Add Request"
                />
              )}
              {role == "donor" && (
                <SidebarLink
                  to="/dashboard/my-donation-request"
                  icon={<FaPlusCircle />}
                  label="My Donation Request"
                />
              )}
              {role == "admin" && (
                <SidebarLink
                  to="/dashboard/all-users"
                  icon={<FaUsers />}
                  label="All Users"
                />
              )}
              <SidebarLink
                to="/dashboard/my-profile"
                icon={<FaUser />}
                label="My Profile"
              />
            </nav>

            {/* Footer */}
            <div className="border-t border-white/20 pt-4">
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
