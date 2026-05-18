import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const Navbar = ({segment}) => {
  const { user, SignOut } = useContext(AuthContext);

  const linkStyles = ({ isActive }) => 
    `group relative text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-500 ${
      isActive ? "text-red-600" : "text-white/50 hover:text-white"
    } `;

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
        <nav className={`hidden md:flex bg-red-800  backdrop-blur-3xl border border-white/5 rounded-full px-10 py-4 gap-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${segment === "register" || segment === "login" ? " bg-red-800" : ""}`}>
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

        {/* --- RIGHT: USER INTERFACE --- */}
        <div className="flex items-center gap-4">
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
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="relative group cursor-pointer">
                <div className="w-12 h-12 border-2 border-red-600/20 group-hover:border-red-600 rounded-full p-1 transition-all duration-500">
                  <img
                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    src={user?.photoURL || "https://i.pravatar.cc/150"}
                    alt="user"
                  />
                </div>
                {/* Notification dot */}
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-black" />
              </label>

              <ul tabIndex={0} className="dropdown-content mt-4 w-72 bg-[#0a0a0a] border border-white/10 p-0 overflow-hidden shadow-2xl">
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;