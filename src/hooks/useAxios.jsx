import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://b12-a11-category-1-server.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
