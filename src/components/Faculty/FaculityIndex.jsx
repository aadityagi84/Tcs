import React, { useState, useEffect } from "react";
import Faculty from "./Faculty";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { getFacultyPageList } from "../../Services/services";
import { pagesBanner } from "../../imagesProvider/AllImages";

const FacultyIndex = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState({
    title: "Faculty",
    description:
      "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the...",
    bannerImage: pagesBanner.banner,
  });

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const response = await getFacultyPageList();

        let facultyMembers = [];

        if (response.FacultyDetailsList) {
          response.FacultyDetailsList.forEach((category) => {
            if (
              category.FacultyCatWise &&
              Array.isArray(category.FacultyCatWise)
            ) {
              const members = category.FacultyCatWise.map((member) => ({
                id: member.Id,
                name: member.Name,
                role: member.CategoryName,
                title: member.Designation,
                education: member.Education,
                image: member.Image,
                category: category.FacultyCategory,
              }));
              facultyMembers = [...facultyMembers, ...members];
            }
          });
        } else if (response.transformedFacultyMembers) {
          facultyMembers = response.transformedFacultyMembers;
        }

        setFacultyData(facultyMembers);

        setPageData({
          title: response.Name || "Faculty",
          description:
            response.Title ||
            "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the...",
          bannerImage: response.BannerImage || pagesBanner.banner,
        });
      } catch (error) {
        console.error("Error fetching faculty page data:", error);
        setError("Failed to load faculty data");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  return (
    <div>
      <Header />
      <PageBanner
        title={pageData.title}
        subtitle={pageData.description}
        breadcrumb={`Home > ${pageData.title}`}
        backgroundImage={pageData.bannerImage}
      />
      <Faculty facultyData={facultyData} loading={loading} error={error} />
      <Footer />
    </div>
  );
};

export default FacultyIndex;
