import React from "react";
import { Link } from "react-router-dom";

const BannerContent01 = () => {
  return (
    <div>
      <div className="  !h-[800px] flex items-center  ">
        <div className="2xl:w-[50%] xl:w-[60%] lg:w-[70%]">
          <h2 className="large_heading xl:leading-[64px] lg:leading-[50px] md:leading-[40px] lg:text-left text-center leading-[35px] text-white">
            Welcome to The Cytometry Society
          </h2>
          <p className="lg:text-left text-center pt-10 text-white lg:text-[21px] md:text-[18px]">
            The Cytometry Society (TCS)-India and the Organizing Committee of
            the 16th Annual TCS and workshops cordially invite you to join the
            16th TCS 2024 in Navi Mumbai/Mumbai to participate in one of the
            most celebrated academic events in Indian flow cytometry. 
          </p>
          <div className="mt-10 flex items-center lg:justify-start justify-center">
            <Link to="/event2025">
              <span className="uppercase px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] font-bold text-[15px] black_color yellow_color">
                Our Mission
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContent01;
