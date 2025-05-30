import axios from "axios";
import { API_ENDPOINTS } from "../Constant/ApiUrl";
import Cookies from "js-cookie";

// Get token from cookies only
const getToken = () => {
  const token = Cookies.get("token");
  return token || null;
};

// Store auth token in cookies and user data in localStorage
const storeAuthData = (data) => {
  // Set cookies with 7 days expiry for token only
  const cookieOptions = {
    expires: 7,
    path: "/",
    sameSite: "Strict",
  };

  // Store token in cookie
  Cookies.set("token", data.access_token, cookieOptions);

  // Store user data in localStorage
  const userData = {
    id: data.Id,
    email: data.EmailId,
    name: data.Name,
    mobileNo: data.MobileNo,
  };
  localStorage.setItem("user", JSON.stringify(userData));

  // Dispatch custom event to notify components about login
  window.dispatchEvent(
    new CustomEvent("auth-change", {
      detail: {
        type: "login",
        user: userData,
      },
    })
  );
};

// Get user data from localStorage
export const getUserData = () => {
  const userStorage = localStorage.getItem("user");
  if (userStorage) {
    try {
      return JSON.parse(userStorage);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  }
  return null;
};

// Get display name - returns name if available, otherwise "Guest"
export const getDisplayName = () => {
  const token = getToken();

  // If no token, return Guest
  if (!token) {
    return "Guest";
  }

  const userData = getUserData();

  // If no user data or name is null/empty, return Guest
  if (!userData || !userData.name) {
    return "Guest";
  }

  return userData.name;
};

// login
export const login = async (data) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, {
      EmailId: data.email,
      Password: data.password,
    });

    console.log(response);
    if (response.data && response.data.rs === 1) {
      storeAuthData(response.data.res);
      return "Login successful";
    } else {
      throw new Error(response.data?.res?.ResponseMessage || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(
      error.response?.data?.res?.ResponseMessage ||
      "Login failed. Please try again."
    );
  }
};

// signup
export const Signup = async (data) => {
  try {
    const response = await axios.post(API_ENDPOINTS.SIGNUP, {
      EmailId: data.email,
      Password: data.password,
    });

    if (response.data && response.data.rs === 1) {
      return "Registration successful. Please login.";
    } else {
      throw new Error(
        response.data?.res?.ResponseMessage || "Registration failed"
      );
    }
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(
      error.response?.data?.res?.ResponseMessage ||
      "Registration failed. Please try again."
    );
  }
};

// Check if user is authenticated by checking token in cookies
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Logout function - clear cookies and localStorage
export const logout = () => {
  // Clear cookies
  Cookies.remove("token", { path: "/" });

  // Clear localStorage
  localStorage.removeItem("user");

  // Dispatch custom event to notify components about logout
  window.dispatchEvent(
    new CustomEvent("auth-change", { detail: { type: "logout" } })
  );
};

// Add authorization header to requests
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401/403 responses
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

setupAxiosInterceptors();
