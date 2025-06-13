import Header from "../../Components/header/Header";
import PageBanner from "../../Components/CombineBanner/Banners";
import Footer from "../../Components/footer/Footer";
import EducationResourcesComponent from "../../Components/EducationResources/EducationResourcesComponent";

const EducationResources = () => {
  return (
    <div>
      <Header />
      <PageBanner
        title={"Education Resources"}
        subtitle={
          "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the"
        }
        breadcrumb="Home > Education Resources"
      />
      <div className="main-width py-10">
        <div className="">
          <div className="grid grid-cols-[10px,1fr] items-center gap-4">
            <div className={`bg-[#1560BD] h-full`}></div>
            <div
              className={`xl:text-[50px] lg:text-[40px] uppercase md:text-[30px] text-[25px] xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px] text-[#1d1e1c] font-light`}
            >
              <span>Browse Resources</span>
            </div>
          </div>
          <p className="pt-6 lg:text-[22px] md:text-[18px] font-medium lg:leading-[35px]">
            Research professionals like doctors, pathologist, hematologists,
            students and interested individuals who engaged in research and
            education in clinical and research cytometry especially in clinical
            sciences, basic research technologies and any other relevant areas
            duly recognized by the society are eligible for the membership of
            the society. An individual affiliated to any recognized College,
            University, Research Institute or any other Organizations, society
            or an enterprise can become a member of the society. Overseas Indian
            students and scientists are also encouraged to be members of the
            society as per rules.
          </p>
        </div>
        <div className="pt-10">
          <EducationResourcesComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EducationResources;
