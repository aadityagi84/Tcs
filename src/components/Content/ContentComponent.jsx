import { aboutUs } from "../../imagesProvider/AllImages";

const ContentComponent = ({
  classes,
  grid,
  stripColor,
  data,
  img,
  aboutData,
}) => {
  // console.log(aboutData.HomeSocietyList);

  return (
    <div className="py-10">
      <div className={` gap-10 ${grid} `}>
        <div className="">
          <div className="grid grid-cols-[10px,1fr] items-center gap-4">
            <div className={`bg-[${stripColor}] h-full`}></div>
            <div className={`${classes} text-[#1d1e1c] font-light`}>
              <span>{data.heading.preface}</span>{" "}
              <br className={`${classes}`} />
              <span className="font-semibold">{data.heading.highlight}</span>
            </div>
          </div>
          <div className="mt-10">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  aboutData.HomeSocietyList?.[0]?.SocietyHomeContent ||
                  "<p>Loading...</p>",
              }}
            />
          </div>
        </div>
        <div className="">
          <img
            src={img}
            className="h-full object-cover mx-auto"
            alt="About Us section image"
            onError={(e) => {
              e.target.src = "/fallback.jpg";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;
