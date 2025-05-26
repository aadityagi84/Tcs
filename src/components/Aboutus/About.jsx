import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../footer/Footer";
import Details from "../../pages/AboutusComponent/Details";
import societyApiService from "../../Services/SocietyApiService";
import Loader from "../../pages/Loader/Loader";

const About = () => {
  const [societyData, setSocietyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await societyApiService.getSocietyPageList();
        setSocietyData(data.res);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching society data:", err);
      }
    };

    fetchData();
  }, []);

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
        title={societyData?.Name || "About Society"}
        subtitle={societyData?.Title || ""}
        breadcrumb="Home > About Society"
        backgroundImage={pagesBanner.banner}
        societyData={societyData}
      />
      <div className="py-10">
        {societyData && <Details societyData={societyData} />}
      </div>
      <Footer />
    </>
  );
};

export default About;
