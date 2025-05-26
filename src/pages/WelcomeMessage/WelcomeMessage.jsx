import React from "react";
import { bannerImages } from "../../imagesProvider/AllImages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const WelcomeMessage = ({ data }) => {
  const homePageData = data?.HomePage?.[0] || {};
  const welcomeMsg =
    homePageData.WelcomeMsg ||
    `The Cytometry Society (TCS)-India and the Organizing Committee of
              the 16th Annual TCS and workshops cordially invite you to join the
              16th TCS 2024 in Navi Mumbai/Mumbai to participate in one of the
              most celebrated academic events in Indian flow cytometry.  <br />
              <br />
              TCS-India is the academic society involved in the propagation of
              flow cytometry education through organized training, knowledge
              dissemination, and fostering research, both in the basic and
              clinical areas, as well as diagnostic fronts. The society has been
              having regular conferences and workshops since its inception and
              has instituted award of scholarships and travel grants to
              students, scientists, and laboratory physicians so that they can
              be a part of the meetings, to encourage youngsters to take up this
              rapidly growing, unique, and exceptionally interesting technique,
              fostering the growth of flow cytometry not only in our country but
              in the region at large. With its inception in 2005, TCS is going
              to celebrate its 16th annual congress in Navi Mumbai/Mumbai,
              Maharashtra. We welcome you to the Bollywood Nagari, the financial
              capital of India, home to a specialty in multicultural cuisine
              with an extra flavor of "Marathi Tadka" The Cytometry Society.`;

  const committeeMembers = homePageData.CommetyMembers || [];

  return (
    <>
      <div className="py-10">
        <div className="main-width">
          <div className="">
            <h2 className="mid_heading">Welcome Message</h2>
            <div className="w-[130px] h-[6px] blue_background"></div>
          </div>
          <div className="mt-4">
            <p
              className="lg:text-[18px] lg:leading-[35px] leading-[26px]"
              dangerouslySetInnerHTML={{ __html: welcomeMsg }}
            ></p>
          </div>
          <div className="mt-8">
            <div className="xl:w-[80%] mx-auto gap-8 p-6 md:p-10 light_green_bg rounded-3xl md:rounded-[80px] lg:rounded-[147px]">
              {/* Dynamic committee members from API */}

              <div className="w-full">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                  }}
                  // onSlideChange={() => console.log("slide change")}
                  // onSwiper={(swiper) => console.log(swiper)}
                >
                  {committeeMembers.map((member, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
                        <div className="w-28 h-28 md:w-32 md:h-32 border-4 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={member.Image || bannerImages.Subramaniam}
                            className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                            alt={member.Name || "Committee Member"}
                          />
                        </div>
                        <div className="text-center lg:text-left">
                          <h5 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold">
                            {member.Name}
                          </h5>
                          <h6 className=" lg:text-[20px]  font-semibold lg:leading-[20px]">
                            {member.Designation}
                          </h6>
                          <p className=" lg:text-[18px] font-light pt-2  leading-tight">
                            {member.Education}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeMessage;
