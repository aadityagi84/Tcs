import { Link, useLocation } from "react-router-dom";
import { headerMenuData } from "../../static/Header";
import TopHeader from "./TopHeader";
import { header } from "../../imagesProvider/AllImages";
import { useEffect, useState } from "react";
import MobileNav from "./MobNav";

const Header = () => {
  const headerData = headerMenuData;
  const mainNav = headerData.mainNav;
  const location = useLocation();
  const pathname = location.pathname;
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === "/");
  }, [pathname]);

  return (
    <div className={`${isHomePage ? "bg-transparent" : "bg-white border-b"}`}>
      {/* Top Header */}
      <div className={`${isHomePage ? "" : "lg:block hidden"}`}>
        <TopHeader data={headerData.topNav} />
      </div>
      {/* Main Header */}
      <div className="w-[90%] md:w-[95%] mx-auto flex items-center justify-between transition-all duration-300 ease-in py-2">
        <div
          className={`relative ${
            isHomePage
              ? "md:w-[220px] w-[180px] lg:w-[160px] xl:w-[220px] 2xl:w-[280px]"
              : "md:w-[220px] w-[200px] lg:w-[160px] xl:w-[220px] 2xl:w-[340px] h-[80px]"
          }`}
        >
          <div
            className={`${
              isHomePage
                ? ""
                : "logo_bg px-4 lg:h-[200px] h-[110px] rounded-bl-[30px] rounded-br-[10px] absolute lg:-top-[80px] -top-4"
            }`}
          >
            <img
              src={header.logo}
              className={`${
                isHomePage
                  ? "md:w-[220px] w-[180px] lg:w-[160px] xl:w-[220px] 2xl:w-[250px]"
                  : "lg:mt-10 xl:mt-6 mt-2"
              }`}
              alt="logo"
            />
          </div>
        </div>
        <div className="lg:block hidden">
          <ul
            className={`2xl:text-[16px] xl:text-[14px] lg:text-[13px] md:text-[11px] font-semibold ${
              isHomePage ? "text-white" : "text-[#2C2C2C]"
            } flex items-center py-4 px-8 xl:space-x-10 lg:space-x-4 transition-all duration-300 ease-in`}
          >
            {mainNav.map((links, index) => (
              <li
                key={index}
                className={`relative group ${
                  links.isButton
                    ? "yellow_color text-[#2C2C2C] rounded-bl-[6px] rounded-tr-[6px] font-bold uppercase py-4 px-6"
                    : ""
                }`}
              >
                <Link to={links.url}>{links.name}</Link>
                {links.children && (
                  <ul
                    className={`
                      absolute top-full left-0 bg-white shadow-md mt-2 z-20
                      min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transform group-hover:translate-y-0 translate-y-[-10px]
                      transition-all duration-300 ease-in-out rounded-tl-[10px] rounded-br-[10px] overflow-hidden
                    `}
                  >
                    {links.children.map((child, childIdx) => (
                      <Link key={childIdx} to={child.url}>
                        <li className="px-4 py-2 hover:bg-blue-100 text-[#000] font-medium  transition-colors duration-200">
                          {child.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden block">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
