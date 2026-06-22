import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://blooddonations-pi.vercel.app",
    baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance }; // named export for direct use
const useAxios = () => axiosInstance;
export default useAxios; // keep the hook for components