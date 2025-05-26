import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PageBanner from "../PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../../components/footer/Footer";
import societyApiService from "../../Services/services";
import Loader from "../Loader/Loader";

const AnnualAwards = () => {
  const [awardsData, setAwardsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await societyApiService.getAwardsPageList();
        setAwardsData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching awards data:", err);
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
        title="Annual Awards"
        subtitle="The Cytometry Society (TCS)-India and the Organizing Committee of the 18th Annual TCS and workshops cordially invite you to join the"
        breadcrumb="Home > Annual Awards"
        backgroundImage={pagesBanner.banner}
      />

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">{awardsData?.Title || ""}</h2>

        {awardsData?.htmlDescription && (
          <div
            className="mb-8"
            dangerouslySetInnerHTML={{ __html: awardsData.htmlDescription }}
          />
        )}

        {awardsData?.DocumentUrl && (
          <div className="mt-8 mb-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4">
              Download Application Form
            </h3>
            <a
              href={awardsData.DocumentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download Form
            </a>
          </div>
        )}

        {awardsData?.DocumentUrl2 && (
          <div className="mt-4 mb-8 flex flex-col items-center justify-center">
            <a
              href={awardsData.DocumentUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Download Additional Document
            </a>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AnnualAwards;
