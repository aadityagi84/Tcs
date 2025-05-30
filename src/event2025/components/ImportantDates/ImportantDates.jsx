import React from "react";
import DateCard from "./DateCard";

const ImportantDates = ({ data }) => {
  const importantDates = data?.ImpDates || [];

  const dateInfo = importantDates.map((date, index) => {
    const dateObj = new Date(date.Dates);
    const colors = [
      { bgColor: "extra_light", statusColor: "text-[#4AB518]" },
      { bgColor: "light-green", statusColor: "text-[#F96062]" },
      { bgColor: "light_yellow_color", statusColor: "text-[#4AB518]" },
      { bgColor: "orange_color", statusColor: "text-[#F96062]" },
    ];

    return {
      month: dateObj
        .toLocaleString("default", { month: "short" })
        .toUpperCase(),
      day: dateObj.getDate().toString(),
      year: dateObj.getFullYear().toString(),
      title: date.Name,
      status: date.StatusText,
      ...colors[index % colors.length],
    };
  });

  return (
    <div className="lg:border-r-2">
      <h2 className="mid_heading">Important Dates</h2>
      <div className="w-[110px] h-[6px] blue_background"></div>
      <div className="mt-8 flex flex-col items-start space-y-6">
        <div className="xl:w-[82%] md:w-[90%] w-full space-y-6">
          {dateInfo.map((item, index) => (
            <DateCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
