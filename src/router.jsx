import { createBrowserRouter } from "react-router";
import RootLayout from "./Layouts/RootLayout";
import Home from "./pages/Home/Home";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AddRequest from "./pages/Dashboard/AddRequest";
import PrivateRoute from "./components/shared/PrivateRoute";
import AllUser from "./pages/Dashboard/AllUser";
import MyDonationRequest from "./pages/Dashboard/MyDonationRequest";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import RequestDetailsPage from "./pages/Dashboard/RequestDetailsPage";
import DetailsPage from "./pages/Dashboard/DetailsPage";
import Profile from "./pages/Dashboard/Profile";
import AllDonationRequest from "./pages/Dashboard/AllDonationRequest";
import VolSection from "./pages/Dashboard/VolSection";
import SearchDonner from "./pages/Search/SearchDonner";
import DonationRequestBlood from "./pages/Public/DonationRequestBlood";
import ErrorPage from "./pages/Public/ErrorPage";
import Donate from "./pages/Public/Donate";
import SuccessPage from "./pages/Public/SuccessPage";
import AboutPage from "./pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "DonationRequestBlood",
        element: <DonationRequestBlood></DonationRequestBlood>,
      },
      {
        path: "Donate",
        element: <Donate></Donate>,
      },
      {
        path: "/payment-success",
        element: <SuccessPage></SuccessPage>,

      },
     {
      path: "about-page",
      element: <AboutPage></AboutPage>
     }
    ],
  },

  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
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
