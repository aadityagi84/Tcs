import React from "react";

const PageBanner = ({
  title,
  subtitle,
  breadcrumb,
  backgroundImage,
  societyData,
}) => {
  // Use BannerImage from API if available, otherwise use the provided default image
  const bannerImageUrl = societyData?.BannerImage
    ? societyData.BannerImage
    : backgroundImage;

  return (
    <div
      className=" lg:rounded-tl-[50px] rounded-tl-[25px]  lg:rounded-tr-[100px] rounded-tr-[50px] flex items-center  rounded-br-[15px] lg:rounded-br-[30px] lg:rounded-bl-[100px] rounded-bl-[50px] lg:h-[325px] w-[95%] mt-8 mx-auto text-white lg:p-10 p-6 "
      style={{
        backgroundImage: `url(${bannerImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="main-width ">
        <h1 className="xl:text-[50px] lg:text-[40px] md:text-[30px] text-[22px] font-bold">
          {title}
        </h1>
        <p className="mt-2 lg:text-[20px] md:text-[17px]  lg:max-w-2xl">
          {subtitle}
        </p>
        <div className="mt-4 font-bold leading-[15px] yellow-color ">
          {breadcrumb}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
