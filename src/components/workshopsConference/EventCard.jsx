import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetWorkshopandConferancePageList } from "../../services/HomeService";

const EventCard = ({ page }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetWorkshopandConferancePageList();
        setEventData(data);
      } catch (err) {
        setError("Failed to fetch event data");
        console.error("Error fetching event data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    if (start && end && start !== end) {
      return `${start} - ${end}`;
    }
    return start || end || "";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="p-6">
        <div className="text-center">No event data available.</div>
      </div>
    );
  }

  let selectedEvents = [];

  if (page === "upcoming") {
    if (eventData.Category === "CurrentAndUpcoming" && eventData.YearWiseList) {
      eventData.YearWiseList.forEach((yearData) => {
        if (yearData.ConferanceList) {
          selectedEvents = [
            ...selectedEvents,
            ...yearData.ConferanceList.map((event) => ({
              ...event,
              type: "conference",
              year: yearData.Year,
            })),
          ];
        }
        if (yearData.WorkshopList) {
          selectedEvents = [
            ...selectedEvents,
            ...yearData.WorkshopList.map((event) => ({
              ...event,
              type: "workshop",
              year: yearData.Year,
            })),
          ];
        }
      });
    }
  } else if (page === "past") {
    // For past events, you might need to call a different API endpoint
    // or filter based on dates. For now, I'll show a placeholder
    selectedEvents = [];
  }

  return (
    <div className="p-6">
      <h2 className="lg:text-2xl md:text-xl text-[18px] font-bold mb-4 capitalize">
        {page} Workshops & Conferences
      </h2>

      {selectedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedEvents.map((event, idx) => (
            <div
              key={event.Id || idx}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0D3F78] to-[#1560BD] p-4">
                <h3 className="font-bold text-[18px] text-white leading-tight">
                  {event.EventName || event.ConferanceName}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="space-y-3 text-[14px] text-[#333333] mb-6">
                  {event.Theme && (
                    <div className="flex items-start">
                      <span className="font-semibold text-[#0D3F78] min-w-[80px]">
                        Theme:
                      </span>
                      <span className="ml-2 flex-1">{event.Theme}</span>
                    </div>
                  )}
                  {(event.StartDate || event.EndDate) && (
                    <div className="flex items-start">
                      <span className="font-semibold text-[#0D3F78] min-w-[80px]">
                        Dates:
                      </span>
                      <span className="ml-2 flex-1">
                        {formatDateRange(event.StartDate, event.EndDate)}
                      </span>
                    </div>
                  )}
                  {/* {event.ConferanceName && event.EventName !== event.ConferanceName && (
                    <div className="flex items-start">
                      <span className="font-semibold text-[#0D3F78] min-w-[80px]">Organization:</span>
                      <span className="ml-2 flex-1">{event.ConferanceName}</span>
                    </div>
                  )} */}
                  {event.Venue && (
                    <div className="flex items-start">
                      <span className="font-semibold text-[#0D3F78] min-w-[80px]">
                        Venue:
                      </span>
                      <span className="ml-2 flex-1">{event.Venue}</span>
                    </div>
                  )}
                  {/* {event.year && (
                    <div className="flex items-start">
                      <span className="font-semibold text-[#0D3F78] min-w-[80px]">Year:</span>
                      <span className="ml-2 flex-1">{event.year}</span>
                    </div>
                  )} */}
                </div>

                {/* Images section */}
                {/* {(event.Image1 || event.Image2) && (
                  <div className="mb-6">
                    <div className="flex gap-3 justify-center">
                      {event.Image1 && (
                        <img 
                          src={event.Image1} 
                          alt="Event Image 1" 
                          className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                        />
                      )}
                      {event.Image2 && (
                        <img 
                          src={event.Image2} 
                          alt="Event Image 2" 
                          className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                        />
                      )}
                    </div>
                  </div>
                )} */}
              </div>

              {/* Footer with buttons */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 justify-center">
                  {event.DocumentUrl1 && (
                    <Link to={event.DocumentUrl1} target="_blank">
                      <button className="bg-[#0D3F78] hover:bg-[#1560BD] text-white text-[12px] px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm">
                        Document 1
                      </button>
                    </Link>
                  )}
                  {event.DocumentUrl2 && (
                    <Link to={event.DocumentUrl2} target="_blank">
                      <button className="bg-[#0D3F78] hover:bg-[#1560BD] text-white text-[12px] px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm">
                        Document 2
                      </button>
                    </Link>
                  )}
                  {/* {event.VenueLat && event.VenueLong && (
                    <Link 
                      to={`https://www.google.com/maps?q=${event.VenueLat},${event.VenueLong}`} 
                      target="_blank"
                    >
                      <button className="bg-green-600 hover:bg-green-700 text-white text-[12px] px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm">
                        View Location
                      </button>
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {page === "upcoming"
              ? "No upcoming events available at the moment."
              : "No past events data available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCard;
