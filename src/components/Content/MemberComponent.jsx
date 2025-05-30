import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { aboutUs } from "../../imagesProvider/AllImages";

const MemberComponent = ({ grid, stripColor }) => {
  const members = [
    "/members/member1.jpg",
    "/members/member2.jpg",
    "/members/member3.jpg",
    "/members/member4.jpg",
    "/members/member5.jpg",
    "/members/member6.jpg",
    "/members/member7.jpg",
    "/members/member8.jpg",
    "/members/member9.jpg",
  ];
  return (
    <div>
      <div className="">
        <div className={` gap-10 ${grid} `}>
          <div className="">
            <div className="grid grid-cols-[10px,1fr] items-center gap-4">
              <div className={`bg-[${stripColor}] md:h-[80px] h-[50px]`}></div>
              <div
                className={`xl:text-[50px] lg:text-[40px] md:text-[30px] text-[25px]  xl:leading-[55px] lg:leading-[45px] md:leading-[35px] leading-[30px]  text-[#1d1e1c] font-light`}
              >
                <span>Become a</span>&nbsp;
                <span className="font-semibold">Member</span>
              </div>
            </div>
            <div className="md:mt-10 mt-6">
              <p className="lg:text-[18px] leqading-[35px]">
                The Cytometry Society (TCS)-India and the Organizing Committee
                of the 16th Annual TCS and workshops cordially invite you to
                join the 16th TCS 2024 in Navi Mumbai/Mumbai to participate in
                one of the most celebrated academic events in Indian flow
                cytometry. 
                <br />
              </p>
            </div>
          </div>
          <div className="">
            <div className="relative  flex items-center md:flex-row flex-col  gap-8  overflow-hidden">
              {/* Dotted Circle Group */}
              <div className="">
                <img src={aboutUs.members_group} alt="" />
              </div>

              {/* Text & Button */}
              <div className="relative z-10 md:ml-auto md:w-1/2">
                <h3 className="text-gray-600  font-medium text-[26px] mb-2">
                  Ready for
                </h3>
                <h2 className="2xl:text-[55px] xl:text-[45px] lg:text-[35px] text-[25px]  2xl:leading-[57px] xl:leading-[47px] lg:leading-[37px] md:leading-[27px] font-semibold mb-4">
                  Become a Member?
                </h2>
                <Link
                  to="/event2025/membership"
                  className="inline-block bg-blue-600  xl:mt-8 text-white px-6 py-3 rounded-bl-[17px] rounded-tr-[17px] shadow hover:bg-blue-700 transition"
                >
                  <span className="flex items-center gap-4">
                    Become A Member
                    <FaArrowRightLong />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberComponent;
