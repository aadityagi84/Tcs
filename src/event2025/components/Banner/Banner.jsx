import React from "react";
import Header from "../Header/Header";
import CountdownTimer from "../../pages/Timer/Timer";
import { bannerImages } from "../../imagesProvider/AllImages";

const Banner = ({ data }) => {
  const conferanceName = data?.ConferanceName || "The Cytometry Society-INDIA";
  const eventName =
    data?.EventName || "17th TCS Annual Conference & Workshop - 2025";
  const venue = data?.Venue || "ACTREC, ICMR-NIIH & ICMR-NIRRCH, Mumbai";
  const theme = data?.Theme || "Unraveling New Horizons of Cytometry";
  // console.log(data);

  const startDate = data?.StartDate
    ? new Date(data.StartDate)
    : new Date("October 22, 2025");
  const endDate = data?.EndDate
    ? new Date(data.EndDate)
    : new Date("October 25, 2025");

  let dateDisplay = "22nd - 25th October 2025";

  if (!isNaN(startDate) && !isNaN(endDate)) {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const month = startDate.toLocaleString("default", { month: "long" });
    const year = startDate.getFullYear();
    dateDisplay = `${startDay}${getOrdinalSuffix(
      startDay
    )} - ${endDay}${getOrdinalSuffix(endDay)} ${month} ${year}`;
  }

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  let targetDate;

  if (endDate && endDate > new Date()) {
    targetDate = endDate.getTime();
  } else {
    targetDate = new Date("October 25, 2025 23:59:59").getTime();
  }

  return (
    <div>
      {/* <!-- banner section  --> */}
      <section className="bg-[url(images/banner.png)] bg-cover bg-bottom xl:h-[1300px] pb-40 xl:pb-2 relative">
        {/* <!-- animation section --> */}
        <div className="absolute lg:block hidden h-full -left-[200px] -top-4 ">
          <img
            src={bannerImages.dna}
            loading="lazy"
            className="animate-pulse h-[80%]"
            alt="icon"
          />
        </div>
        <div className="absolute top-[22%] right-[30%]">
          <img
            src={bannerImages.avtar}
            loading="lazy"
            className="animate-spin-slow"
            alt="icon"
          />
        </div>
        <div className="absolute bottom-[30%] left-[42%] ">
          <img
            src={bannerImages.hexa}
            loading="lazy"
            className="duration-800 animate-pulse"
            alt="icon"
          />
        </div>

        {/* <!-- header section --> */}
        <Header />
        {/* <!-- header section ended --> <!-- banner section  --> */}
        <div className="mx-auto main-width py-10 relative z-4 mt-8">
          <div className="grid xl:grid-cols-[58%,1fr] items-center lg:gap-2 gap-10">
            <div className="">
              <h2 className="yellow-color xl:text-[32px] font-medium lg:text-[28px] lg:text-left text-center text-[20px]">
                {conferanceName}
              </h2>
              <h1 className="large_heading xl:leading-[64px] lg:leading-[50px] md:leading-[40px] lg:text-left text-center leading-[35px] text-white">
                {eventName}
              </h1>
              <div className="flex flex-col lg:items-start items-center">
                <div className="mt-10 xl:text-[35px] font-extrabold lg:text-[30px] text-[20px]">
                  <span className="blue-color lg:px-10 px-6 bg-white py-4 rounded-bl-[27px] rounded-tr-[27px]">
                    {dateDisplay}
                  </span>
                </div>
                <div className="sm:mt-10 mt-8">
                  <span className="light-green md:px-10 px-4 md:py-4 py-3 2xl:text-[28px] lg:text-[22px] md:text-[18px] text-[12px] sm:text-[14px] font-bold rounded-bl-[18px] rounded-tr-[18px]">
                    Venue: <span className="font-light">{venue}</span>
                  </span>
                </div>
                <div className="sm:mt-10 mt-6">
                  <span className="bold-blue md:px-10 px-4 md:py-4 py-3 2xl:text-[28px] lg:text-[22px] md:text-[18px] text-white sm:text-[14px] text-[12px] font-bold rounded-bl-[18px] rounded-tr-[18px]">
                    Theme: <span className="font-light">{theme}</span>
                  </span>
                </div>

                <div className="sm:mt-10 mt-6">
                  <CountdownTimer targetDate={targetDate} />
                </div>
              </div>
            </div>
            <div className="lg:w-full w-[90%] mx-auto  2xl:h-auto md:h-[550px] h-[400px] flex items-center justyify-center ">
              {/* src={data?.Image1 || bannerImages.bannerImg} */}
              <div className="relative mx-auto w-full  max-w-[400px] 2xl:max-w-auto rounded-tr-[49px]  ">
                <img
                  src={data?.Image1}
                  loading="lazy"
                  className=" rounded-tr-[49px] float-right   md:rounded-bl-[0px] rounded-bl-[49px]  object-cover"
                  alt="Conference Banner"
                />

                <div
                  className=" md:block hidden
      absolute
      left-4 sm:left-8 md:-left-24
      top-[180px] sm:top-[220px] 2xl:top-[250px]
      border-[7px] md:border-[15px]
      rounded-tr-[49px] rounded-bl-[49px]
      w-[120px] sm:w-[180px] md:w-[250px] xl:w-[300px]
      overflow-hidden
    "
                >
                  <img
                    src={data?.Image2}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    alt="Overlay Banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
