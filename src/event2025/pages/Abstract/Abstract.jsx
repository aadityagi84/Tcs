import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PageBanner from "../PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../../components/footer/Footer";
import ApiService from "../../Services/services";
import Loader from "../Loader/Loader";
import AbstractDatacards from "./AbstractDatacards";
import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

const Abstract = () => {
  const [abstractData, setAbstractData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAbstract, setSelectedAbstract] = useState([null]);

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
    const fetchAllAbstracts = async () => {
      try {
        const response = await ApiService.getAbstractPageList();
        let formatted = [];

        if (response?.res?.rc) {
          const data = Array.isArray(response.res.rc)
            ? response.res.rc
            : [response.res.rc];

          formatted = data.map(formatAbstractItem);
        } else if (response?.res?.AbstractName) {
          formatted = [formatAbstractItem(response.res)];
        }

        setAbstractData(formatted);
      } catch (err) {
        console.error("Error loading abstract list:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAbstracts();
  }, []);

  useEffect(() => {
    fetchAbstractById(1);
  }, []);

  const fetchAbstractById = async (id) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.ABSTRACT_PAGE_LIST}?Id=${id}`
      );
      const result = response.data.rc;
      setSelectedAbstract(Array.isArray(result) ? result[0] : result || null);
    } catch (err) {
      console.error("Error loading abstract detail:", err);
    }
  };

  const formatAbstractItem = (item) => {
    const dateObj = item.DisplayDate ? new Date(item.DisplayDate) : new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      id: item.Id,
      title: item.AbstractName || "",
      month: monthNames[dateObj.getMonth()],
      day: dateObj.getDate(),
      year: dateObj.getFullYear(),
      status: item.IsOpen ? "Download Document" : "Closed",
      documentUrl: item.DocumentUrl || "",
      bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      statusColor: item.IsOpen ? "text-[#4AB518]" : "text-[#F96062]",
      isOpen: item.IsOpen,
      AbstractDescription: item.AbstractDescription,
    };
  };

  const groupedAbstractData = () => {
    const rows = [];
    for (let i = 0; i < abstractData.length; i += 3) {
      rows.push(abstractData.slice(i, i + 3));
    }
    return rows;
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-red-500">
          <h2 className="text-2xl font-bold">Failed to load data</h2>
          <p>Please check back later.</p>
        </div>
        <Footer />
      </>
    );
  }

  // console.log(selectedAbstract[0]);
  return (
    <>
      <Header />
      <PageBanner
        title="Abstract"
        subtitle=""
        breadcrumb="Home > Abstract"
        backgroundImage={pagesBanner.banner}
      />

      <div className="grid lg:grid-cols-[25%,1fr] md:grid-cols-[45%,1fr] px-10 py-10 gap-4">
        {/* Left Sidebar: Abstract List */}
        <div className=" min-h-[80vh] max-h-[100vh] overflow-y-auto border-r border-l hide-scrollbar px-4">
          {groupedAbstractData().length > 0 ? (
            groupedAbstractData().map((row, rowIndex) => (
              <div key={rowIndex} className="grid gap-4 pb-4">
                {row.map((item) => (
                  <AbstractDatacards
                    key={item.id}
                    {...item}
                    data={fetchAbstractById}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-600">
              <p>No abstract data found.</p>
            </div>
          )}
        </div>

        {/* Right Side: Selected Abstract Content */}
        <div>
          {selectedAbstract ? (
            <div className="border shadow-md p-10">
              <h2 className="text-[25px] font-semibold text-blue">
                {selectedAbstract.AbstractName}
              </h2>

              {selectedAbstract.AbstractDescription ? (
                <p
                  className="text-[18px] font-medium pt-3"
                  dangerouslySetInnerHTML={{
                    __html: selectedAbstract.AbstractDescription,
                  }}
                ></p>
              ) : (
                <p className="text-gray-500 italic">
                  📄 The description for this abstract is currently not
                  available. Please check back soon!
                </p>
              )}
            </div>
          ) : (
            <div className="text-center p-10 text-gray-500">
              <p>Select an abstract to view its details.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Abstract;
