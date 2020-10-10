import axiosInstance from "../Axios/axiosInstance";

const getCurrentUserData = async () => {
  return await axiosInstance.get("/users/get_user");
};

const getAllUsers = async () => {
  return await axiosInstance.get("/users/");
};

const registerUser = async (data) => {
  return await axiosInstance.post("/users/", data);
};

const getUserByToken = async () => {
  return await axiosInstance.get("/users/get_user");
};

const authenticate = async (data) => {
  console.log(data);
  return await axiosInstance.post("/users/authenticate", data);
};

const updateUser = async (id, data) => {
  return await axiosInstance.put("/users/" + id, data);
};

const deleteUser = async (id) => {
  return await axiosInstance.delete("/users/" + id);
};

const forgetPassword = async (email) => {
  console.log(email);
  return await axiosInstance.post("/users/forget_password", {email:email});
};

const resetPassword = async (data) => {
  return await axiosInstance.post("/users/reset_password", data);
};

const checkResetToken = async (token) => {
  return await axiosInstance.get("/users/reset/" + token);
};

const verifyAccount = async (token) => {
  return await axiosInstance.get(`/users/verify?v=${token}`);
};

export default {
  getCurrentUserData,
  getAllUsers,
  registerUser,
  getUserByToken,
  authenticate,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword,
  checkResetToken,
  verifyAccount,
};
