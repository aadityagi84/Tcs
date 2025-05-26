import React, { useEffect, useState } from "react";
import { headerImages } from "../imagesProvider/AllImages";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { login, getUserData } from "../Services/Api";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin, isAuthenticated, loading, authChecked } = useAuth();

  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    if (authChecked && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, authChecked, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(data);
      console.log("Login successful", response);
      toast.success("Login successful");

      const userData = getUserData();
      authLogin(userData);

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.add("auth_sign_page");
    return () => {
      document.body.classList.remove("auth_sign_page");
    };
  }, []);

  if (loading || !authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render signin form if user is already authenticated
  if (isAuthenticated) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen max-h-[1200px] py-10 lg:py-0 ">
      <div className="main-width">
        <div className="xl:w-1/2 lg:p-10 mx-auto">
          <div className="2xl:w-[80%] mx-auto">
            <div>
              <NavLink to="/">
                <img
                  src={headerImages.favicon}
                  className="mx-auto"
                  alt="icon"
                />
              </NavLink>
            </div>
            <div className="border mx-auto sm:p-10 p-8 mt-10 text-white rounded-[24px]">
              <h2 className="lg:text-[32px] text-[25px] text-center text-white font-medium mb-10">
                Sign in
              </h2>

              <form className="w-full space-y-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email">Email Id</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="w-full px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-800 rounded-[12px] text-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password">Your password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="w-full px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-800 rounded-[12px] text-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full lg:text-[22px] bg-blue text-white py-3 rounded-[40px] font-medium ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>

                <p className="text-center mt-2">
                  By continuing, you agree to the &nbsp;
                  <Link to="#" className="underline">
                    Terms of use
                  </Link>
                  &nbsp;and&nbsp;
                  <Link to="#" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>

                <div className="text-right pt-8">
                  <Link to="#" className="underline">
                    Forget your password
                  </Link>
                </div>
              </form>
            </div>

            <div className="my-6 grid lg:grid-cols-[1fr,50%,1fr] sm:grid-cols-[1fr,60%,1fr] grid-cols-[1fr,70%,1fr] items-center">
              <div className="w-full h-[2px] hr"></div>
              <div className="flex items-center justify-center text-white lg:text-[20px] sm:text-[17px] text-[14px]">
                New to our community
              </div>
              <div className="w-full h-[2px] hr"></div>
            </div>

            <NavLink
              to="/signup"
              className="flex items-center justify-center lg:text-[20px] sm:text-[18px] text-[15px] mt-2 bg-white blue-color font-normal py-3 border border-[#000] rounded-[40px] hover:bg-gray-200"
            >
              Create an account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
