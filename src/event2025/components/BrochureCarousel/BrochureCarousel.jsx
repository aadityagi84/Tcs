import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./BrochureCarousel.css";
import { bannerImages } from "../../imagesProvider/AllImages";

const BrochureCarousel = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use DocumentsList from API data if available, otherwise use fallback images
  const documentsList = data?.DocumentsList || [];
  const fallbackImages = [
    bannerImages.b1,
    bannerImages.b2,
    bannerImages.b3,
    bannerImages.b3,
  ];

  // Determine which images to display
  const displayItems =
    documentsList.length > 0
      ? documentsList
      : fallbackImages.map((src, index) => ({
          Name: `Brochure ${index + 1}`,
          DocumentType: "fallbackImage",
          DocumentUrl: src,
        }));

  const handleItemClick = (item, index) => {
    const docType = item.DocumentType.toLowerCase();

    if (docType === "pdf") {
      // Download the PDF file
      const link = document.createElement("a");
      link.href = item.DocumentUrl;
      link.download = item.Name || "brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (
      docType === "png" ||
      docType === "jpg" ||
      docType === "jpeg" ||
      docType === "fallbackimage"
    ) {
      // Show the image in a modal popup
      setSelectedImage(item.DocumentUrl);
      setCurrentIndex(index);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % displayItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(displayItems[nextIndex].DocumentUrl);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const prevIndex =
      (currentIndex - 1 + displayItems.length) % displayItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(displayItems[prevIndex].DocumentUrl);
  };

  return (
    <section className="py-10">
      <div className="main-width">
        <h2 className="mid_heading">Download Brochure</h2>
        <div className="w-[110px] h-[6px] blue_background"></div>
        <div className="mt-10">
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              focus: "center",
              autoplay: true,
              interval: 8000,
              flickMaxPages: 3,
              updateOnMove: true,
              pagination: true,
              throttle: 300,
              breakpoints: {
                1440: { perPage: 2, padding: "20%" },
                1024: { perPage: 1, padding: "10%" },
                640: { perPage: 1, padding: "5%" },
              },
            }}
            aria-label="Brochure Slider"
          >
            {displayItems.map((item, index) => (
              <SplideSlide
                key={index}
                onClick={() => handleItemClick(item, index)}
              >
                <div className="cursor-pointer relative group">
                  <img
                    src={item.DocumentUrl}
                    alt={item.Name || `brochure-${index + 1}`}
                    className="w-full h-auto"
                  />
                  {item.DocumentType.toLowerCase() === "pdf" && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-white text-lg font-medium">
                        Click to download PDF
                      </span>
                    </div>
                  )}
                  {(item.DocumentType.toLowerCase() === "png" ||
                    item.DocumentType.toLowerCase() === "jpg" ||
                    item.DocumentType.toLowerCase() === "jpeg" ||
                    item.DocumentType.toLowerCase() === "fallbackimage") && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-white text-lg font-medium">
                        Click to view
                      </span>
                    </div>
                  )}
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>

      {/* Image Modal with External Navigation */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-screen p-4 flex flex-col items-center">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-800 hover:bg-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Brochure preview"
              className="max-w-full max-h-[70vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* External Navigation Buttons */}
            <div
              className="flex justify-center mt-4 space-x-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous button */}
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow flex items-center transition-all duration-200"
                onClick={goToPrevious}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>

              {/* Image counter */}
              <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm flex items-center justify-center min-w-[80px]">
                {currentIndex + 1} / {displayItems.length}
              </div>

              {/* Next button */}
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow flex items-center transition-all duration-200"
                onClick={goToNext}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BrochureCarousel;
