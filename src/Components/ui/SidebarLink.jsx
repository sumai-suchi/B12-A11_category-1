import { NavLink } from "react-router";

const SidebarLink = ({ to, icon, label }) => {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition 
      ${isActive ? "bg-white text-red-700 font-semibold" : "hover:bg-white/20"}`
        }
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
