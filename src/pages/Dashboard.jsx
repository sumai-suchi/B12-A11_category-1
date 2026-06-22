import { NavLink, Outlet } from "react-router";
import {
  FaUser,
  FaUsers,
  FaPlusCircle,
  FaTint,
  FaHome,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import SidebarLink from "../Components/ui/SidebarLink"
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import Sidebar from "./Dashboard/Sidebar";

const Dashboard = () => {
  const { SignOut, role ,user} = useContext(AuthContext);
  console.log("role",role,"user", user)

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
       <Sidebar role={role} handleLogOut={handleLogOut}></Sidebar>
        
      </div>
    </div>
  );
};

export default Dashboard;
