import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen p-12 ">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
