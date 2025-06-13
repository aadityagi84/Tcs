import React from "react";

const DateCard = ({
  month,
  day,
  year,
  title,
  status,
  statusCode,
  bgColor,
  statusColor,
  documentUrl,
  code,
  isOpen,
  showDate = true,
}) => {
  // console.log(documentUrl);
  const handleCardClick = () => {
    if (documentUrl && isOpen) {
      window.open(documentUrl, "_blank");
    }
  };

  const statusText = isOpen ? "Open - Download Document" : "Closed";

  const textColor =
    statusColor || (isOpen ? "text-[#4AB518]" : "text-[#F96062]");

  return (
    <div
      className={`p-4 w-full rounded-tr-[20px] h-full rounded-bl-[20px] ${bgColor} ${
        isOpen ? "cursor-pointer transition-transform hover:scale-105" : ""
      }`}
      onClick={isOpen ? handleCardClick : undefined}
    >
      {showDate ? (
        <div className="grid grid-cols-[20%,1fr] items-center">
          <div className="flex items-center justify-center border-r-2 border-[#C5B7B7]">
            <div className="w-[80%] mx-auto flex flex-col items-center">
              <div className="font-bold blue-color">{month}</div>
              <div className="xl:text-[41px] lg:text-[31px] text-[25px] font-bold xl:leading-[41px] lg:leading-[32px] leading-[26px]">
                {day}
              </div>
              <div className="lg:text-[18px] font-bold">{year}</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="xl:text-[22px] lg:text-[20px] text-center text-[18px] font-bold">
              {title}
            </h4>
            <div
              className={`font-semibold ${
                code === 2 ? "text-red-600" : "text-green-600"
              }`}
            >
              {statusCode}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h4 className="xl:text-[22px] lg:text-[20px] text-center text-[18px] font-bold">
            {title}
          </h4>
          <div
            className={`font-semibold ${
              code === 2 ? "text-red-600" : "text-green-600"
            }`}
          >
            {statusText}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCard;
