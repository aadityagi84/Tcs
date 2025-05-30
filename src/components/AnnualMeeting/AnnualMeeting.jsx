import Marquee from "react-fast-marquee";
import { meetingPhotgraph } from "../../imagesProvider/AllImages";

const images = [
  meetingPhotgraph.meet1,
  meetingPhotgraph.meet2,
  meetingPhotgraph.meet3,
  meetingPhotgraph.meet5,
  meetingPhotgraph.meet6,
  meetingPhotgraph.meet7,
  meetingPhotgraph.meet8,
  meetingPhotgraph.meet9,
  meetingPhotgraph.meet10,
  meetingPhotgraph.meet11,
  meetingPhotgraph.meet12,
  meetingPhotgraph.meet13,
  meetingPhotgraph.meet15,
  meetingPhotgraph.meet16,
  meetingPhotgraph.meet17,

  // Add all image paths here
];
const AnnualMeetingComponent = () => {
  return (
    <div className="space-y-2 overflow-hidden">
      {/* Row 1 */}
      <Marquee speed={40} className="py-2" pauseOnHover gradient={false}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="w-[400px]  h-[300px] object-cover rounded-md mx-2 shadow-lg transition-transform duration-300 hover:scale-105"
          />
        ))}
      </Marquee>

      {/* Row 2 (reverse) */}
      <div className=" py-2">
        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
          direction="right"
          className="py-4"
        >
          {images.map((img, idx) => (
            <img
              key={`rev-${idx}`}
              src={img}
              alt={`slide-rev-${idx}`}
              className="w-[400px]  h-[300px] object-cover rounded-md mx-2 shadow-lg transition-transform duration-300 hover:scale-105"
            />
          ))}
        </Marquee>
      </div>
      {/* Row 1 */}
      <Marquee speed={40} className="py-2" pauseOnHover gradient={false}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="w-[400px]  h-[300px] object-cover rounded-md mx-2 shadow-lg transition-transform duration-300 hover:scale-105"
          />
        ))}
      </Marquee>

      {/* Row 2 (reverse) */}
      <div className=" py-2">
        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
          direction="right"
          className="py-4"
        >
          {images.map((img, idx) => (
            <img
              key={`rev-${idx}`}
              src={img}
              alt={`slide-rev-${idx}`}
              className="w-[400px]  h-[300px] object-cover rounded-md mx-2 shadow-lg transition-transform duration-300 hover:scale-105"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AnnualMeetingComponent;
