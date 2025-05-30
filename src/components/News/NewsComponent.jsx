import React from "react";
import { latestNews, newsData } from "../../static/newsData";
import NewsCard from "./NewsCard";
import NewsGrid from "./NewsGrid";

const NewsComponent = () => {
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
          {newsData.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
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
                dis={data.dis}
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
