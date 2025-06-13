import React, { useState, useEffect } from "react";
import Faculty from "./Faculty";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import PageBanner from "../../pages/PageBanner/PageBanner";
import { getFacultyPageList } from "../../Services/services";
import { pagesBanner } from "../../imagesProvider/AllImages";
import { NavLink } from "react-router-dom";

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

  // console.log(facultyData.length);/
  return (
    <div>
      <Header />
      <PageBanner
        title={pageData.title}
        subtitle={""}
        breadcrumb={`Home > ${pageData.title}`}
        backgroundImage={pageData.bannerImage}
      />
      {facultyData.length > 0 ? (
        <Faculty facultyData={facultyData} loading={loading} error={error} />
      ) : (
        <div
          className="min-h-screen flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(135deg,rgba(255, 255, 255, 0.58),rgb(255, 255, 255))",
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-black mb-4">
            Great things coming soon.
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-8">
            We are a small and growing consulting firm with big ideas.
          </p>
          <NavLink to="/">
            <button className="px-6 py-2 border border-black rounded hover:bg-black hover:text-white transition duration-300 text-sm sm:text-base">
              LEARN MORE →
            </button>
          </NavLink>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FacultyIndex;
