import React, { useEffect, useState } from "react";
import Logos from "../../pages/logos/logos";
import homeApiService from "../../Services/HomePageService";
import { FaCircleCheck } from "react-icons/fa6";

import { headerImages } from "../../imagesProvider/AllImages";

const Receipt = ({ data }) => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    // for logos onj reciept
    const fetchHomeData = async () => {
      try {
        const response = await homeApiService.getHomePageList();
        setHomeData(response?.res);
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };

    fetchHomeData();
  }, []);
  console.log("reciept", data);

  return (
    <div className="main-width mx-auto py-10 bg-white border border-gray-300 shadow-lg md:p-6 p-4 rounded-md font-sans text-[14px]">
      {/* Header */}
      <div className="flex items-center sm:flex-row flex-col sm:justify-between justify-center border-b pb-4 mb-4">
        <img
          src={headerImages.logo}
          alt="The Cytometry Society - India"
          className="lg:w-[180px] xl:w-[220px] md:w-[160px] w-[150px]"
        />
        <div className="sm:text-right text-center">
          <h1 className="text-[16px] font-bold text-[#0071BC]">
            17<sup>th</sup> TCS Annual Conference & Workshop – 2025
          </h1>
          <p className="text-xs">
            22th – 25th October 2025 | Venue: ACTREC, TMC-INHS &
            CMD-NIRRCH-Mumbai
          </p>
          <p className="text-xs italic">
            Theme: Unraveling New Horizons of Cytometry
          </p>
        </div>
      </div>

      {/* Registration Status */}
      <div className="text-center mt-10 rounded">
        <span className="xl:text-[30px] bg-blue-100 px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] font-semibold text-blue-700">
          <span className="font-bold">Registration</span> Receipt
        </span>
      </div>
      <div className="flex items-center justify-center flex-col py-10 ">
        <div className="bg-green-100 px-10 py-12 rounded-tr-[20px]  rounded-bl-[20px]  animate-fade-in-up text-center max-w-xl w-full border border-green-200">
          <div className="flex items-center justify-center mb-4">
            <FaCircleCheck className="text-green-600 text-5xl  animate-pop-in" />
          </div>
          <h2 className="text-green-800 text-2xl md:text-3xl font-semibold mb-2 animate-fade-in">
            Registration Confirmed!
          </h2>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-4 mt-10 text-sm">
        <div className="bg-blue-50 p-3 rounded">
          <strong>Registration No:</strong>{" "}
          <span className="font-medium text-sm"> {data?.RegistrationNo}</span>
        </div>
        <div className="bg-blue-50 p-3 rounded text-right">
          <strong>Registration Date:</strong>
          <span className="font-medium text-sm"> {data?.DateCreated}</span>
        </div>

        <div className="col-span-2">
          <table className="w-full mt-4 border border-collapse border-gray-300">
            <tbody>
              <tr className="bg-blue-50">
                <td className="border px-3 py-2 font-medium">Name:</td>
                <td className="border px-3 py-2">{`${data?.FirstName} ${data?.LastName}`}</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-medium">Category:</td>
                <td className="border px-3 py-2">{data?.CategoryName}</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border px-3 py-2 font-medium">Workshop(s):</td>
                <td className="border px-3 py-2">
                  {[data?.WorkShopDay1, data?.WorkShopDay2, data?.WorkShopDay3]
                    .filter(Boolean)
                    .join(", ")}
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-medium">Address:</td>
                <td className="border px-3 py-2">{data?.Address}</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border px-3 py-2 font-medium">
                  Total Paid Amount:
                </td>
                <td className="border px-3 py-2 font-bold text-indigo-600">
                  {`${data.CurrencyId === 1 ? "₹" : "$"}    ${data?.Amount}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="font-medium mt-4">
        <p>
          This is an electronically generated receipt, no signature is required.
        </p>
        <p className="font-bold mt-2 text-center lg:text-[25px] pt-10 text-[20px]">
          Thank you for Registration
        </p>
      </div>

      {/* Logos */}
      <div className="relative min-h-[180px] mt-14">
        <Logos data={homeData} classes={`top-0`} />
      </div>
    </div>
  );
};

export default Receipt;
