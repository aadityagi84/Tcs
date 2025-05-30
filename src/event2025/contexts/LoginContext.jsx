import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        return {
          token,
        };
      } catch (error) {
        console.error("Error parsing user data:", error);
        return token ? { token } : null;
      }
    }
    return token ? { token } : null;
  });

  useEffect(() => {
    const handleAuthChange = (event) => {
      const { type } = event.detail;

      if (type === "login") {
        const token = Cookies.get("token");
        setUser({
          token,
        });
      } else if (type === "logout") {
        setUser(null);
      }
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const login = (token, userInfo) => {
    Cookies.set("token", token, { secure: true, expires: 1 });
    setUser({ token, ...userInfo });
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    setUser(null);

    window.dispatchEvent(
      new CustomEvent("auth-change", { detail: { type: "logout" } })
    );
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => useContext(LoginContext);
