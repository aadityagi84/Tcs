import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import { FaArrowRightLong } from "react-icons/fa6";
import Notification from "../../Components/NotificationComponent/Notification";
import attach from "../../uploadPdf/attach-tcs-election-notice-2023.pdf";
import attach1 from "../../uploadPdf/nomination-form-tcs-elections-2023-25.pdf";

import { Link } from "react-router-dom";
// data/electionSchedule.js
export const electionSchedule = [
  {
    event: "Dispatch of Nomination Forms and Election Bye laws",
    date: "July 15, 2023",
  },
  {
    event: "Filing of nominations",
    date: "July 16, 2023–July 31, 2023",
  },
  {
    event: "Short listing of valid nominations",
    date: "August 5, 2023",
  },
  {
    event: "Withdrawing of nominations",
    date: "August 10, 2023",
  },
  {
    event: "Declaring positions to be contested",
    date: "August 14, 2023",
  },
  {
    event: "E-voting Process",
    date: "August 17–31, 2023",
  },
  {
    event: "Formal declaration of new members of EC",
    date: "September 15, 2023",
  },
  {
    event: "Handing over of the charge to the new EC",
    date: "October 26, 2023",
  },
];

const ElectionNotification = () => {
  return (
    <div>
      <Header />
      <PageBanner
        title={"Election Notification - 2023"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Election Notification-2023"
      />
      <div className="main-width py-10">
        <p className="pt-6 lg:text-[30px] md:text-[22px] text-[17px] font-bold lg:leading-[55px] md:leading-[45px]">
          Hereby inform all members of TCS that the notification for the
          Election of the Executive Committee (EC) is published here according
          to the{" "}
          <Link to="byLaws" className="text-blue-600 underline">
            {" "}
            bylaws.
          </Link>
        </p>
        <p className="lg:text-[20px] md:text-[18px] leading-[55px] font-bold pt-6">
          Filled nomination forms can be scanned and sent as soft copies by
          email to:{" "}
          <Link
            to="mailto:ilatimc@gmail.com"
            className="text-blue-600 underline"
          >
            ilatimc@gmail.com
          </Link>
          , or hard copies may be sent to the following address:
        </p>
        <div className="mt-6">
          <div className="lg:text-[20px] md:text-[18px] leading-[30px]">
            <span className="font-bold">Dr. Mitali Chatterjee</span> <br />
            Dept. of Pharmacology,
            <br />
            Institute of Post Graduate Medical Education and Research (IPGMER){" "}
            <br />
            244B, AJC Bose Road,
            <br />
            Kolkata - 700 020, INDIA
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-6 mt-10">
          <Link to={attach} target="_blank">
            <span className="bg-[#2B6DC0] rounded-tr-[5px]  xl:text-[22px] lg:text-[18px] sm:text-[16px] text-[13px] flex  items-center  gap-2 rounded-bl-[5px] px-6 py-4 text-white font-bold">
              Election Notification 2023{" "}
              <span className="yellow-color flex items-center gap-2">
                {" "}
                Click here <FaArrowRightLong className="text-white " />
              </span>{" "}
            </span>
          </Link>
          <Link to={attach1} target="_blank">
            <span className="bg-[#2B6DC0] rounded-tr-[5px] xl:text-[22px] lg:text-[18px]  sm:text-[16px] text-[13px]  flex  items-center  gap-2 rounded-bl-[5px] px-6 py-4 text-white font-bold">
              Nomination Form 2023
              <span className="yellow-color flex items-center gap-2">
                {" "}
                Click here <FaArrowRightLong className="text-white " />
              </span>{" "}
            </span>
          </Link>
        </div>
        <div className="py-10">
          <div className="grid grid-cols-[10px,1fr] items-center gap-4 mt-8">
            <div className={`bg-[#1560BD] h-full`}></div>
            <div
              className={`xl:text-[50px] lg:text-[40px] uppercase md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
            >
              <span>Important Dates:</span>
            </div>
          </div>
          <Notification data={electionSchedule} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ElectionNotification;
