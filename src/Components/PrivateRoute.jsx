import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import Loader from "./Loader";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading } = useContext(AuthContext);

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (user) {
    return children;
  }
  return <Navigate to={"/"}></Navigate>;
};

export default PrivateRoute;
