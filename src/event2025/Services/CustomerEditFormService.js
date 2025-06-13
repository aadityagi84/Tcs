// services/customerService.js
import axios from "axios";
import { logout } from "./Api";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
      toast.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  }
);

const customerService = {
  getCustomerByIdList: async () => {
    try {
      const res = await api.get("/Customer/GetCustomerByIdList");
      toast.success("Customer list fetched successfully");
      return res.data;
    } catch (err) {
      console.error("Error fetching customer list:", err);

      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast.error("Failed to fetch customer list");
      }

      throw err.response?.data || err;
    }
  },

  updateCustomerById: async (customerData) => {
    try {
      const res = await api.post("/Customer/UpdateCustomerById", customerData);
      toast.success("Customer updated successfully");
      return res.data;
    } catch (err) {
      console.error("Error updating customer:", err);

      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast.error("Failed to update customer");
      }

      throw err.response?.data || err;
    }
  },

  createCustomer: async (customerData) => {
    try {
      const res = await api.post("/Customer/CreateCustomer", customerData);
      toast.success("Customer created successfully");
      return res.data;
    } catch (err) {
      console.error("Error creating customer:", err);

      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast.error("Failed to create customer");
      }

      throw err.response?.data || err;
    }
  },

  deleteCustomer: async (customerId) => {
    try {
      const res = await api.delete(`/Customer/DeleteCustomer/${customerId}`);
      toast.success("Customer deleted successfully");
      return res.data;
    } catch (err) {
      console.error("Error deleting customer:", err);

      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast.error("Failed to delete customer");
      }

      throw err.response?.data || err;
    }
  },
};

export default customerService;
