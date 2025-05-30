import { Link, useLocation } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BiPhoneCall } from "react-icons/bi";
import { useEffect, useState } from "react";
import { footerImage } from "../../imagesProvider/AllImages";

const Footer = () => {
  const { pathname } = useLocation();
  const [menuLinks, setMenuLinks] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Dummy Data
  const aboutUsFooter = `The organizing committee of the 16TH TCS ANNUAL CONFERENCE & WORKSHOP(s) welcomes you one & all. We are extremely delighted to host this integrative event at our center and sincerely hope that you shall enjoy the scientific deliberations in similar enthusiasm as we have had in getting this together.`;

  const contactDetails = {
    Name1: "Mr Sitaram Ghogale",
    Mobile1: "9819280796",
    Name2: "Mr Sitaram Ghogale",
    Mobile2: "9819280796",
    EmailId: "tcs.mumbai2024@gmail.com",
    Address: `Dr Prashant Tembhare
Haematopathology Laboratory
Room No 17, CCE Building,
Advance Centre for Treatment, Research
and Education in Cancer (ACTREC)
Tata Memorial Centre
Plot No 1 & 2, Sector 22
Kharghar, Navi Mumbai - 410210
Maharashtra, India`,
  };

  const dummyMenus = [
    { Id: 1, MenuName: "Home", MenuUrl: "/", ChildMenus: [] },
    { Id: 2, MenuName: "About Us", MenuUrl: "/about", ChildMenus: [] },
    {
      Id: 3,
      MenuName: "Registration",
      MenuUrl: "registration",
      ChildMenus: [],
    },
    {
      Id: 4,
      MenuName: "Abstract & Awards",
      MenuUrl: "abstract-awards",
      ChildMenus: [],
    },
    { Id: 5, MenuName: "Workshop", MenuUrl: "workshop", ChildMenus: [] },
    { Id: 6, MenuName: "Exhibition", MenuUrl: "exhibition", ChildMenus: [] },
    {
      Id: 7,
      MenuName: "Organizing Committee",
      MenuUrl: "organizing-committee",
      ChildMenus: [],
    },
    { Id: 8, MenuName: "Contact Us", MenuUrl: "contact-us", ChildMenus: [] },
  ];

  useEffect(() => {
    setMenuLinks(dummyMenus);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      { name: contactDetails.Name1, phone: contactDetails.Mobile1 },
      { name: contactDetails.Name2, phone: contactDetails.Mobile2 },
    ],
    email: contactDetails.EmailId,
    address: contactDetails.Address,
  };

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      const linkPath = `${item.MenuUrl.toLowerCase()}`;
      const hasChildren = item.ChildMenus && item.ChildMenus.length > 0;
      return (
        <div key={item.Id} className="menu-item relative">
          <li>
            {hasChildren ? (
              <button
                onClick={(e) => toggleMenu(item.Id, e)}
                className="flex items-center hover:underline focus:outline-none"
              >
                {item.MenuName}
                <span
                  className={`ml-1 transition-transform duration-200 ${
                    openMenuId === item.Id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
            ) : (
              <Link to={linkPath} className="hover:underline">
                {item.MenuName}
              </Link>
            )}
          </li>
        </div>
      );
    });
  };

  return (
    <footer
      className="bg-cover text-white py-10 px-6 md:px-20 xl:h-[700px]"
      style={{ backgroundImage: `url(${footerImage.footer})` }}
    >
      <div className="main-width mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-10 py-10 items-start">
        {/* Quick Links */}
        <div>
          <h4 className="font-bold lg:text-[22px] text-[18px] lg:leading-[35px] mb-4">
            Quick Link
          </h4>
          <ul className="space-y-2 font-bold leading-[35px]">
            {renderMenuItems(menuLinks)}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-bold lg:text-[22px] text-[18px] lg:leading-[35px] mb-4">
            About Us
          </h4>
          <div className="lg:w-[70%]">
            <div
              className="font-bold leading-[35px]"
              dangerouslySetInnerHTML={{ __html: aboutUsFooter }}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex items-center lg:justify-center">
          <div>
            <h4 className="font-bold lg:text-[22px] text-[18px] lg:leading-[35px] mb-4">
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
              <p className="whitespace-pre-line font-bold leading-[26px] grid grid-cols-[30px,1fr] gap-4 items-start">
                <CiLocationOn className="text-[25px]" />
                <span>{contactInfo.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
