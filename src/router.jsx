import { createBrowserRouter } from "react-router";
import RootLayout from "./Layouts/RootLayout";
import Home from "./pages/Home/Home";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./pages/Dashboard";
import AddRequest from "./Components/AddRequest";
import PrivateRoute from "./Components/PrivateRoute";
import AllUser from "./Components/AllUser";
import MyDonationRequest from "./Components/MyDonationRequest";
import DashboardHome from "./Components/DashboardHome";
import RequestDetailsPage from "./Components/RequestDetailsPage";
import DetailsPage from "./Components/DetailsPage";
import Profile from "./Components/Profile";
import AllDonationRequest from "./Components/AllDonationRequest";
import VolSection from "./Components/VolSection";
import SearchDonner from "./Components/SearchDonner";
import DonationRequestBlood from "./Components/DonationRequestBlood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "searchDonner",
        element: <SearchDonner></SearchDonner>,
      },
      {

        path:"DonationRequestBlood",
        element:<DonationRequestBlood></DonationRequestBlood>
      }
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "all-users",
        element: <AllUser></AllUser>,
      },
      {
        path: "my-donation-request",
        element: <MyDonationRequest></MyDonationRequest>,
      },
      {
        path: "donation-request-details-page/:id",
        element: <RequestDetailsPage></RequestDetailsPage>,
      },
      {
        path: "donation-details-page/:id",
        element: <DetailsPage></DetailsPage>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "all-donation-request",
        element: <AllDonationRequest></AllDonationRequest>,
      },
      {
        path: "all-donation-request-volunteer",
        element: <VolSection></VolSection>,
      },
    ],
  },
]);

export default router;
