import { useEffect, useState } from "react";
import PageBanner from "../../Components/CombineBanner/Banners";
import Card from "../../Components/ecMemberCard/Card";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import { ecMembers } from "../../imagesProvider/AllImages";
import { GetECMemberPageList } from "../../services/HomeService";

const ECMembers = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getEcMembers = async () => {
      try {
        const rs = await GetECMemberPageList();
        console.log(rs);
        setData(rs);
      } catch (error) {
        console.log(error);
      }
    };
    getEcMembers();
  }, []);

  const ecMem = [
    {
      img: ecMembers.urmi,
      name: "Dr. Urmi Chatterji",
      title: "Vice-President(Research)",
      dis: "Sr Consultant Haematology & Director, Laboratory Services, & Director Academic Affairs, Research & Continuing Education (AARCE), BLK Super Speciality Hospital, Pusa Road, New Delhi -110005",
      phone: "+91-9871825999",
      email: "demo@gmail.com",
    },
  ];
  return (
    <div>
      <Header />
      <PageBanner
        img={data.BannerImage}
        title={data.Title}
        subtitle={data.Description}
        breadcrumb="Home > EC Members"
      />
      <div className="py-10 main-width">
        <div className="grid lg:grid-cols-2 items-start gap-4">
          {data?.ECMemberDetailsList?.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ECMembers;
