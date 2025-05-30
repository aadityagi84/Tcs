import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { TbXboxXFilled } from "react-icons/tb";
import { header } from "../../imagesProvider/AllImages";
import { headerMenuData } from "../../static/Header";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = headerMenuData.mainNav.filter((item) => !item.isButton);
  const buttonLink = headerMenuData.mainNav.find((item) => item.isButton);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="p-2 z-50  top-4 left-4 bg-[#007DC5] text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <IoMenuOutline size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[#007DC5] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-white/30">
          <img src={header.logo} alt="Logo" className="w-[60%] md:w-[220px]" />
          <button onClick={() => setIsOpen(false)} className="text-white">
            <TbXboxXFilled size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 text-white flex flex-col h-[calc(100%-80px)]">
          <div className="space-y-1  overflow-y-auto">
            {/* Main Nav Links (non-button) */}
            {mainLinks.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className="block text-[15px] py-2 px-2 border-b border-white/30"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="md:hidden block">
              {" "}
              {/* Top Nav */}
              {headerMenuData.topNav.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className="block text-[14px] py-2 px-2 border-b border-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Button at Bottom */}
          {buttonLink && (
            <Link
              to={buttonLink.url}
              className="block bg-white text-[#007DC5] font-semibold text-center mx-4 mt-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              {buttonLink.name}
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
