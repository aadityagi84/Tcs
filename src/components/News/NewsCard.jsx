import React from "react";

const NewsCard = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-tr-[30px] rounded-bl-[30px] overflow-hidden shadow-md">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 bg-[#2B6DC0] h-full text-white xl:text-[24px] text-[20px] font-bold">
        <h3 className="text-[#FAD336] font-bold  ">{title}</h3>
        <p className="line-clamp-3 font-medium">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
