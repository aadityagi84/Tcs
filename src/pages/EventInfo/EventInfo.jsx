import React from "react";
import ImportantDates from "../../components/ImportantDates/ImportantDates";
import VenueDetails from "../../components/VenueDetails/VenueDetails";

const EventInfo = ({ data }) => {
  return (
    <section className="py-10">
      <div className="main-width">
        <div className="grid lg:grid-cols-2 lg:gap-2 gap-10">
          <ImportantDates data={data} />
          <VenueDetails data={data} />
        </div>
      </div>
    </section>
  );
};

export default EventInfo;
