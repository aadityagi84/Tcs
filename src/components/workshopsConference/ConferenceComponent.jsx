import React, { useState } from "react";
import { BsFillFolderFill } from "react-icons/bs";
import EventCard from "./EventCard";
import { HashLoader } from "react-spinners";

const ConferenceComponent = ({ apiData }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEventCounts = () => {
    if (!apiData || !apiData.YearWiseList) {
      return { upcoming: 0, past: 0 };
    }

    let upcomingCount = 0;
    let pastCount = 0;

    apiData.YearWiseList.forEach((yearData) => {
      if (apiData.Category === "CurrentAndUpcoming") {
        if (yearData.ConferanceList) {
          upcomingCount += yearData.ConferanceList.length;
        }
        if (yearData.WorkshopList) {
          upcomingCount += yearData.WorkshopList.length;
        }
      }
    });

    return { upcoming: upcomingCount, past: pastCount };
  };

  const eventCounts = getEventCounts();

  const eventCards = [
    {
      img: <BsFillFolderFill />,
      eventType: "Upcoming Workshops & Conference",
      type: "upcoming",
      count: eventCounts.upcoming,
    },
    {
      img: <BsFillFolderFill />,
      eventType: "Past Workshops & Conference",
      type: "past",
      count: eventCounts.past,
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

  if (!apiData) {
    return (
      <div className="flex items-center justify-center py-10">
        <HashLoader color="#0D3F78" />
        <span className="ml-3">Loading conference data...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
        {eventCards.map((data, index) => (
          <div
            key={index}
            className="bg-blue-200 rounded-[10px] p-6 cursor-pointer hover:shadow-md transition-shadow duration-300"
            onClick={() => handleClick(data)}
          >
            <div>
              <span className="text-[50px] text-yellow-600">{data.img}</span>
            </div>
            <div className="mt-4">
              <span className="font-semibold text-[16px] block">
                {data.eventType}
              </span>
              {data.count > 0 && (
                <span className="text-sm text-gray-600 mt-1 block">
                  ({data.count} {data.count === 1 ? "event" : "events"})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show loader */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <HashLoader color="#0D3F78" />
          <span className="ml-3">Loading events...</span>
        </div>
      )}

      {/* Show EventCard when page selected */}
      {selectedPage && <EventCard page={selectedPage} />}
    </div>
  );
};

export default ConferenceComponent;
