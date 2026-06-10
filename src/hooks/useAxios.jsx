import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://blooddonationserver.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
