import { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import ConferenceComponent from "../../Components/workshopsConference/ConferenceComponent";
import { Outlet } from "react-router-dom";
import { GetWorkshopandConferancePageList } from "../../services/HomeService";

const WorkshopsConference = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetWorkshopandConferancePageList();
        setApiData(data);
      } catch (err) {
        setError("Failed to load conference data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentEventsInfo = () => {
    if (
      !apiData ||
      !apiData.YearWiseList ||
      apiData.YearWiseList.length === 0
    ) {
      return "The Cytometry Society (TCS)-India and the Organizing Committee cordially invite you to join our workshops and conferences.";
    }

    const currentYear = new Date().getFullYear();
    const currentYearData = apiData.YearWiseList.find(
      (year) => year.Year === currentYear
    );

    if (
      currentYearData &&
      currentYearData.ConferanceList &&
      currentYearData.ConferanceList.length > 0
    ) {
      const firstEvent = currentYearData.ConferanceList[0];
      return `The Cytometry Society (TCS)-India and the Organizing Committee of the ${firstEvent.EventName} cordially invite you to join the`;
    }

    return "The Cytometry Society (TCS)-India and the Organizing Committee cordially invite you to join our workshops and conferences.";
  };

  if (loading) {
    return (
      <div>
        <Header />
        <PageBanner
          title={"Workshops & Conferences"}
          subtitle={"Loading conference information..."}
          breadcrumb="Home > Workshops & Conferences"
        />
        <div className="main-width py-10">
          <div className="flex justify-center items-center h-32">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <PageBanner
          title={"Workshops & Conferences"}
          subtitle={"Error loading conference information"}
          breadcrumb="Home > Workshops & Conferences"
        />
        <div className="main-width py-10">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <PageBanner
        title={"Workshops & Conferences"}
        subtitle={getCurrentEventsInfo()}
        breadcrumb="Home > Workshops & Conferences"
      />
      <div className="main-width py-10">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px] xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px] text-[#1d1e1c] font-light`}
          >
            <span>Workshops & Conferences</span>
          </div>
        </div>
        <div className="mt-10">
          <ConferenceComponent apiData={apiData} />{" "}
          {/* Pass apiData as a prop */}
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkshopsConference;
