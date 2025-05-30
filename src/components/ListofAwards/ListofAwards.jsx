import React from "react";
import AwardList from "./AwardList";
import { ConfernceImages } from "../../imagesProvider/AllImages";
import pdf1 from "../../uploadPdf/16th_tcs_award_winners_actrec.pdf";
import pdf2 from "../../uploadPdf/travel_awards_2024_winners.pdf";
import pdf3 from "../../uploadPdf/SOP_for_the_TCS_Oration_Award.pdf";

export const awardsList = [
  {
    title: "TCS–2022 Awards Winners Best Papers, Oral & Poster",
    file: pdf1,
  },
  {
    title: "TCS Travel Award Winners–2022",
    file: pdf2,
  },
  {
    title: "TCS–2021 Awards Winners Best Papers, Oral & Poster",
    file: pdf3,
  },
  {
    title: "TCS–2019 Awards Winners Best Papers, Oral & Poster",
    file: pdf1,
  },
  {
    title: "TCS Travel Award Winners–2019",
    file: pdf2,
  },
  {
    title: "TCS–2018 Awards Winners Best Papers, Oral & Poster",
    file: pdf3,
  },
];

const ListofAwards = () => {
  return (
    <div>
      <div className="grid xl:grid-cols-[30%,1fr] lg:grid-cols-[40%,1fr] gap-10">
        <div className="lg:block md:hidden">
          <img
            src={ConfernceImages.awards_img}
            alt="award"
            className="h-full w-full object-cover rounded-tr-[40px] rounded-bl-[40px]"
          />
        </div>
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
  );
};

export default ListofAwards;
