import React from "react";
import WorkshopCard from "./WorkshopCard";
import { ConfernceImages } from "../../imagesProvider/AllImages";

const workshops = [
  {
    image: ConfernceImages.confernce,
    date: "19 OCT 2025",
    title: "17th TCS Annual Conference & Workshop – 2025",
    dateBg: "#BEDFCF",
    description:
      "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the 16th TCS 2024 in Navi Mumbai/Mumbai...",
  },
  {
    image: ConfernceImages.confernce,
    date: "19 OCT 2025",
    title: "17th TCS Annual Conference & Workshop – 2025",
    dateBg: "#E7F1FB",

    description:
      "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you...",
  },
  {
    image: ConfernceImages.confernce,
    date: "19 OCT 2025",
    title: "17th TCS Annual Conference & Workshop – 2025",
    dateBg: "#E7F1FB",
    description:
      "The Cytometry Society (TCS)-India and the Organizing Committee cordially invite you to join the 16th TCS 2024 in Mumbai...",
  },
  {
    image: ConfernceImages.confernce,
    date: "19 OCT 2025",
    title: "17th TCS Annual Conference & Workshop – 2025",
    dateBg: "#BEDFCF",
    description:
      "Join the 16th TCS 2024 in Navi Mumbai for one of the most celebrated academic events in Indian flow cytometry...",
  },
];

const WorkshopsSection = () => {
  return (
    <section className="py-10 ">
      <div className="grid grid-cols-[10px,1fr] items-center gap-4">
        <div className={`bg-[#2F8775] h-full`}></div>
        <div
          className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
        >
          <span>Workshops &</span>
          <span className="font-semibold"> Conferences</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {workshops.map((workshop, index) => (
          <WorkshopCard key={index} {...workshop} />
        ))}
      </div>
    </section>
  );
};

export default WorkshopsSection;
