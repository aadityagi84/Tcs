import React from "react";

const TeamCard = ({ name, role, title, image }) => {
  return (
    <div className=" rounded-bl-[30px] rounded-tr-[30px] overflow-hidden  text-center bg-[#DEF]">
      <img
        src={image}
        alt={name}
        className="mx-auto w-full h-[250px] object-cover object-top "
      />
      <h3 className="text-[20px] bg-blue text-white py-3 font-bold">{name}</h3>
      <p className="text-[17px] text-[#fff] font-bold green py-3">{role}</p>
      <div className="black_color bg-[#DEF] h-full p-6">
        <p className="font-medium  mt-2 text-[17px]   ">{title}</p>
      </div>
    </div>
  );
};

export default TeamCard;
