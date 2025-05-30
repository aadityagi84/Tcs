import { banner as all_banner } from "../../imagesProvider/AllImages";
import { conferenceDetails } from "../../static/banner";
import Timer from "../timer/Timer";

const Banner02 = ({ data }) => {
  const targetDate = new Date("October 25, 2025 00:00:00").getTime();
  console.log(data);

  return (
    <div className=" py-10 relative z-4 ">
      <div className="grid xl:grid-cols-[58%,1fr] items-center lg:gap-2 gap-10">
        <div>
          <h1 className="large_heading xl:leading-[64px] lg:leading-[50px] md:leading-[40px] lg:text-left text-center leading-[35px] text-white">
            {data.title}
          </h1>
          <div className="flex flex-col lg:items-start items-center">
            <div className="mt-10 xl:text-[35px] font-extrabold lg:text-[30px] text-[20px]">
              <span className="blue-color lg:px-10 px-6 bg-white py-4 rounded-bl-[27px] rounded-tr-[27px]">
                {data.dateRange.label}
              </span>
            </div>
            <div className="sm:mt-10 mt-8">
              <span className="light-green md:px-10 px-4 md:py-4 py-3 2xl:text-[28px] lg:text-[22px] md:text-[18px] text-[12px] sm:text-[14px] font-bold rounded-bl-[18px] rounded-tr-[18px]">
                <span className="font-light">{data.venue.label}</span>
              </span>
            </div>
            <div className="sm:mt-10 mt-6">
              <span className="bold-blue md:px-10 px-4 md:py-4 py-3 2xl:text-[28px] lg:text-[22px] md:text-[18px] text-white sm:text-[14px] text-[12px] font-bold rounded-bl-[18px] rounded-tr-[18px]">
                Theme: <span className="font-light">{data.theme.label}</span>
              </span>
            </div>

            <div className="sm:mt-10 mt-6">
              <Timer targetDate={targetDate} />
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
