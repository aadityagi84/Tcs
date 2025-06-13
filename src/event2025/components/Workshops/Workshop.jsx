import { pagesBanner } from "../../imagesProvider/AllImages";
import PageBanner from "../../pages/PageBanner/PageBanner";
import Footer from "../footer/Footer";
import Header from "../Header/Header";
import DateCard from "../ImportantDates/DateCard";
import { useEffect, useState } from "react";
import ApiService from "../../Services/services";
import Loader from "../../pages/Loader/Loader";

const Workshop = () => {
  const [workshopData, setWorkshopData] = useState([]);
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
    const fetchWorkshopData = async () => {
      try {
        const response = await ApiService.getWorkshopPageList();
        // console.log(response.rc, "from workshop");

        if (response) {
          if (!Array.isArray(response.rc)) {
            const workshop = response.rc;
            const dateStr = workshop.StartDate || "";

            const dateObj = dateStr ? new Date(dateStr) : new Date();
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "June",
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];

            const workshopItem = {
              title: workshop.Name || "",
              month: monthNames[dateObj.getMonth()]
                .substring(0, 3)
                .toUpperCase(), // "OCT"
              day: dateObj.getDate(), // 30
              year: dateObj.getFullYear(), // 2025
              status: "Download Brochure",
              documentUrl: workshop.DocumentUrl || "",
              bgColor: getRandomBgColor(),
              statusColor: "text-[#4AB518]",
              isOpen: true,
            };

            setWorkshopData([workshopItem]);
          } else {
            const formattedData = response.rc.map((workshop) => {
              const dateStr = workshop.StartDate || "";
              const dateObj = dateStr ? new Date(dateStr) : new Date();
              const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              return {
                title: workshop.Name || "",
                month: monthNames[dateObj.getMonth()]
                  .substring(0, 3)
                  .toUpperCase(), // "OCT"
                day: dateObj.getDate(), // 30
                year: dateObj.getFullYear(), // 2025
                status: "Download Brochure",
                documentUrl: workshop.DocumentUrl || "",
                bgColor: getRandomBgColor(),
                statusColor: "text-[#4AB518]",
                isOpen: true,
              };
            });

            setWorkshopData(formattedData);
          }
        } else {
          console.error("Invalid API response structure:", response);
          setError("Received invalid data format from server");
          setWorkshopData([]);
        }
      } catch (err) {
        console.error("Error fetching workshop data:", err);
        setError("Failed to load workshop data. Please try again later.");
        setWorkshopData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshopData();
  }, []);

  const grouped = [];
  for (let i = 0; i < workshopData.length; i += 3) {
    grouped.push(workshopData.slice(i, i + 3));
  }

  // console.log(workshopData, "frpmiugit ");
  return (
    <>
      {/* <Header />
      <PageBanner
        title="Workshops"
        subtitle="The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the..."
        breadcrumb="Home > Workshops"
        backgroundImage={pagesBanner.banner}
      /> */}

      <div className="py-10">
        <div className="main-width ">
          <h2 className="text-[35px] font-semibold ">Workshops:</h2>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : workshopData.length === 0 ? (
          <div className="text-center py-10">
            No workshops available at the moment.
          </div>
        ) : (
          grouped.map((row, idx) => (
            <div
              key={idx}
              className="grid main-width lg:grid-cols-3 py-2 gap-5 items-start"
            >
              {row.map((card, i) => {
                // console.log(card);
                return (
                  <DateCard
                    key={i}
                    month={card.month}
                    day={card.day}
                    year={card.year}
                    title={card.title}
                    status={card.status}
                    bgColor={card.bgColor}
                    statusColor={card.statusColor}
                    documentUrl={card.documentUrl}
                    isOpen={true}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Workshop;
