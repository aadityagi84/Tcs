import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PageBanner from "../PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../../components/footer/Footer";
import ApiService from "../../Services/services";
import Loader from "../Loader/Loader";
import DateCard from "../../components/ImportantDates/DateCard";

const Abstract = () => {
  const [abstractData, setAbstractData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getAbstractPageList();

        let formattedData = [];

        if (response && response.res) {
          if (response.res.res && !Array.isArray(response.res.res)) {
            formattedData = [formatAbstractItem(response.res.res)];
          } else if (response.res.res && Array.isArray(response.res.res)) {
            formattedData = response.res.res.map((item) =>
              formatAbstractItem(item)
            );
          } else if (response.res.AbstractName) {
            formattedData = [formatAbstractItem(response.res)];
          }
        }

        setAbstractData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching abstract data:", err);
      }
    };

    fetchData();
  }, []);

  const getRandomBgColor = () => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  const formatAbstractItem = (item) => {
    const dateStr = item.DisplayDate || "";
    const dateObj = dateStr ? new Date(dateStr) : new Date();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const bgColor = getRandomBgColor();
    const statusColor = item.IsOpen ? "text-[#4AB518]" : "text-[#F96062]";

    return {
      title: item.AbstractName || "",
      month: monthNames[dateObj.getMonth()].substring(0, 3).toUpperCase(),
      day: dateObj.getDate(),
      year: dateObj.getFullYear(),
      status: item.IsOpen ? "Download Document" : "Closed",
      documentUrl: item.DocumentUrl || "",
      bgColor,
      statusColor,
      isOpen: item.IsOpen,
    };
  };

  const groupDataIntoRows = (data) => {
    if (!data) return [];

    const grouped = [];
    for (let i = 0; i < data.length; i += 3) {
      grouped.push(data.slice(i, i + 3));
    }
    return grouped;
  };

  const groupedAbstractData = abstractData
    ? groupDataIntoRows(abstractData)
    : [];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
          <p>Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PageBanner
        title="Abstract"
        subtitle="The Cytometry Society (TCS)-India and the Organizing Committee of the 18th Annual TCS and workshops cordially invite you to join the"
        breadcrumb="Home > Abstract"
        backgroundImage={pagesBanner.banner}
      />
      <div className="py-10">
        {groupedAbstractData.length > 0 ? (
          groupedAbstractData.map((row, idx) => (
            <div
              key={idx}
              className="grid main-width lg:grid-cols-3 py-2 gap-5 items-start"
            >
              {row.map((card, i) => (
                <DateCard key={i} {...card} />
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-lg">No abstract data available at the moment.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Abstract;
