import { Link, useLocation } from "react-router-dom";
import { footerImg } from "../../imagesProvider/AllImages";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import { useEffect, useState } from "react";
import homeApiService from "../../Services/HomePageService";

const Footer = () => {
  const { pathname } = useLocation();
  const [footerData, setFooterData] = useState("");
  const [aboutUsFooter, setAboutUsFooter] = useState("");
  const [menuLinks, setMenuLinks] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [contactDetails, setContactDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApiService.getHomePageList();
        const footerData = data.res.ContactMasterList?.[0];
        setContactDetails(footerData);
        const aboutUsText = data.res?.HomePage?.[0]?.AboutUs;
        const aboutUsFooterText = data.res?.HomePage?.[0]?.AboutUsFooter;
        const menus = data.res?.MenusList || [];

        setFooterData(aboutUsText);
        setAboutUsFooter(aboutUsFooterText);
        setMenuLinks(menus);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOpenMenuId(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null && !event.target.closest(".menu-item")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const toggleMenu = (menuId, event) => {
    event.preventDefault();
    setOpenMenuId(openMenuId === menuId ? null : menuId);
  };

  const contactInfo = {
    people: [
      {
        name: contactDetails.Name1,
        phone: contactDetails.Mobile1,
      },
      {
        name: contactDetails.Name2,
        phone: contactDetails.Mobile2,
      },
    ],
    email: contactDetails.EmailId,
    address: contactDetails.Address,
  };
  const renderMenuItems = (menuItems) => {
    const flattenedItems = [];

    menuItems.forEach((item) => {
      if (item.ChildMenus && Array.isArray(item.ChildMenus)) {
        // Show children instead of parent
        flattenedItems.push(...item.ChildMenus);
      } else {
        // Show parent if no children
        flattenedItems.push(item);
      }
    });

    return flattenedItems.map((item) => {
      const linkPath =
        item.MenuUrl !== "Home"
          ? `/event2025/${item.MenuUrl.toLowerCase()}`
          : "/event2025";

      return (
        <li key={item.Id}>
          <a href={linkPath}>{item.MenuName}</a>
        </li>
      );
    });
  };

  return (
    <footer
      className="bg-cover text-white py-10 px-6 md:px-20 xl:min-h-[500px]"
      style={{ backgroundImage: `url(${footerImg.footer})` }}
    >
      <div className="main-width mx-auto grid md:grid-cols-2 gap-10 py-10 items-start">
        {/* Quick Links */}
        <div>
          <h4 className="font-bold lg:text-[22px] lg:text-[20px] text-[18px] lg:leading-[35px] mb-4">
            Quick Link
          </h4>
          <ul className="space-y-2 font-bold leading-[35px]">
            {renderMenuItems(menuLinks)}
          </ul>
        </div>

        {/* About Us */}
        {/* <div>
          <h4 className="font-bold lg:text-[22px] lg:text-[20px] text-[18px] lg:leading-[35px] mb-4">
            About Us
          </h4>
          <div className="lg:w-[70%]">
            <div
              className="font-bold leading-[35px]"
              dangerouslySetInnerHTML={{
                __html:
                  aboutUsFooter ||
                  "The organizing committee of the 16TH TCS ANNUAL CONFERENCE & WORKSHOP(s) welcomes you one & all. We are extremely delighted to host this integrative event at our center and sincerely hope that you shall enjoy the scientific deliberations in similar enthusiasm as we have had in getting this together.",
              }}
            />
          </div>
        </div> */}

        {/* Contact Info */}
        <div className="flex items-center lg:justify-center">
          <div className="">
            <h4 className="font-bold lg:text-[22px] lg:text-[20px] text-[18px] lg:leading-[35px] mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              {contactInfo.people.map((person, idx) => (
                <p className="font-bold flex gap-4 items-center" key={idx}>
                  <BiPhoneCall className="text-[25px]" />
                  <span>
                    {person.name}
                    <br />
                    {person.phone}
                  </span>
                </p>
              ))}
              <p className="font-bold leading-[26px] flex gap-4 items-center">
                <MdOutlineEmail className="text-[25px]" />
                <Link to={`mailto:${contactInfo.email}`} className="font-bold">
                  {contactInfo.email}
                </Link>
              </p>
              <br />
              <p className="  font-bold  grid grid-cols-[30px,1fr] gap-4 items-start">
                <CiLocationOn className="text-[25px]" />
                <span dangerouslySetInnerHTML={{ __html: contactInfo.address }}>
                  {/* {} */}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
