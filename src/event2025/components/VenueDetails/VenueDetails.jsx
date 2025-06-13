import React, { useEffect, useState } from "react";

const VenueDetails = ({ data }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    if (data) {
      const venueData = [];

      for (let i = 0; i <= 4; i++) {
        const suffix = i === 0 ? "" : i;
        const name = data[`Venue${suffix}`];
        const lat = parseFloat(data[`VenueLat${suffix}`]);
        const lng = parseFloat(data[`VenueLong${suffix}`]);
        const eventName = data[`EventName${suffix}`];

        if (
          name &&
          !isNaN(lat) &&
          !isNaN(lng) &&
          lat >= -90 &&
          lat <= 90 &&
          lng >= -180 &&
          lng <= 180
        ) {
          venueData.push({
            name,
            lat,
            lng,
            eventName: eventName || "Event",
          });
        }
      }

      setVenues(venueData);
    }
  }, [data]);

  return (
    <div className="lg:px-12">
      <h2 className="mid_heading">Venue Details</h2>
      <div className="w-[110px] h-[6px] blue_background"></div>

      <div
        className={`mt-8 grid gap-8 ${
          venues.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {venues.length > 0 ? (
          venues.map((venue, index) => {
            const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${venue.lat},${venue.lng}&zoom=15`;

            return (
              <div
                key={index}
                className="rounded-tr-[32px] rounded-bl-[32px] overflow-hidden"
              >
                <div
                  className={`blue_background ${
                    venues.length > 1 ? "p-4" : "p-10"
                  }`}
                >
                  <p
                    className={`text-white font-medium line-clamp-1 ${
                      venues.length > 1
                        ? "lg:text-[20px] md:text-[16px] text-[14px]"
                        : "lg:text-[36px] text-[26px] md:leading-[52px]"
                    }`}
                  >
                    <span className="font-bold">Venue:</span> {venue.name}
                  </p>
                  {/* <p
                    className={`text-white ${
                      venues.length > 1
                        ? "lg:text-[15px] text-[13px]"
                        : "lg:text-[24px] text-[18px]"
                    } font-medium mt-2 line-clamp-1`}
                  >
                    <span className="font-bold">Event:</span> {venue.eventName}
                  </p> */}
                </div>
                <div className={venues.length > 1 ? "h-[200px]" : "h-[380px]"}>
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing location of ${venue.name}`}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-tr-[32px] rounded-bl-[32px] overflow-hidden">
            <div className="blue_background p-10">
              <p className="text-white font-medium lg:text-[36px] text-[26px] md:leading-[52px]">
                <span className="font-bold">Venue:</span>{" "}
                {data?.Venue || "ACTREC, ICMR-NIIH & ICMR-NIRRCH, Mumbai"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetails;
