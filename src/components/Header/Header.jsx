import { Link, useLocation } from "react-router-dom";
import { headerMenuData } from "../../static/Header";
import TopHeader from "./TopHeader";
import { header } from "../../imagesProvider/AllImages";
import { useEffect, useState } from "react";
import MobileNav from "./MobNav";

const Header = () => {
  const headerData = headerMenuData;
  console.log(headerData);
  const mainNav = headerData.mainNav;
  const loaction = useLocation();
  const pathname = loaction.pathname;
  console.log(pathname, "url ");
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [pathname]);
  console.log(isHomePage);
  return (
    <div className={`${isHomePage ? "bg-transparent" : "bg-white border-b  "}`}>
      {/* top header  */}
      <div className="">
        <div className={`${isHomePage ? "" : "lg:block hidden  "}`}>
          <TopHeader data={headerData.topNav} />
        </div>
        {/* main header  */}
        <div className="">
          <div
            className={` w-[90%] md:w-[95%] mx-auto flex items-center transition-all duration-300 ease-in justify-between ${
              isHomePage ? "py-2" : "py-2"
            } `}
          >
            <div
              className={`relative  ${
                isHomePage
                  ? "md:w-[220px] w-[180px] lg:w-[160px] xl:w-[220px] 2xl:w-[280px]"
                  : "md:w-[220px] w-[200px] lg:w-[160px] xl:w-[220px] 2xl:w-[340px] h-[80px]"
              }  `}
            >
              <div
                className={`${
                  isHomePage
                    ? ""
                    : "logo_bg px-4 lg:h-[200px] h-[110px] rounded-bl-[30px] rounded-br-[10px] absolute lg:-top-[80px] -top-4 "
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
            <div className=" lg:block hidden">
              <ul
                className={`2xl:text-[16px] xl:text-[14px] transition-all duration-300 ease-in  lg:text-[13px] md:text-[11px]  font-semibold ${
                  isHomePage ? "text-white" : "text-[#2C2C2C]"
                }  hidden md:flex  items-center py-4 px-8 xl:space-x-10 lg:space-x-4`}
              >
                {mainNav
                  ? mainNav.map((links, index) => {
                      return (
                        <Link to={links.url} key={index}>
                          <li
                            className={`${
                              links.isButton === true
                                ? "yellow_color text-[#2C2C2C] rounded-bl-[6px] rounded-tr-[6px] font-bold uppercase py-4 px-6 "
                                : ""
                            }`}
                          >
                            {links.name}
                          </li>
                        </Link>
                      );
                    })
                  : ""}
              </ul>
            </div>
            <div className="lg:hidden block">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
