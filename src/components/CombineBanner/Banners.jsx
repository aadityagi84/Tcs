import { combineBanner } from "../../imagesProvider/AllImages";

const PageBanner = ({ title, subtitle, breadcrumb, img }) => {
  const bannerImageUrl = combineBanner.BannerHeader;

  return (
    <div
      className="   flex items-center  lg:h-[325px] h-[280px] mx-auto text-white  "
      style={{
        backgroundImage: `url(
        ${img ? img : `${bannerImageUrl}`})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="main-width ">
        <h1 className="xl:text-[50px] lg:text-[40px] md:text-[30px] text-[22px] font-bold">
          {title}
        </h1>
        <p
          className="mt-2 lg:text-[20px] md:text-[17px] lg:max-w-2xl"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        ></p>

        <div className="mt-4 font-bold leading-[15px] yellow-color ">
          {breadcrumb}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
