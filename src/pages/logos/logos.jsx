import React from "react";
import { bannerImages } from "../../imagesProvider/AllImages";

const Logos = ({ data, classes }) => {
  const logoData = data?.SponsorsLogos || [];

  return (
    <div>
      <section className="w-full">
        <div className="main-width relative py-4 sm:py-6 md:py-8 lg:py-10">
          <div className={` ${classes}  w-full`}>
            {logoData.length > 0 ? (
              <div className="flex flex-wrap w-full  justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4">
                {logoData.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.SponsorsLogo || bannerImages.logos}
                    className="h-12 sm:h-16 md:h-24 lg:h-32 xl:h-36 object-contain transition-all duration-300"
                    alt={logo.Name || `Logo ${index + 1}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <img
                  src={bannerImages.logos}
                  className="h-12 sm:h-16 md:h-24 lg:h-32 xl:h-36 object-contain transition-all duration-300"
                  alt="logos"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Logos;
