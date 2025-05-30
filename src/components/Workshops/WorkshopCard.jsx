const WorkshopCard = ({ image, date, title, dateBg, description }) => {
  return (
    <div className="bg-white rounded-tr-[30px] rounded-bl-[30px] duration-500 transform hover:scale-[1.01] hover:shadow cursor-pointer  transition overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full  lg:h-[300px] h-[200px] object-cover"
      />
      <div className="">
        <div className=" grid lg:grid-cols-[30%,1fr] h-full">
          <div
            className={`flex items-center justify-center h-full lg:py-4 py-6`}
            style={{ backgroundColor: dateBg }}
          >
            <p className="xl:text-[26px] lg:text-[20px] text-[18px] font-bold uppercase text-[#2c2c2c] mb-1">
              {date}
            </p>
          </div>
          <div className="p-6 h-full text-[#2C2C2C] bg-[#F6F6F6] ">
            <h3 className="font-bold xl:text-[26px] lg:text-[20px] text-[18px]  text-gray-900 mb-2">
              {title}
            </h3>
            <p className="xl:text-[18px] md:text-[16px] text-sm ">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
