import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Details = ({ societyData }) => {
  const renderDescription = () => {
    return { __html: societyData?.Description || "" };
  };

  return (
    <div className="">
      <div className="main-width">
        {/* <div className="mb-10">
          <h2 className="lg:text-[30px] md:text-[25px] text-[20px] font-bold lg:leading-[55px] md:leading-[45px] leading-[35px]">
            {societyData?.Title || "The Cytometry Society"}
          </h2>
        </div> */}

        <div className="lg:text-[20px] md:text-[17px] font-normal leading-[35px] lg:leading-[45px] space-y-4">
          <div dangerouslySetInnerHTML={renderDescription()} />
        </div>

        {/* <div className="my-10">
          <Link
            to="/membership" 
            className="inline-block bg-blue lg:text-[22px] lg:leading-[38px] text-[18px] leading-[28px] text-white px-10 py-3 rounded-tr-[20px] rounded-bl-[20px] hover:bg-blue-700 transition"
          >
            <span className="flex items-center gap-4">
              Become a Member <FaArrowRightLong />
            </span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Details;
