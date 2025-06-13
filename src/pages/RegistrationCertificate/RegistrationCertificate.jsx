import React, { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import { GetRegCertificatePageList } from "../../services/HomeService";
import Loader from "../../Components/Loader/Loader";

const RegistrationCertificate = () => {
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCertificateData = async () => {
    try {
      const data = await GetRegCertificatePageList();

      if (data && data.length > 0) {
        setCertificateData(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching certificate data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCertificateData();
  }, []);

  const getRegistrationData = () => {
    if (!certificateData) return [];

    const registrationArray = [];

    if (certificateData.DocumentUrl1) {
      registrationArray.push({
        img: certificateData.DocumentUrl1,
        title: certificateData.DocumentName || "Registration Certificate",
      });
    }

    if (certificateData.DocumentUrl2) {
      registrationArray.push({
        img: certificateData.DocumentUrl2,
        title: certificateData.DocumentName2 || "Certificate",
      });
    }

    if (certificateData.DocumentUrl3) {
      registrationArray.push({
        img: certificateData.DocumentUrl3,
        title: certificateData.DocumentName3 || "Certificate",
      });
    }

    return registrationArray;
  };

  const registration = getRegistrationData();

  if (loading) {
    return (
      <div>
        <Header />
        <div className="main-width py-10 text-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <PageBanner
        title={certificateData?.Title || "Registration Certificate"}
        subtitle={
          certificateData?.Description?.replace(/<[^>]*>/g, "") ||
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Registration Certificate"
      />
      <div className="main-width py-10">
        <div className="grid grid-cols-[10px,1fr] items-center gap-4">
          <div className={`bg-[#1560BD] h-full`}></div>
          <div
            className={`xl:text-[50px] lg:text-[40px] uppercase md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
          >
            <span>
              {certificateData?.Title || "Registration & Election Certificate"}
            </span>
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
