import React, { createContext, useContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  logout,
  getUserData,
  getDisplayName,
} from "../Services/Api";

// Create the auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [displayName, setDisplayName] = useState("Guest");

  // Initialize user from localStorage on component mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const userData = getUserData();
          setUser(userData);
          setDisplayName(getDisplayName());
        } catch (error) {
          console.error("Error getting user data from localStorage", error);
          handleLogout();
        }
      } else {
        setDisplayName("Guest");
      }
      setLoading(false);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setDisplayName("Guest");
  };

  // Listen for auth change events
  useEffect(() => {
    const handleAuthChange = (event) => {
      if (event.detail.type === "login") {
        setUser(event.detail.user);
        setDisplayName(getDisplayName());
      } else if (event.detail.type === "logout") {
        setUser(null);
        setDisplayName("Guest");
      }
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  // Optional: Listen for localStorage changes (for cross-tab synchronization)
  useEffect(() => {
    const checkStorageChanges = () => {
      const currentAuth = isAuthenticated();
      const currentUser = getUserData();
      const currentDisplayName = getDisplayName();
      // console.log(currentUser);

      if (currentAuth && currentUser && !user) {
        setUser(currentUser);
        setDisplayName(currentDisplayName);
      } else if (!currentAuth && user) {
        setUser(null);
        setDisplayName("Guest");
      } else if (displayName !== currentDisplayName) {
        setDisplayName(currentDisplayName);
      }
    };

    // Check for changes periodically
    const interval = setInterval(checkStorageChanges, 1000);

    return () => clearInterval(interval);
  }, [user, displayName]);

  // Login function to update context after successful login
  const login = (userData) => {
    setUser(userData);
    setDisplayName(getDisplayName());
  };

  const value = {
    user,
    isAuthenticated: !!user,
    displayName,
    login,
    logout: handleLogout,
    loading,
    authChecked,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
