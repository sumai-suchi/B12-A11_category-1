import { Outlet } from "react-router";
import Navbar from "../Components/layout/Navbar"
import Footer from "../Components/layout/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
