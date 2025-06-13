import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../Header/Header";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import DateCard from "../ImportantDates/DateCard";
import Footer from "../footer/Footer";
import ApiService from "../../Services/services";
import Loader from "../../pages/Loader/Loader";
import Workshop from "../Workshops/Workshop";

const Conference = () => {
  const [conferenceData, setConferenceData] = useState([]);
  const [conferenceMeta, setConferenceMeta] = useState(null); // ✅ Meta for DocumentUrl2 etc.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColors = [
    "bg-[#EEF5FF]",
    "light-green",
    "light_yellow_color",
    "orange_color",
    "light_blue",
    "bg-[#F8E3FB]",
    "extra_light",
  ];

  const getRandomBgColor = () => {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  };

  useEffect(() => {
    const fetchConferenceData = async () => {
      try {
        const response = await ApiService.getConferencePageList();
        // console.log(response, "from conf");

        let formattedData = [];

        if (response?.Id && response?.ConferanceName) {
          setConferenceMeta(response); // ✅ Save full response
          formattedData = [
            {
              title: response.EventName,
              documentUrl: response.DocumentUrl1 || "",
              isOpen: Boolean(response.DocumentUrl1),
              bgColor: getRandomBgColor(),
              statusColor: response.DocumentUrl1
                ? "text-[#4AB518]"
                : "text-[#F96062]",
              status: response.DocumentUrl1 ? "Download Document" : "Closed",
            },
          ];
        } else if (Array.isArray(response?.res)) {
          formattedData = response.res.map((item) => ({
            title: item.Name || "",
            documentUrl: item.DocumentUrl || "",
            isOpen: Boolean(item.DocumentUrl),
            bgColor: getRandomBgColor(),
            statusColor: item.DocumentUrl ? "text-[#4AB518]" : "text-[#F96062]",
            status: item.DocumentUrl ? "Download Document" : "Closed",
          }));
        }

        setConferenceData(formattedData);
      } catch (err) {
        console.error("Error fetching conference data:", err);
        setError("Failed to load conference data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchConferenceData();
  }, []);

  // Group cards into rows of 3
  const groupedData = [];
  for (let i = 0; i < conferenceData.length; i += 3) {
    groupedData.push(conferenceData.slice(i, i + 3));
  }

  return (
    <>
      <Header />
      <PageBanner
        title="Conference & Workshops"
        subtitle=""
        breadcrumb="Home > Conference"
        backgroundImage={pagesBanner.banner}
      />

      <div className="py-10">
        <div className="main-width">
          <h2 className="text-[35px] font-semibold">Conference:</h2>
        </div>

        <div>
          {loading ? (
            <div className="text-center py-8">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : conferenceData.length === 0 ? (
            <div className="text-center py-8">No conference data available</div>
          ) : (
            groupedData.map((row, idx) => (
              <div
                key={idx}
                className="grid main-width lg:grid-cols-3 py-2 gap-5 items-start"
              >
                {row.map((card, i) => (
                  <DateCard key={i} {...card} showDate={false} />
                ))}
              </div>
            ))
          )}

          {conferenceMeta?.DocumentUrl2 && (
            <div className="grid lg:grid-cols-3 main-width mt-10">
              <Link
                to={conferenceMeta.DocumentUrl2}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-4 w-full py-8 bg-green-100 rounded-tr-[20px] rounded-bl-[20px]">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-[25px] font-semibold">
                      Conference Travel Guide
                    </div>
                    <div className="text-green-600 font-semibold">
                      Open - Download Document
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Workshop />
      <Footer />
    </>
  );
};

export default Conference;
