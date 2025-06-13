import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { GetAnnualMeetingPageDetailsList } from "../../services/HomeService";

const AnnualMeetingComponent = ({ meetingId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (meetingId) {
      fetchMeetingImages();
    }
  }, [meetingId]);

  const fetchMeetingImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await GetAnnualMeetingPageDetailsList(1, 100, meetingId);

      if (response.meetingDetails && response.meetingDetails.length > 0) {
        const imageUrls = response.meetingDetails.map((detail) => detail.Image);
        setImages(imageUrls);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching meeting images:", error);
      setError("Failed to load images");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600">Loading images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600">
          No images available for this meeting
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-hidden">
      {/* Row 1 */}
      <Marquee speed={40} className="py-2" pauseOnHover gradient={false}>
        {images.map((img, idx) => (
          <div key={idx} className="mx-2">
            <img
              src={img}
              alt={`Annual meeting photo ${idx + 1}`}
              className="w-[400px] h-[300px] object-cover rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                console.error(`Failed to load image: ${img}`);
              }}
            />
          </div>
        ))}
      </Marquee>

      {/* Row 2 (reverse) */}
      <div className="py-2">
        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
          direction="right"
          className="py-4"
        >
          {images.map((img, idx) => (
            <div key={`rev-${idx}`} className="mx-2">
              <img
                src={img}
                alt={`Annual meeting photo reverse ${idx + 1}`}
                className="w-[400px] h-[300px] object-cover rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.error(`Failed to load image: ${img}`);
                }}
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Row 3 */}
      <Marquee speed={40} className="py-2" pauseOnHover gradient={false}>
        {images.map((img, idx) => (
          <div key={`third-${idx}`} className="mx-2">
            <img
              src={img}
              alt={`Annual meeting photo third row ${idx + 1}`}
              className="w-[400px] h-[300px] object-cover rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                console.error(`Failed to load image: ${img}`);
              }}
            />
          </div>
        ))}
      </Marquee>

      {/* Row 4 (reverse) */}
      <div className="py-2">
        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
          direction="right"
          className="py-4"
        >
          {images.map((img, idx) => (
            <div key={`fourth-${idx}`} className="mx-2">
              <img
                src={img}
                alt={`Annual meeting photo fourth row ${idx + 1}`}
                className="w-[400px] h-[300px] object-cover rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.error(`Failed to load image: ${img}`);
                }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AnnualMeetingComponent;
