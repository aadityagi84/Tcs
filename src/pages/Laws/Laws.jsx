import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import LawsComponent from "../../Components/LawsComponent/LawsComponent";
import { electionRules } from "../../static/electionRules";
import Footer from "../../Components/footer/Footer";
import { FaArrowRightLong } from "react-icons/fa6";
import pdf1 from "../../uploadPdf/The-Cytometry-Society-by-laws-Amendment-2014.pdf";
import { NavLink } from "react-router-dom";

const Laws = () => {
  return (
    <div>
      <Header />
      <PageBanner
        title={"By Laws"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > By Laws"
      />
      <div className="main-width py-10">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[45px] lg:text-[40px] uppercase md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>The Cytometry Society – ByLaws for Elections to Offices</span>
          </div>
        </div>
        <LawsComponent {...electionRules} />
        <div className="">
          <div className="flex md:flex-row flex-col items-center gap-6 mt-10">
            <NavLink to={pdf1} target="_blank">
              <span className="bg-[#2B6DC0] rounded-tr-[5px]  xl:text-[22px] lg:text-[18px] sm:text-[16px] text-[13px] flex  items-center  gap-2 rounded-bl-[5px] px-6 py-4 text-white font-bold">
                Download the PDF
                <span className="yellow-color flex items-center gap-2">
                  {" "}
                  Click here <FaArrowRightLong className="text-white " />
                </span>{" "}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Laws;
