import React from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import { certificates } from "../../imagesProvider/AllImages";

const RegistrationCertificate = () => {
  const registration = [
    { img: certificates.RegisCertificate, title: "Registration Certificate" },
    { img: certificates.gstCertificate, title: "GST Certificate" },
  ];
  return (
    <div>
      <Header />
      <PageBanner
        title={"Registration Certificate"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Registration Certificate"
      />
      <div className="main-width py-10">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] uppercase md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>Registration & Election Certificate</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 gap-20 py-20">
          {registration.map((data, index) => (
            <div className="h-full" key={index}>
              <img src={data.img} className="h-full" alt={data.title} />
              <div className="bg-[#007DC5] py-3 text-center text-white lg:text-[22px] md:text-[18px]">
                {data.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationCertificate;
