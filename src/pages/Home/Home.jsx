import React, { useEffect, useState } from "react";
import Banner from "../../Components/banner/Banner";
import Header from "../../Components/header/Header";
import { aboutUs, banner } from "../../imagesProvider/AllImages";
import ContentComponent from "../../Components/Content/ContentComponent";
import { aboutSection } from "../../static/AboutUsData";
import MemberComponent from "../../Components/Content/MemberComponent";
import WorkshopsSection from "../../Components/Workshops/WorkshopsSection";
import ListofAwards from "../../Components/ListofAwards/ListofAwards";
import NewsComponent from "../../Components/News/NewsComponent";
import Footer from "../../Components/footer/Footer";
import { getHomePageData } from "../../services/HomeService";

const Home = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    const getData = async () => {
      const data = await getHomePageData();
      if (data) {
        setdata(data);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div>
        <Banner data={data} />
        <div className="main-width ">
          <ContentComponent
            classes={` block xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]   `}
            stripColor={"#2F8775"}
            data={aboutSection}
            aboutData={data}
            grid={`grid xl:grid-cols-[70%,1fr] lg:grid-cols-[60%,1fr] `}
            img={aboutUs.about_us}
          />
          <div
            className={` w-full    bg-cover relative overflow-hidden sm:p-10 p-4  overflow-hidden rounded-bl-[20px]`}
            style={{ backgroundImage: `url(${aboutUs.becomeMember})` }}
          >
            <MemberComponent
              stripColor={"#1560BD"}
              data={aboutSection}
              apiData={data}
              grid={`grid    lg:grid-cols-[50%,1fr] `}
              img={aboutUs.about_us}
            />
          </div>
          <WorkshopsSection />
          <div className="py-10">
            <ListofAwards data={data?.AwardDetailsList} />
          </div>
          <div className="py-10">
            <NewsComponent data={data?.SocietyNewsList} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
