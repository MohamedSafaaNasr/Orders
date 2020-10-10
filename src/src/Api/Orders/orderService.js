import axiosInstance from "../Axios/axiosInstance";

const getAllOrders = async (pagination) => {
  console.log(pagination);
  return await axiosInstance.get(`/orders?page=${pagination.current}&size=${pagination.pageSize}`);
};
const getOrderById = async (id) => {
  return await axiosInstance.get("/orders/entry/" + id);
};

const getOrderByFilter = async (data) => {
  return await axiosInstance.post("/orders/search",data);
};

const createOrder = async (data) => {
  data.OID = Math.random().toString(36).slice(-8);
  data.order_status = "Preparing Order";
  return await axiosInstance.post("/orders/", data);
};
const updateOrder = async (id, data) => {
  return await axiosInstance.put(`/orders/${id}`, data);
};
const deleteOrder = async (id) => {
  return await axiosInstance.delete(`/orders/${id}`);
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByFilter
};
