import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const NewsGrid = ({ newsType, newsDate, dis, newsTitle, link }) => {
  return (
    <div className="border-dashed border-b-2 border-[#A9A7A7] my-4 ">
      <div className="flex items-center gap-10">
        <div className="">
          <span className="bg-[#BEDFCF] px-4 py-2 rounded-[2px] text-[14px] font-semibold text-[#2c2c2c]">
            {newsType ? newsType : "latest news"}
          </span>
        </div>
        <div className=" text-[14px] font-semibold text-[#2c2c2c]">
          <span>{newsDate ? newsDate : "4/06/2025"}</span>
        </div>
      </div>
      <div className="py-4 text-[14px]  text-[#2C2C2C]">
        <p className="font-semibold  leading-[22px] line-claamp-1">
          {newsTitle}
        </p>

        <p className="font-medium  leading-[22px] line-clamp-2">{dis}</p>
        <Link to="">
          <div className="flex items-center gap-4 text-[#2c2c2c] font-bold text-[14px] mt-4">
            <span>Read More</span>
            <span>
              <FaArrowRightLong />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewsGrid;
