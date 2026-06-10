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
import useAxios from "../hooks/useAxios";



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [err, setErr] = useState(null);
  const [userStatus, setUserStatus] = useState("");
  console.log(user);
  const axiosInstance=useAxios();
  console.log(axiosInstance);


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

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      console.log(CurrentUser);
      setUser(CurrentUser);

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {


    try {

      async function fetchData () {
                              
         const res = await axios.get(`https://blooddonationserver.vercel.app/user/role/${user?.email}`);
       console.log(res);
        setRole(res.data.role);
        setUserStatus(res.data.status);
        console.log(role);
        setRoleLoading(false);

      }

      fetchData();
      
   
    } catch (error) {
      console.log(error);
      setErr(error)
    }

  
  }, [user]);

 
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
