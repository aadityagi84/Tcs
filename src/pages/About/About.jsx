import React, { useEffect, useState } from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import NewsComponent from "../../Components/News/NewsComponent";
import Footer from "../../Components/footer/Footer";
import { combineBanner } from "../../imagesProvider/AllImages";
import { GetSocietyPageList } from "../../services/HomeService";

const About = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getSocityData = async () => {
      try {
        const rs = await GetSocietyPageList();
        // console.log(rs);
        setData(rs);
      } catch (error) {
        console.log(error);
      }
    };
    getSocityData();
  }, []);

  // console.log(data);
  return (
    <div>
      <Header />
      <PageBanner
        img={data.Image}
        title={data.Title}
        subtitle={data.Description}
        breadcrumb="Home > About Society"
      />

      <div className="main-width">
        <div className="py-10">
          <div className="grid grid-cols-[10px,1fr] items-center gap-4">
            <div className={`bg-[#1560BD] h-full`}></div>
            <div
              className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
            >
              <span>THE CYTOMETRY SOCIETY (TCS)</span>
              {/* <span className="font-semibold"> NEWS</span> */}
            </div>
          </div>
          <div className="mt-10">
            <p
              className="font-bold lg:text-[30px] md:text-[25px] text-[20px] lg:leading-[55px]"
              dangerouslySetInnerHTML={{ __html: data.SocietyContent }}
            ></p>
            <div className="mt-10">
              <img src={data.Image} alt="" />
            </div>
          </div>
          {/* <div className="mt-10">
            <div className="grid grid-cols-[10px,1fr] items-center gap-4">
              <div className={`bg-[#1560BD] h-full`}></div>
              <div
                className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
              >
                <span>Objectives</span>
              </div>
            </div>
            <div className="">
              {
                <ul className="list-disc  pl-6 lg:text-[20px] space-y-2 mt-6">
                  {objectives.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              }
            </div>
          </div> */}
        </div>
        <div className="py-10">
          <NewsComponent data={data?.SocietyNewsList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
