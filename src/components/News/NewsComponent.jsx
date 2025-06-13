import React from "react";
// import { latestNews, newsData } from "../../static/newsData";/
import NewsCard from "./NewsCard";
import NewsGrid from "./NewsGrid";

const NewsComponent = ({ data }) => {
  // console.log(data);

  const leftnews = Array.isArray(data) ? data.slice(0, 4) : [];
  const latestNews = Array.isArray(data) ? data.slice(4, 8) : [];

  return (
    <div className="grid 2xl:grid-cols-[70%,1fr] xl:grid-cols-[65%,1fr] lg:grid-cols-[60%,1fr] items-start gap-10">
      <div className="">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>TCS</span>
            <span className="font-semibold"> NEWS</span>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {leftnews.map((item) => (
            <NewsCard
              key={item.Id}
              image={item.Image}
              title={item.Title}
              description={item.Description}
            />
          ))}
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>Latest</span>
            <span className="font-semibold"> NEWS</span>
          </div>
        </div>
        <div className="mt-10 ">
          {latestNews.map((data, index) => {
            return (
              <NewsGrid
                key={index}
                newsType={data.newsType}
                newsDate={data.newsDate}
                newsTitle={data.Title}
                dis={data.Description}
                link={data.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
