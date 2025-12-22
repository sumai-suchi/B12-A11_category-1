import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen p-12 bg-gradient-to-br from-red-600 via-red-500 to-rose-500">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
