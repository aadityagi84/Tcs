import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PageBanner from "../PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../../components/footer/Footer";
import societyApiService from "../../Services/services";
import Loader from "../Loader/Loader";

const Exhibition = () => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        const response = await societyApiService.getExhibitionPageList();
        if (
          response &&
          response.categories &&
          Array.isArray(response.categories)
        ) {
          setExhibitionData(response.categories);
        } else {
          setError(new Error("Invalid data structure received from API"));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exhibition data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchExhibitionData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't load the exhibition data. Please try refreshing the
              page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PageBanner
        title="Exhibition"
        subtitle="The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        breadcrumb="Home > Exhibition"
        backgroundImage={pagesBanner.banner}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Exhibition Categories */}
          {exhibitionData.length > 0 ? (
            <div className="space-y-20">
              {exhibitionData.map((category, categoryIndex) => (
                <div key={category.Id} className="relative">
                  {/* Category Header */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-3 mb-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {category.ExhibitionCategory}
                        <span className="text-blue-600 ml-2">Sponsors</span>
                      </h2>
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                  </div>

                  {/* Sponsors Grid */}
                  {category.ExhibitionImagesList &&
                  Array.isArray(category.ExhibitionImagesList) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {category.ExhibitionImagesList.map((sponsor, index) => (
                        <div
                          key={index}
                          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100 overflow-hidden"
                        >
                          {/* Background Pattern */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform translate-x-10 -translate-y-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

                          {/* Logo Container */}
                          <div className="relative z-10 flex items-center justify-center h-32">
                            <img
                              src={sponsor.ImageUrl}
                              alt={`${category.ExhibitionCategory} Sponsor ${
                                index + 1
                              }`}
                              className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/api/placeholder/200/80";
                                e.target.alt = "Sponsor Logo";
                              }}
                            />
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Images Available
                      </h3>
                      <p className="text-gray-500">
                        Images for this category will be available soon.
                      </p>
                    </div>
                  )}

                  {/* Decorative Element */}
                  {categoryIndex < exhibitionData.length - 1 && (
                    <div className="flex justify-center mt-20">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                Coming Soon
              </h3>
              <p className="text-lg text-gray-500 max-w-md mx-auto">
                Exhibitor information will be available soon. Stay tuned for
                updates!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Exhibition;
