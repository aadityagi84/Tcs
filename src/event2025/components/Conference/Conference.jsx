import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import DateCard from "../ImportantDates/DateCard";
import Footer from "../footer/Footer";
import ApiService from "../../Services/services";
import Loader from "../../pages/Loader/Loader";

const Conference = () => {
  const [conferenceData, setConferenceData] = useState([]);
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
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  useEffect(() => {
    const fetchConferenceData = async () => {
      try {
        const response = await ApiService.getConferencePageList();

        if (response && response.Id && response.Name) {
          const singleItem = {
            title: response.Name,
            documentUrl: response.DocumentUrl || "",
            isOpen: Boolean(response.DocumentUrl),
            bgColor: getRandomBgColor(),
            statusColor: "text-[#4AB518]",
            status: response.DocumentUrl ? "Download Document" : "Closed",
          };

          setConferenceData([singleItem]);
        } else if (response && Array.isArray(response.res)) {
          const formattedData = response.res.map((item) => ({
            title: item.Name || "",
            documentUrl: item.DocumentUrl || "",
            isOpen: Boolean(item.DocumentUrl),
            bgColor: getRandomBgColor(),
            statusColor: item.DocumentUrl ? "text-[#4AB518]" : "text-[#F96062]",
            status: item.DocumentUrl ? "Download Document" : "Closed",
          }));

          setConferenceData(formattedData);
        } else {
          setConferenceData([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching conference data:", err);
        setError("Failed to load conference data. Please try again later.");
        setLoading(false);
      }
    };

    fetchConferenceData();
  }, []);

  const groupedData = [];
  for (let i = 0; i < conferenceData.length; i += 3) {
    groupedData.push(conferenceData.slice(i, i + 3));
  }

  return (
    <>
      <Header />
      <PageBanner
        title="Conference"
        subtitle="The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the..."
        breadcrumb="Home > Conference"
        backgroundImage={pagesBanner.banner}
      />

      <div className="py-10">
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
      </div>

      <Footer />
    </>
  );
};

export default Conference;
