import React from "react";
import { bannerImages } from "../../imagesProvider/AllImages";

const About = ({ data }) => {
  // Get about text from API data or use fallback
  const aboutText =
    data?.HomePage?.[0]?.AboutUs ||
    `
    The Cytometry Society (TCS)-India and the Organizing Committee
    of the 16th Annual TCS and workshops cordially invite you to
    join the 16th TCS 2024 in Navi Mumbai/Mumbai to participate in
    one of the most celebrated academic events in Indian flow
    cytometry. <br />
    TCS-India is the academic society involved in the propagation of
    flow cytometry education through organized training, knowledge
    dissemination, and fostering research, both in the basic and
    clinical areas, as well as diagnostic fronts. The society has
    been having regular conferences and workshops since its
    inception and has instituted award of scholarships and travel
    grants to students, scientists, and laboratory physicians so
    that they can be a part of the meetings, to encourage youngsters
    to take up this rapidly growing, unique, and exceptionally
    interesting technique, fostering the growth of flow cytometry
    not only in our country but in the region at large. With its
    inception in 2005, TCS is going to celebrate its 16th annual
    congress in Navi Mumbai/Mumbai, Maharashtra. We welcome you to
    the Bollywood Nagari, the financial capital of India, home to a
    specialty in multicultural cuisine with an extra flavor of
    "Marathi Tadka" The Cytometry Society.
  `;

  return (
    <>
      <section className="light_yellow py-10">
        <div className="main-width">
          <div className="">
            <h2 className="mid_heading">About Us</h2>
            <div className="w-[110px] h-[6px] blue_background"></div>
          </div>
          <div className="grid lg:grid-cols-[70%,1fr] gap-8 mt-8">
            <div className="">
              <p
                className="lg:text-[18px] lg:leading-[35px] leading-[30px]"
                dangerouslySetInnerHTML={{ __html: aboutText }}
              ></p>
            </div>
            <div className="lg:block md:hidden block">
              <img
                src={data?.HomePage?.[0]?.Image1 || bannerImages.aboutus}
                alt="about-events"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
