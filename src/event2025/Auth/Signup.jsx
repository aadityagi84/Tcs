import React, { useEffect, useState } from "react";
import { headerImages } from "../imagesProvider/AllImages";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Signup as SignupApi, login, getUserData } from "../Services/Api";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login: authLogin } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/event2025/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      await SignupApi(data);
      // console.log(res);
      // await login({
      //   email: data.email,
      //   password: data.password,
      // });
      // toast.success(res);

      const userData = getUserData();

      authLogin(userData);

      navigate("/event2025/signin", { replace: true });
    } catch (error) {
      console.error("Signup or auto-login failed", error);
      toast.error(error.message || "Registration failed. Please try again.");
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

  return (
    <div className="flex min-h-screen max-h-[1500px] py-10 lg:py-0">
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
              <h2 className="lg:text-[32px] text-[25px] text-center font-medium mb-10">
                Sign Up
              </h2>

              <form className="w-full space-y-4" onSubmit={handleSignup}>
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
                  <label htmlFor="password">Password</label>
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

                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
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
                  {isLoading ? "Processing..." : "Sign Up"}
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
              </form>
            </div>

            <div className="my-6 grid lg:grid-cols-[1fr,50%,1fr] sm:grid-cols-[1fr,60%,1fr] grid-cols-[1fr,70%,1fr] items-center">
              <div className="w-full h-[2px] hr"></div>
              <div className="flex items-center justify-center text-white lg:text-[20px] sm:text-[17px] text-[14px]">
                Existing member community
              </div>
              <div className="w-full h-[2px] hr"></div>
            </div>

            <NavLink
              to="/event2025/signin"
              className="flex items-center justify-center lg:text-[20px] sm:text-[18px] text-[15px] mt-2 bg-white blue-color font-normal py-3 border border-[#000] rounded-[40px] hover:bg-gray-200"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
