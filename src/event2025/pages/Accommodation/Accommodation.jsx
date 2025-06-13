import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import PageBanner from "../PageBanner/PageBanner";
import { pagesBanner } from "../../imagesProvider/AllImages";
import Footer from "../../components/footer/Footer";
import Loader from "../Loader/Loader";
import { getAccomdationPageList } from "../../Services/accomodation";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Accommodation = () => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const response = await getAccomdationPageList();
        if (!response) {
          return toast.error("Table will be Empty");
        }
        const res = response?.data?.rc;
        // console.log("res", res);
        setAccommodationData(res);
      } catch (err) {
        console.error("Error fetching accommodation data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // console.log(accommodationData, "yertufkjdtyduk");/
  return (
    <>
      <Header />
      <PageBanner
        title="Accommodation"
        subtitle=""
        breadcrumb="Home > Accommodation"
        backgroundImage={pagesBanner.banner}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-2">Accommodation</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Find comfortable accommodation options near the conference venue.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error loading accommodation data</p>
            <p>Please try again later or contact support.</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border p-3 text-center">S.No</th>
                <th className="border p-3 text-center">Particular</th>
                <th className="border p-3 text-center">Distance</th>
                <th className="border p-3 text-center">Location</th>
                <th className="border p-3 text-center">Image</th>
                <th className="border p-3 text-center">Category</th>
                <th className="border p-3 text-center">Google Map Location</th>
                <th className="border p-3 text-center">Booking Contact</th>
              </tr>
            </thead>
            <tbody>
              {accommodationData.length > 0 ? (
                accommodationData.map((item, index) => (
                  <tr
                    key={item.Id || index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border p-3 text-center">{index + 1}</td>
                    <td className="border p-3">{item.Particular}</td>
                    <td className="border p-3 text-center">{item.Distance}</td>
                    <td className="border p-3">{item.Location}</td>
                    <td className="border p-3">
                      {item.ImageUrl ? (
                        <img
                          src={item.ImageUrl}
                          alt={item.Particular}
                          className="w-[180px]"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border p-3 text-center">
                      {item.Category ? item.Category : "-"}
                    </td>
                    <td className="border p-3 text-center">
                      {item.MapLocation ? (
                        <NavLink
                          to={item.MapLocation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Map
                        </NavLink>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td
                      className="border p-3"
                      dangerouslySetInnerHTML={{ __html: item.BookingContact }}
                    ></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border p-3 text-center">
                    No accommodation information available at this time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Accommodation;
