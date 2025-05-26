import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PageBanner from "../PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../../components/footer/Footer";
import { getDynamicRegistrationPricing } from "../../Services/services";
import Loader from "../Loader/Loader";

const Registration = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [pricingData, setPricingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDynamicRegistrationPricing();
        setPricingData(data);
        // console.log("data from tables", data);

        setRegistrationData({
          Name: "Registration",
          Title:
            "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the",
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching registration data:", err);
      }
    };

    fetchData();
  }, []);

  const getEventRowColor = (eventType) => {
    return "bg-blue-50";
  };

  const getUserTypeRowColor = (userType) => {
    const colorMap = {
      Member: "#ededed",
      "Non-Member": "#ffffff",
      Student: "#ededed",
      Faculty: "#fffff",
      "Life Member": "#DDEEFF",
      "Only For Non Lifetime Member": "#C2F4F7",
      "Life membership+": "#CAE5FB",
    };
    return colorMap[userType] || "#FFFFFF";
  };

  const renderPricingTable = (regionData) => {
    if (!regionData || !regionData.Data || regionData.Data.length === 0) {
      return null;
    }

    const groupedData = regionData.Data.reduce((acc, item) => {
      if (!acc[item.EventType]) {
        acc[item.EventType] = [];
      }
      acc[item.EventType].push(item);
      return acc;
    }, {});

    const eventTypes = Object.keys(groupedData);

    const pricingColumns = Object.keys(regionData.Data[0] || {}).filter(
      (key) => !["EventType", "UserType"].includes(key) && !key.endsWith("Id")
    );

    return (
      <div className="mb-2">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse border border-gray-400">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th
                  className="border border-gray-400 px-3 py-2 text-center font-bold"
                  style={{ width: "160px", minWidth: "160px" }}
                >
                  Event
                </th>
                <th
                  className="border border-gray-400 px-3 py-2 text-center font-bold"
                  style={{ width: "180px", minWidth: "180px" }}
                >
                  Category
                </th>
                {pricingColumns.map((column) => {
                  const columnParts = column.split("(");
                  const mainTitle = columnParts[0].trim();
                  const subTitle = columnParts[1]
                    ? columnParts[1].replace(")", "").trim()
                    : "";

                  return (
                    <th
                      key={column}
                      className="border border-gray-400 px-3 py-2 text-center font-bold"
                      style={{ width: "140px", minWidth: "140px" }}
                    >
                      <div>{mainTitle}</div>
                      {subTitle && (
                        <div className="text-sm font-normal mt-1">
                          {subTitle}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {eventTypes.map((eventType) => {
                const eventData = groupedData[eventType];
                return eventData.map((item, index) => (
                  <tr key={`${eventType}-${index}`}>
                    {index === 0 && (
                      <td
                        className={`border border-gray-400 px-3 py-2 text-center font-bold ${getEventRowColor(
                          eventType
                        )} align-middle`}
                        rowSpan={eventData.length}
                        style={{ width: "160px", minWidth: "160px" }}
                      >
                        {eventType}
                      </td>
                    )}
                    <td
                      style={{
                        backgroundColor: getUserTypeRowColor(item.UserType),
                        width: "180px",
                        minWidth: "180px",
                      }}
                      className="border border-gray-400 px-3 py-2 text-center font-bold"
                    >
                      {item.UserType}
                    </td>
                    {pricingColumns.map((column) => (
                      <td
                        key={column}
                        className="border border-gray-400 px-3 py-2 text-center font-bold bg-white"
                        style={{ width: "140px", minWidth: "140px" }}
                      >
                        {item[column]}
                      </td>
                    ))}
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) return <Loader />;

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
        title={registrationData?.Name || "Registration"}
        subtitle={registrationData?.Title || ""}
        breadcrumb="Home > Registration"
        backgroundImage={pagesBanner.banner}
        registrationData={registrationData}
      />

      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8 md:py-10">
        {pricingData && pricingData.length > 0 ? (
          pricingData.map((regionData) => (
            <div key={regionData.Region} className="mb-8">
              <div className="bg-blue-800 text-white p-4 font-bold text-base border border-gray-400 border-b-0">
                {regionData.Region === "Indian"
                  ? "For delegates of Indian Origin ₹"
                  : "For Overseas delegates US $(GST+Taxes applicable)"}
              </div>
              {renderPricingTable(regionData)}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No pricing data available</p>
          </div>
        )}

        <div className="mb-8">
          <a
            href="/signin"
            className="inline-block bg-blue-600 text-white py-2 px-4 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Online Registration →
          </a>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cancellation Policy:</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Cancellation of registration will be made by email to the
              conference organizers.
            </li>
            <li>Up to 30th September – 50 % refund of registration fee</li>
            <li>After 1st October – No refund</li>
            <li>GST & Bank Convenience charges are Non-refundable</li>
            <li>All refunds will be done after the conference.</li>
          </ol>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Registration;
