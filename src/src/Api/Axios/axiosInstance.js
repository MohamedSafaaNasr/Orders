import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT+"/",
});

axiosInstance.interceptors.request.use((cfg) => {
  cfg.headers["Accept"] = "application/json";
  if(localStorage.getItem("user-auth")!=null)
  cfg.headers["Authorization"] = `auth ${localStorage.getItem("user-auth")}`;
  console.log(cfg);
  return cfg;
});

export default axiosInstance;
