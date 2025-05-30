import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import AwardsComponent from "../../Components/AwardsComponent/AwardsComponent";
import { awardDetails } from "../../static/awardDetails";
import Footer from "../../Components/footer/Footer";
import AwardList from "../../Components/ListofAwards/AwardList";
import { awardsList } from "../../Components/ListofAwards/ListofAwards";

const AwardDetailsPage = () => {
  return (
    <div>
      <Header />
      <PageBanner
        title={"Awards"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Awards"
      />
      <div className="main-width py-10">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4 mb-10">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>The Cytometry Society – ByLaws for Elections to Offices</span>
          </div>
        </div>
        <h3 className="lg:text-[26px]  text-[22px] font-bold mb-4">
          Application Deadline 31<sup>st</sup> August, 2024
        </h3>
        <AwardsComponent {...awardDetails.eligibilityCriteria} />
        <AwardsComponent {...awardDetails.selectionProcedure} />
        <AwardsComponent {...awardDetails.termsAndConditions} />
        <div className="">
          <div className=" bg-[rgba(169,206,243,0.28)] p-10 rounded-tr-[30px] rounded-bl-[30px]">
            <div className="grid grid-cols-[10px,1fr] items-center gap-4">
              <div className={`bg-[#2F8775] h-full`}></div>
              <div
                className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
              >
                <span>List of</span>
                <span className="font-semibold"> Awards</span>
              </div>
            </div>
            {awardsList.map((workshop, index) => (
              <AwardList key={index} {...workshop} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AwardDetailsPage;
