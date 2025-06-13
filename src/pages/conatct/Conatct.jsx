import React, { useState, useEffect } from "react";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import Form from "../../Components/formCard/Form";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { GetContactUsPageList } from "../../services/HomeService";
import Loader from "../../Components/Loader/Loader";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await GetContactUsPageList();
        setContactData(data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const formatPhoneNumbers = () => {
    if (!contactData) return "+91-9848454722, +91-8897611459";

    const phones = [];
    if (contactData.Mobile1) phones.push(contactData.Mobile1);
    if (contactData.Mobile2) phones.push(contactData.Mobile2);
    if (contactData.Mobile3) phones.push(contactData.Mobile3);

    return phones.length > 0
      ? phones.join(", ")
      : "+91-9848454722, +91-8897611459";
  };

  const getEmail = () => {
    return contactData?.EmailId || "office@tcs.res.in";
  };

  // Helper function to get address
  const getAddress = () => {
    return (
      contactData?.Address ||
      "c/o Mr M.I. SHAREEF H.No.2-4-123/1/4/1 Swaroop Nagar Padmavathi Colony Uppal R.R.Dist- 500 039."
    );
  };

  const getMapUrl = () => {
    const defaultUrl =
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30456.35282468535!2d78.572098!3d17.409671!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9ec9fe01828d%3A0xf5b39401f83729f6!2sThe%20Cytometry%20Society!5e0!3m2!1sen!2sin!4v1748610504348!5m2!1sen!2sin";

    if (contactData?.AddLat && contactData?.AddLong) {
      const lat = contactData.AddLat;
      const lng = contactData.AddLong;
      return `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15000!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat}%C2%B0N%20${lng}%C2%B0E!5e0!3m2!1sen!2sin!4v1748610504348!5m2!1sen!2sin`;
    }

    return defaultUrl;
  };

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
        title={"Contact Us"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Contact Us"
      />
      <div className="main-width py-10">
        <div className="grid xl:grid-cols-[33%,1fr] lg:grid-cols-[40%,1fr] rounded-tr-[30px] rounded-bl-[30px] overflow-hidden gap-4">
          <div className="bg-[#007DC5] relative">
            <div className="absolute w-[288px] h-[288px] rounded-full bg-[rgba(255,255,255,0.12)] -bottom-40 -right-40"></div>
            <div className="absolute w-[120px] h-[120px] rounded-full bg-[rgba(255,249,249,0.13)] bottom-10 right-10"></div>

            <div className="lg:p-10 p-4">
              <h2 className="xl:text-[38px] lg:text-[30px] md:text-[25px] text-[20px] font-semibold text-white">
                Contact Information{" "}
              </h2>
              <p className="text-white lg:text-[24px] md:text-[20px]">
                Say something to start a live chat!
              </p>
              <div className="flex flex-col space-y-6 items-start py-12">
                <div className="grid grid-cols-[30px,1fr] items-center gap-2 text-white xl:text-[26px] lg:text-[20px] text-[18px]">
                  <MdOutlinePhoneInTalk />
                  <span>{loading ? "Loading..." : formatPhoneNumbers()}</span>
                </div>
                <div className="grid grid-cols-[30px,1fr] items-center gap-2 text-white xl:text-[26px] lg:text-[20px] text-[18px]">
                  <TfiEmail />
                  <span>{loading ? "Loading..." : getEmail()}</span>
                </div>
                <div className="grid grid-cols-[30px,1fr] items-center gap-2 text-white xl:text-[26px] lg:text-[20px] text-[18px]">
                  <IoLocationOutline />
                  <span>{loading ? "Loading..." : getAddress()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg p-10 border border-gray-100">
            <Form />
          </div>
        </div>
        <div className="mt-10">
          <iframe
            src={
              loading
                ? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30456.35282468535!2d78.572098!3d17.409671!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9ec9fe01828d%3A0xf5b39401f83729f6!2sThe%20Cytometry%20Society!5e0!3m2!1sen!2sin!4v1748610504348!5m2!1sen!2sin"
                : getMapUrl()
            }
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
