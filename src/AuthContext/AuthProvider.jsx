import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";
// import useAxios from "../hooks/useAxios";
// import { axiosInstance } from "../hooks/useAxios"; // direct import, no hook call
//  const axiosInstance = useAxios();



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [err, setErr] = useState(null);
  const [userStatus, setUserStatus] = useState("");
  console.log(user);


  const SignUpWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const UpdateUser = (userInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };

  //  useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
  //     console.log(CurrentUser);
  //     setUser(CurrentUser);

  //     setLoading(false);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);



  // const fetchRole = async () => {
  //   if (!user?.email) {
  //     console.log("No email found");
  //     return;
  //   }

  //   try {
  //     console.log("Fetching role for:", user?.email);

  //     const res = await axiosInstance.get(
  //       `/user/role/${user?.email}`
  //     );

  //     console.log("Response:", res.data);

  //     setRole(res?.data?.role || "");
  //     setUserStatus(res?.data?.status || "");
  //   } catch (error) {
  //     console.log("Fetch error:", error);
  //   } finally {
  //     setRoleLoading(false);
  //   }
  // };

  // fetchRole();



  // Replace your fetchRole call and the auth state effect with this:

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    console.log(currentUser)
    setUser(currentUser);
    setLoading(false);

    if (!currentUser?.email) {
      // No user — reset role state immediately so PrivateRoute doesn't hang
      setRole("");
      setUserStatus("");
      setRoleLoading(false);
      return;
    }
    console.log("Current user:", currentUser?.email);

    // User exists — fetch their role
    // setRoleLoading(true);
  
      try {
      const res = await axios.get(`http://localhost:5000/user/role/${currentUser?.email}`);
      console.log("Response:", res.data);
      setRole(res?.data?.role || "");
      setUserStatus(res?.data?.status || "");
    } catch (error) {
      console.log("Fetch role error:", error);
      setRole("");
      setUserStatus("");
    } finally {
      setRoleLoading(false);
    }
   }
  
  );

  return () => unsubscribe();
}, []);

// DELETE the standalone fetchRole function and its call entirely
 
  const SignOut = () => {
    return signOut(auth);
  };

  const userInfo = {
    SignUpWithEmailPassword,
    SignIn,
    SignOut,
    UpdateUser,
    loading,
    user,
    role,
    roleLoading,
    userStatus
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
