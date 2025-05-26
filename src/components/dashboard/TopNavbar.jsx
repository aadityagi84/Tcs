import React from "react";
import { User, Menu } from "lucide-react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const TopNavbar = ({ openSidebar }) => {
  const location = useLocation();
  const { displayName } = useAuth();
  const currentPath = location.pathname.split("/")[1];
  // console.log(currentPath);

  return (
    <header className="main-width  header_color h-[100px] relative z-50 mx-auto rounded-bl-[40px] rounded-br-[40px] 2xl:p-2 xl:p-[1.5rem] p-[0rem] lg:py-6">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center w-full py-4 h-full ">
        <div className="flex justify-between items-center h-full  w-full">
          {/* Left side with logo and breadcrumb */}
          <div className="flex items-center text-white ">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden mr-2">
              <button
                type="button"
                className="p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
                onClick={openSidebar}
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Breadcrumb navigation */}
            <div className="hidden md:flex items-center md:text-[18px]  ">
              <span className=" font-semibold">TCS Member Portal</span>
              <span className="mx-2">/</span>
              <span className="text-[#95CEEF] capitalize">{currentPath}</span>
            </div>
          </div>

          {/* Right side elements */}
          <div className="flex items-center gap-4 text-white ">
            {/* User Profile */}
            <div className="">
              <NavLink to="/">
                <div className="flex items-center  gap-2">
                  <IoHome className="text-[22px] transition-all duration-700 transform hover:scale-[1.1]" />
                </div>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-2 hidden md:block">
                <div className="flex items-center  gap-2">
                  <div className=" rounded-full flex  text-[20px] items-center justify-center">
                    <FaUserAlt />
                  </div>
                  <div className=" font-medium">
                    {displayName === "Guest" ? "Guest" : `Mr. ${displayName}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
