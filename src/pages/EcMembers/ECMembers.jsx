import PageBanner from "../../Components/CombineBanner/Banners";
import Card from "../../Components/ecMemberCard/Card";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import { ecMembers } from "../../imagesProvider/AllImages";

const ECMembers = () => {
  const ecMem = [
    {
      img: ecMembers.urmi,
      name: "Dr. Urmi Chatterji",
      title: "Vice-President(Research)",
      dis: "Sr Consultant Haematology & Director, Laboratory Services, & Director Academic Affairs, Research & Continuing Education (AARCE), BLK Super Speciality Hospital, Pusa Road, New Delhi -110005",
      phone: "+91-9871825999",
      email: "demo@gmail.com",
    },
    {
      img: ecMembers.urmi,
      name: "Dr. Urmi Chatterji",
      title: "Vice-President(Research)",
      dis: "Sr Consultant Haematology & Director, Laboratory Services, & Director Academic Affairs, Research & Continuing Education (AARCE), BLK Super Speciality Hospital, Pusa Road, New Delhi -110005",
      phone: "+91-9871825999",
      email: "demo@gmail.com",
    },
    {
      img: ecMembers.urmi,
      name: "Dr. Urmi Chatterji",
      title: "Vice-President(Research)",
      dis: "Sr Consultant Haematology & Director, Laboratory Services, & Director Academic Affairs, Research & Continuing Education (AARCE), BLK Super Speciality Hospital, Pusa Road, New Delhi -110005",
      phone: "+91-9871825999",
      email: "demo@gmail.com",
    },
    {
      img: ecMembers.urmi,
      name: "Dr. Urmi Chatterji",
      title: "Vice-President(Research)",
      dis: "Sr Consultant Haematology & Director, Laboratory Services, & Director Academic Affairs, Research & Continuing Education (AARCE), BLK Super Speciality Hospital, Pusa Road, New Delhi -110005",
      phone: "+91-9871825999",
      email: "demo@gmail.com",
    },
    {
      img: ecMembers.urmi,
      name: "Dr. Urmi Chatterji",
      title: "Vice-President(Research)",
      dis: "Sr Consultant Haematology & Director, Laboratory Services, & Director Academic Affairs, Research & Continuing Education (AARCE), BLK Super Speciality Hospital, Pusa Road, New Delhi -110005",
      phone: "+91-9871825999",
      email: "demo@gmail.com",
    },

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
        title={"EC Members"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > EC Members"
      />
      <div className="py-10 main-width">
        <div className="grid lg:grid-cols-2 items-start gap-4">
          {ecMem.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ECMembers;
