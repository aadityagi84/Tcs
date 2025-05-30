import React, { useState } from "react";
import { BsFillFolderFill } from "react-icons/bs";
import EventCard, { cardData } from "./EventCard";
import Loader from "../Loader/Loader";
import { HashLoader } from "react-spinners";

const ConferenceComponent = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const eventCards = [
    {
      img: <BsFillFolderFill />,
      eventType: "Upcoming Workshops & Conference",
      type: "upcoming",
    },
    {
      img: <BsFillFolderFill />,
      eventType: "Past Workshops & Conference",
      type: "past",
    },
  ];

  const handleClick = (eventCard) => {
    setLoading(true);
    setSelectedPage(null);

    setTimeout(() => {
      setSelectedPage(eventCard.type);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
        {eventCards.map((data, index) => (
          <div
            key={index}
            className="bg-blue-200 rounded-[10px] p-6 cursor-pointer hover:shadow-md"
            onClick={() => handleClick(data)}
          >
            <div>
              <span className="text-[50px] text-yellow-600">{data.img}</span>
            </div>
            <div className="mt-4">
              <span className="font-semibold">{data.eventType}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show loader */}

      {loading && (
        <div className="flex items-center   justify-center  py-10">
          <HashLoader color="#0D3F78" />
        </div>
      )}

      {/* Show EventCard when page selected */}
      {selectedPage && <EventCard page={selectedPage} />}
    </div>
  );
};

export default ConferenceComponent;
