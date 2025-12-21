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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
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
    ],
  },
]);

export default router;
