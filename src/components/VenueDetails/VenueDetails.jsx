import React from "react";

const VenueDetails = ({ data }) => {
  const venue = data?.Venue || "ACTREC, ICMR-NIIH & ICMR-NIRRCH, Mumbai";
  const venueLat = data?.VenueLat;
  const venueLong = data?.VenueLong;

  // Only generate map URL if both latitude and longitude are valid
  const mapSrc =
    venueLat && venueLong && venueLat !== "1" && venueLong !== "1"
      ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${venueLat},${venueLong}&zoom=15`
      : null;

  return (
    <div className="lg:px-12">
      <h2 className="mid_heading">Venue Details</h2>
      <div className="w-[110px] h-[6px] blue_background"></div>
      <div className="mt-8 rounded-tr-[32px] rounded-bl-[32px] overflow-hidden">
        <div className="blue_background p-10">
          <p className="text-white font-medium lg:text-[36px] text-[26px] md:leading-[52px]">
            <span className="font-bold">Venue:</span> {venue}
          </p>
        </div>
        {mapSrc && (
          <div className="h-[380px]">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetails;
