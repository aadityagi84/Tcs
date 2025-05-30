import React from "react";
import Banner from "../Banner/Banner";
import Logos from "../../pages/logos/logos";
import WelcomeMessage from "../../pages/WelcomeMessage/WelcomeMessage";
import About from "../../pages/About/About";
import EventInfo from "../../pages/EventInfo/EventInfo";
import BrochureCarousel from "../BrochureCarousel/BrochureCarousel";
import Footer from "../footer/Footer";
import Loader from "../../pages/Loader/Loader";
import { useState, useEffect } from "react";
import apiService from "../../Services/HomePageService";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHomePageList();
        console.log("response comes from services ", response);
        setHomeData(response?.res);
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">Error loading page data</div>
      </div>
    );
  }

  return (
    <>
      <Banner data={homeData} />
      <Logos
        data={homeData}
        classes={`absolute -top-16 sm:-top-20 md:-top-24 lg:-top-28`}
      />
      <WelcomeMessage data={homeData} />
      <About data={homeData} />
      <EventInfo data={homeData} />
      <BrochureCarousel data={homeData} />
      <Footer />
    </>
  );
};

export default Home;
