import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import AnnualMeetingComponent from "../../Components/AnnualMeeting/AnnualMeeting";
import Footer from "../../Components/footer/Footer";

const AnnualMeeting = () => {
  return (
    <div>
      <Header />
      <PageBanner
        title={"Annual Meeting"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Annual Meeting"
      />
      <div className="main-width">
        <div className="py-10">
          <div className="grid grid-cols-[10px,1fr] items-center gap-4">
            <div className={`bg-[#1560BD] h-full`}></div>
            <div
              className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
            >
              <span>TCS-2024 ANNUAL MEETING PHOTOGRAPHS</span>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-bold lg:text-[30px] md:text-[25px] text-[20px] lg:leading-[55px]">
              Research professionals like doctors, pathologist, hematologists,
              students and interested individuals who engaged in research and
              education in clinical and research cytometry especially in
              clinical sciences, basic research technologies and any other
              relevant areas duly recognized by the society are eligible for the
              membership of the society. An individual affiliated to any
              recognized College, University, Research Institute or any other
              Organizations, society or an enterprise can become a member of the
              society. Overseas Indian students and scientists are also
              encouraged to be members of the society as per rules.
            </p>
          </div>
          <div className="mt-10">
            <AnnualMeetingComponent />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnnualMeeting;
