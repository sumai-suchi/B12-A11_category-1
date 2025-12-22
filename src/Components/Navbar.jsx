import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const Navbar = () => {
  const { user, SignOut } = useContext(AuthContext);

  const handleSignOut = () => {
    SignOut();
  };
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/donation-requests">Donation Requests</NavLink>
            </li>

            {user && (
              <li>
                <NavLink to="/funding">Funding</NavLink>
              </li>
            )}

            {!user ? (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleSignOut}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="text-xl font-bold text-red-600">BloodCare</span>
        </NavLink>
      </div>

      {/* Center Section (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <NavLink to="/donation-requests">Donation Requests</NavLink>
          </li>

          {user && (
            <li>
              <NavLink to="/funding">Funding</NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-2">
        {!user ? (
          <NavLink to="/login" className="btn btn-sm btn-error text-white">
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-red-400 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/PZqXd0qh/student-with-book-pen-library.png"
                  }
                  alt="user"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="px-3 py-1 text-sm text-gray-500">
                {user?.displayName || "User"}
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleSignOut} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
