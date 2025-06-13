import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import { combineBanner } from "../../imagesProvider/AllImages";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetMembershipPageList } from "../../services/HomeService";

const AboutMemberShip = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getMembershipData = async () => {
      try {
        const rs = await GetMembershipPageList();
        // console.log(rs);
        setData(rs);
      } catch (error) {
        console.log(error);
      }
    };
    getMembershipData();
  }, []);

  const objectives = [
    "Life Membership – Rs. 5000 + 18% GST = Rs. 5900/- (No Renewal fee).",
    "Student Membership – Rs. 1000 + 18% GST = Rs. 1180 as joining fee and Rs. 100 + 18% GST = Rs. 118/- per year towards Renewal of Membership.",
  ];
  const Membership = [
    "All Members will access all activities of the Society; get free News Letters, avail preferences and discounted registration fee for Advanced TCS workshops, conferences, seminars and more.",
    "All Members will be eligible to apply for the TCS Awards which we will be announcing every year.",
    "Life Members have additional benefits like to be elected as an office bearer by voting or nominate a member.(For more details see Bylaws of the Society on the website)",
  ];
  const Eligibility = [
    {
      type: "Life Membership",
      detail:
        "A person belongs to the categories mentioned above are eligible to take membership.",
    },
    {
      type: "Student Membership",
      detail:
        "Valid ID card of institute where student is working / Letter signed by HOD on institutional letter head certifying that applying member is a student in that institute.",
    },
  ];
  return (
    <div>
      <Header />
      <PageBanner
        img={data.BannerImage}
        title={data.Title}
        subtitle={data.Description}
        breadcrumb="Home > About Membership"
      />
      <div className="main-width">
        <div className="py-10">
          <div className="grid grid-cols-[10px,1fr] items-center gap-4">
            <div className={`bg-[#1560BD] h-full`}></div>
            <div
              className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
            >
              <span>THE CYTOMETRY SOCIETY (TCS)</span>
              {/* <span className="font-semibold"> NEWS</span> */}
            </div>
          </div>
          <div className="mt-10">
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: data.SocietyContent }}
            ></p>
          </div>
        </div>

        <div className="py-10">
          <div className="flex md:flex-row flex-col items-center gap-4 md:gap-10 my-16">
            <NavLink to="/event2025/signin" target="_blank">
              <span className="flex items-center gap-4 px-8  lg:text-[22px] md:text-[20px] text-[16px] rounded-tr-[10px] rounded-bl-[10px]  py-4 bg-[#2B6DC0] text-white ">
                Login Now <FaArrowRightLong />
              </span>
            </NavLink>
            <NavLink to="/event2025/signup" target="_blank">
              <span className="flex items-center gap-4 px-8  lg:text-[22px] md:text-[20px] text-[16px] rounded-tr-[10px] rounded-bl-[10px]  py-4 bg-[#2B6DC0] text-white ">
                Register Now <FaArrowRightLong />
              </span>
            </NavLink>
          </div>
          <hr className="border-2 border-dashed border-[#D7D7D7]" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutMemberShip;
