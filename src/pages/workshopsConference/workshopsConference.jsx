import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import ConferenceComponent from "../../Components/workshopsConference/ConferenceComponent";
import { Outlet } from "react-router-dom";

const WorkshopsConference = () => {
  return (
    <div>
      <Header />
      <PageBanner
        title={"Workshops & Conferences"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Workshops & Conferences"
      />
      <div className="main-width py-10">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>Workshops & Conferences</span>
          </div>
        </div>
        <div className="mt-10">
          <ConferenceComponent />
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkshopsConference;
