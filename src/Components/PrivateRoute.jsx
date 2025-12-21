import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import Loader from "./Loader";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (!user || userStatus == "blocked") {
    return <Navigate to={"/"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
