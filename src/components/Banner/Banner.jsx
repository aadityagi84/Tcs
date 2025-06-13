import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Banner02 from "./BannerContent02";
import { conferenceDetails } from "../../static/banner";
import { banner } from "../../imagesProvider/AllImages";
import Header from "../header/Header";
import BannerContent01 from "./BannerContent01";

const Banner = ({ data }) => {
  // console.log("data from banner", data);
  return (
    <div
      className={` w-full    bg-cover relative overflow-hidden`}
      style={{ backgroundImage: `url(${banner.bannerImg})` }}
    >
      <div className="">
        <div className="absolute top-0 left-0 lg:block hidden -z-2">
          <img src={banner.dna} alt="dna" />
        </div>
        <div className="absolute bottom-0 right-[38%]">
          <img src={banner.ocata} className="w-[70%]" alt="icon" />
        </div>
        <div className="absolute -right-[10%] top-[20%]">
          <img src={banner.angular} className="w-[70%]" alt="icon" />
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
      <div className="relative z-40">
        <Header />
      </div>
      <div className="main-width   flex items-center ">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper w-full h-full"
        >
          <SwiperSlide>
            <Banner02 data={conferenceDetails} bannerdata={data} />
          </SwiperSlide>
          <SwiperSlide className="!h-[800px] flex items-center ">
            <BannerContent01 data={conferenceDetails} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
