import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { headerImages } from "../../imagesProvider/AllImages";
import { useAuth } from "../../contexts/LoginContext";

const MobileNav = ({ menuItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const { pathname } = useLocation();
  const isRoot = pathname === "/";

  const toggleSubmenu = (menuId) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const hasChildren = (menuItem) => {
    return menuItem.ChildMenus && menuItem.ChildMenus.length > 0;
  };

  const cleanMenuName = (menuName) => {
    return menuName.replace(/ \+$/, "");
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className={`line ${isRoot ? "bg-black" : "bg-white"}`}></span>
        <span className={`line ${isRoot ? "bg-black" : "bg-white"}`}></span>
        <span className={`line ${isRoot ? "bg-black" : "bg-white"}`}></span>
      </button>

      {/* Mobile Nav */}
      <nav className={`mobile-nav pt-4 ${isOpen ? "active" : ""}`}>
        <button
          className="close-hamburger right-[20px] top-[40px] absolute"
          onClick={closeMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 40 40"
          >
            <circle cx="20" cy="20" r="20" fill="white" />
            <path
              d="M24.2242 25.6414L19.8774 20.9285L15.7505 25.6414H13.8457L18.9983 19.9601L13.8457 14.3594H15.7505L20.0728 19.0562L24.2486 14.3594H26.1534L20.9519 20.0085L26.129 25.6414H24.2242Z"
              fill="#313039"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="ml-4">
          <Link to="/">
            <img
              src={headerImages.logo}
              className="w-1/2 object-cover"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="ml-2 mt-8 text-white space-y-4 px-4">
          {menuItems.map((menuItem) => (
            <li
              key={menuItem.Id}
              className="border-b font-medium text-[16px] pb-2 leading-[28px]"
            >
              {hasChildren(menuItem) ? (
                // Menu item with children (submenu)
                <div>
                  <button
                    className="w-full flex justify-between items-center pb-4 text-left"
                    onClick={() => toggleSubmenu(menuItem.Id)}
                  >
                    <span>{cleanMenuName(menuItem.MenuName)}</span>
                    <motion.svg
                      className={`w-4 h-4 transition-transform duration-200`}
                      animate={{ rotate: openSubmenus[menuItem.Id] ? 180 : 0 }}
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

                  {/* Submenu */}
                  <AnimatePresence>
                    {openSubmenus[menuItem.Id] && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          opacity: { duration: 0.2 },
                        }}
                        className="mt-2 ml-4 space-y-2 overflow-hidden"
                      >
                        {menuItem.ChildMenus.map((childMenu, index) => (
                          <motion.li
                            key={childMenu.Id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="border-l-2 border-gray-300 pl-4"
                          >
                            <Link
                              className="block py-2 text-sm text-gray-200 hover:text-white transition-colors duration-200"
                              to={`/${childMenu.MenuUrl.toLowerCase()}`}
                              onClick={closeMenu}
                            >
                              {childMenu.MenuName}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Regular menu item without children
                <Link
                  className="block pb-4"
                  to={`/${
                    menuItem.MenuUrl !== "Home"
                      ? menuItem.MenuUrl.toLowerCase()
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  {cleanMenuName(menuItem.MenuName)}
                </Link>
              )}
            </li>
          ))}

          {/* Register Button */}
          <Link to="signin" target="_blank">
            <li className="border-b uppercase text-center bg-white text-blue-600 font-medium text-[18px] py-4 leading-[28px]">
              {user ? "Dashboard" : " register now"}
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
