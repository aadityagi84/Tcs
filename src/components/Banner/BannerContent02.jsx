import { useEffect } from "react";
import { banner as all_banner } from "../../imagesProvider/AllImages";
import { conferenceDetails } from "../../static/banner";
import Timer from "../timer/Timer";

const Banner02 = ({ data, bannerdata }) => {
  const targetDate = bannerdata?.EndDate ? new Date(bannerdata.EndDate) : null;

  // console.log(bannerdata);
  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const sameMonth = startDate.getMonth() === endDate.getMonth();
    const sameYear = startDate.getFullYear() === endDate.getFullYear();

    const startStr = startDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    let endStr = endDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: sameMonth ? undefined : "short", // don't repeat month if same
    });

    let yearStr = sameYear
      ? ` ${startDate.getFullYear()}`
      : ` ${startDate.getFullYear()} – ${endDate.getFullYear()}`;

    return `${startStr} – ${endStr}${yearStr}`;
  };

  return (
    <div className=" py-10 relative z-4 ">
      <div className="grid xl:grid-cols-[58%,1fr] items-center lg:gap-2 gap-10">
        <div>
          <h1 className="large_heading xl:leading-[64px] lg:leading-[50px] md:leading-[40px] lg:text-left text-center leading-[35px] text-white">
            {bannerdata.EventName}
          </h1>
          <div className="flex flex-col lg:items-start items-center">
            <div className="mt-10 xl:text-[35px] font-extrabold lg:text-[30px] text-[20px]">
              <span className="blue-color lg:px-10 px-6 bg-white py-4 rounded-bl-[27px] rounded-tr-[27px]">
                {formatDateRange(bannerdata.StartDate, bannerdata.EndDate)}
              </span>
            </div>
            <div className="sm:mt-10 mt-8 light-green w-[90%] md:px-10 px-4 md:py-4 py-3 2xl:text-[28px] lg:text-[22px] md:text-[18px] text-[12px] sm:text-[14px] font-bold rounded-bl-[18px] rounded-tr-[18px]">
              <span className=" line-clamp-3">
                Venue: <span className="font-light">{bannerdata.Venue}</span>
              </span>
            </div>
            <div className="sm:mt-10 mt-6">
              <span className="bold-blue md:px-10 px-4 md:py-4 py-3 2xl:text-[28px] lg:text-[22px] md:text-[18px] text-white sm:text-[14px] text-[12px] font-bold rounded-bl-[18px] rounded-tr-[18px]">
                Theme: <span className="font-light">{bannerdata.Theme}</span>
              </span>
            </div>

            <div className="sm:mt-10 mt-6">
              {bannerdata?.EndDate ? (
                <Timer targetDate={targetDate} />
              ) : (
                <p className="text-white">Loading countdown...</p>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-full w-[90%] mx-auto">
          <img
            src={all_banner.bannerSide || bannerImages.bannerImg}
            loading="lazy"
            className="mx-auto"
            alt="Conference Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner02;
