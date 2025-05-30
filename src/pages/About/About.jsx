import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import NewsComponent from "../../Components/News/NewsComponent";
import Footer from "../../Components/footer/Footer";
import { combineBanner } from "../../imagesProvider/AllImages";

const About = () => {
  const objectives = [
    "Provide a professional forum for sharing of scientific information in Cytometry.",
    "Integrate various professional interests in cytometry in a common stream.",
    "Organize and conduct educational programmes in cytometry suitable for different levels of research and diagnostic laboratories.",
    "Act as an interface between the scientific community engaged in cytometry in India and International professional bodies in cytometry.",
    "Represent the interests of professional engaged in cytometry at all local state level and national bodies, both government and non – government.",
    "Act as the nomination body for award of scholarships and travel grants to students, scientists and laboratory physicians.",
    "Publish scientific information in cytometry, as News Letters in the beginning and later on, as an official journal.",
    "Protect the interests of users of cytometry equipment and reagents.",
  ];
  return (
    <div>
      <Header />
      <PageBanner
        title={"About Society"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
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
            <p className="font-bold lg:text-[30px] md:text-[25px] text-[20px] lg:leading-[55px]">
              Cytometry is a rapidly growing powerful technique used in basic
              and clinical research as well as in diagnostic laboratories.
              Cytometry offers great opportunities to the scientists in
              translational and applied research and provides diagnostic and
              therapeutic tools to the clinician. Cytometry science has evolved
              tremendously globally and India is not far behind. Many
              professionals in this field of cytometry, both in the clinical
              arena as well as in the research front, joined hands and formed a
              common platform which would facilitate fulfilment of the
              objectives of dissemination of information, education, training
              and fostering research in the area of cytometry. <br />
              <br /> The Cytometry Society (TCS) India, was borne out of these
              efforts on September 16, 2005 with its registered office at Centre
              for Cellular & Molecular Biology, Hyderabad, India.
            </p>
            <div className="mt-10">
              <img src={combineBanner.bannerPage1} alt="" />
            </div>
          </div>
          <div className="mt-10">
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
          </div>
        </div>
        <div className="py-10">
          <NewsComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
