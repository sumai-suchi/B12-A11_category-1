import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AuthLayout = () => {
const location = useLocation();

  const path = location.pathname; // "/auth/register"
  const segment = path.split("/")[2]; // "register"
  return (
    <div className="min-h-screen p-12 ">
    
        <Navbar segment={segment}></Navbar>
     
        <div className="py-24">
          <Outlet></Outlet>
        </div>
      <Footer> </Footer>
    </div>
  );
};

export default AuthLayout;
