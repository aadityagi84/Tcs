import React, { useState, useEffect } from "react";
import OrganizingTeam from "../../pages/OrganizingCommitteePage/OrganizingTeam";
import Header from "../Header/Header";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { getCommitteePageList } from "../../Services/services";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../footer/Footer";

const Organizing = () => {
  const [committeeData, setCommitteeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState({
    title: "Organizing Committee",
    description:
      "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the...",
    bannerImage: pagesBanner.banner,
  });

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const response = await getCommitteePageList();
        const committeeMembers = response.transformedCommitteeMembers || [];
        setCommitteeData(committeeMembers);

        setPageData({
          title: response.Name || "Organizing Committee",
          description:
            response.Title ||
            "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the...",
          bannerImage: response.BannerImage || pagesBanner.banner,
        });
      } catch (error) {
        console.error("Error fetching committee page data:", error);
        setError("Failed to load committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  return (
    <>
      <Header />
      <PageBanner
        title={pageData.title}
        subtitle={pageData.description}
        breadcrumb={`Home > ${pageData.title}`}
        backgroundImage={pageData.bannerImage}
      />
      <OrganizingTeam
        committeeData={committeeData}
        loading={loading}
        error={error}
      />
      <Footer />
    </>
  );
};

export default Organizing;
