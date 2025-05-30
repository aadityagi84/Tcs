import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { headerImages } from "../../imagesProvider/AllImages";
import MobileNav from "./MobileNav";
import apiService from "../../Services/HomePageService";
import { useAuth } from "../../contexts/LoginContext";

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getHomePageList();
        if (data?.res?.MenusList) {
          setMenuItems(data.res.MenusList);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, [user]);

  const { pathname } = useLocation();
  const isRoot = pathname === "/event2025/";

  const style = isRoot
    ? { backgroundColor: "white", color: "#000" }
    : {
        background: "linear-gradient(89deg, #1560BD 23.83%, #2F8775 99.14%)",
        color: "#fff",
      };

  const hasChildren = (menuItem) =>
    menuItem.ChildMenus && menuItem.ChildMenus.length > 0;
  const cleanMenuName = (menuName) => menuName.replace(/ \+$/, "");

  const handleMouseEnter = (menuId) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setOpenDropdown(menuId);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
  };

  return (
    <header
      style={style}
      className="xl:w-[95%] w-[98%] relative z-50 mx-auto rounded-bl-[69px] rounded-br-[69px] 2xl:p-2 xl:p-[1.5rem] p-[0rem] lg:py-6"
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-4">
          <img
            src={isRoot ? headerImages.logo : headerImages.logo2}
            alt="Logo"
            className="2xl:w-[250px] xl:w-[160px] lg:w-[150px] w-[180px] transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Navigation */}
        <nav className="capitalize lg:flex hidden xl:space-x-2 lg:space-x-1 items-center">
          {menuItems.map((menuItem) => {
            const linkPath = `/event2025/${
              menuItem.MenuUrl !== "Home" ? menuItem.MenuUrl.toLowerCase() : ""
            }`;
            const isActive = pathname === linkPath;

            return (
              <div key={menuItem.Id} className="relative group">
                {hasChildren(menuItem) ? (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(menuItem.Id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`
                        relative flex items-center space-x-1 2xl:text-[15px] xl:text-[12px] lg:text-[10px] font-medium 
                        px-2 py-1 rounded-lg transition-all duration-300 ease-in-out
                        ${
                          isRoot
                            ? `text-black hover:text-blue-600 hover:bg-blue-50 ${
                                openDropdown === menuItem.Id
                                  ? "text-blue-600 bg-blue-50"
                                  : ""
                              }`
                            : `text-white hover:text-blue-200 hover:bg-white/10 ${
                                openDropdown === menuItem.Id
                                  ? "text-blue-200 bg-white/10"
                                  : ""
                              }`
                        }
                        hover:transform hover:scale-105 hover:-translate-y-1
                        active:transform active:scale-95 active:translate-y-0
                      `}
                    >
                      <span>{cleanMenuName(menuItem.MenuName)}</span>
                      <motion.svg
                        className="w-3 h-3"
                        animate={{
                          rotate: openDropdown === menuItem.Id ? 180 : 0,
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {openDropdown === menuItem.Id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="py-2">
                            {menuItem.ChildMenus.map((childMenu, index) => (
                              <motion.div
                                key={childMenu.Id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  duration: 0.2,
                                  ease: "easeOut",
                                }}
                              >
                                <Link
                                  to={`/event2025/${childMenu.MenuUrl.toLowerCase()}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {childMenu.MenuName}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={linkPath}
                    className={`
                      relative inline-block 2xl:text-[17px] xl:text-[14px] lg:text-[12px] font-medium 
                      px-2 py-1 rounded-lg transition-all duration-300 ease-in-out
                      ${
                        isRoot
                          ? `text-black hover:text-blue-600 hover:bg-blue-50 ${
                              isActive ? "text-blue-600 bg-blue-50" : ""
                            }`
                          : `text-white hover:text-blue-200 hover:bg-white/10 ${
                              isActive ? "text-blue-200 bg-white/10" : ""
                            }`
                      }
                      hover:transform hover:scale-105 hover:-translate-y-1
                      active:transform active:scale-95 active:translate-y-0
                    `}
                  >
                    {cleanMenuName(menuItem.MenuName)}
                    <span
                      className={`
                        absolute bottom-0 left-0 h-0.5 bg-current
                        transition-all duration-300 ease-in-out
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                      style={{ transform: "translateY(2px)" }}
                    />
                  </Link>
                )}
              </div>
            );
          })}

          {/* Register / Dashboard */}
          <NavLink
            to={user ? "/event2025/dashboard" : "/event2025/signin"}
            className="relative group"
          >
            <span
              className="
      relative inline-block
      bg-blue rounded-tr-[10px] 2xl:text-[17px] xl:text-[14px] lg:text-[12px] 
      rounded-bl-[10px] px-4 py-3 uppercase text-white font-medium
      overflow-hidden
      transition-all duration-300 ease-in-out
      hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30
      hover:transform hover:scale-105 hover:-translate-y-1
      active:transform active:scale-95 active:translate-y-0
    "
            >
              {user ? "Dashboard" : "register now"}
              <span
                className="
        absolute top-0 left-[-100%] w-full h-full
        bg-gradient-to-r from-transparent via-white/30 to-transparent
        transition-all duration-500 ease-out
        group-hover:left-[100%]
      "
                style={{ transform: "skewX(-15deg)" }}
              />
            </span>
          </NavLink>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden block">
          <MobileNav menuItems={menuItems} />
        </div>
      </div>
    </header>
  );
};

export default Header;
