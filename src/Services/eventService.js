// services/eventService.js
import axios from "axios";
import { API_ENDPOINTS } from "../Constant/ApiUrl";
import toast from "react-hot-toast";
import { logout } from "./Api";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const api = axios.create({
  baseURL: "https://eventadminapi.anmoluphaar.in/api",
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

const eventService = {
  getEventSelectedPriceList: async (ids) => {
    try {
      const idsParam = Array.isArray(ids) ? ids.join(",") : ids;

      const res = await api.get(
        `/Customer/GetEventSelectedPriceList?Ids=${encodeURIComponent(
          idsParam
        )}`
      );
      toast.success("Event price list fetched successfully");
      return res.data;
    } catch (err) {
      console.error("Error fetching event price list:", err);

      if (err.response?.status !== 401 && err.response?.status !== 403) {
        toast.error("Failed to fetch event price list");
      }

      throw err.response?.data || err;
    }
  },
};
export const getPaymentToken = async (paymentData, user) => {
  try {
    const res = await axios.post(API_ENDPOINTS.GetPaymentToken, paymentData, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    toast.success("Payment token generated successfully");
    console.log(res, "response from api ");
    return res.data;
  } catch (err) {
    console.error("Error generating payment token:", err);

    if (err.response?.status !== 401 && err.response?.status !== 403) {
      toast.error("Failed to generate payment token");
    }

    throw err.response?.data || err;
  }
};

export default eventService;
