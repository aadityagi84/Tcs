import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { ecMembers } from "../../imagesProvider/AllImages";

const Card = ({ data }) => {
  return (
    <div>
      <div className="grid xl:grid-cols-[30%,1fr] lg:grid-cols-[40%,1fr] sm:grid-cols-[30%,1fr]  rounded-tr-[30px] rounded-bl-[20px] shadow-lg overflow-hidden border border-gray-200">
        {/* Image Section */}
        <div className="">
          <div className="relative ">
            <img
              src={data.img}
              alt="Dr. Urmi Chatterji"
              className="object-cover h-full w-full"
            />
          </div>
          <div className=" w-full  flex items-center justify-center  text-center p-8 bg-[#2F8775] text-white lg:text-[20px] md:text-[17px] text-[15px] font-semibold  ">
            {data.title}
          </div>
        </div>
        <div className="">
          <div className=" bg-[#DEF] h-full p-6">
            <h3 className="lg:text-[26px] md:text-[20px]  font-bold text-[#2c2c2c]">
              {data.name}
            </h3>
            <p className="lg:text-[18px] text-[14px] text-[#2c2c2c]  mt-1">
              {data.dis}
            </p>

            {/* Contact */}
            <div className="mt-4 space-y-2  lg:text-[22px]  md:text-[20px] text-[14px]  pt-4 text-[#2c2c2c]">
              <div className="flex items-center space-x-2">
                <FiPhoneCall />

                <span>{data.phone}</span>
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <TfiEmail />

                <span>{data.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
