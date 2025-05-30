import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/LoginContext";
import { abstractList, getSingleAbstract } from "../../../Services/Abstract";
import { Link } from "react-router-dom";
import UserDataModel from "./userData";

const AbstractTable = () => {
  const { user } = useAuth();
  const [abstractData, setAbstractData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setDatta] = useState({
    NameOfPresentor: "",
    CityName: "",
    Topic: "",
    ListOfAuthor: "",
    Institute: "",
    AbstractWord: "",
    IsConsentForSocialMedia: "",
    FileUrl: "",
  });

  useEffect(() => {
    const getAbstractTableData = async () => {
      try {
        setLoading(true);
        const [response] = await Promise.all([
          abstractList(user),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
        // console.log(response);
        setAbstractData(response.rc);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getAbstractTableData();
    }
  }, [user]);
  useEffect(() => {
    if (viewData.length > 0) {
      setDatta(viewData[0]);
    }
  }, [viewData]);

  const getUserDetail = async (id) => {
    try {
      const rs = await getSingleAbstract({ id, user });
      setViewData(rs.rc);
      setDatta(rs.rc[0]);
      setIsModalOpen(true); // Open modal here
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("data for view", viewData);
  return (
    <>
      <div className="flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-blue-500 animate-spin h-10 w-10 border-4 border-blue-300 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block  py-2 sm:px-6 lg:px-8">
              <div className="border mx-auto">
                <table className="  w-full text-left text-sm font-light text-surface">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th className="px-6 py-4">SNo</th>
                      <th className="px-6 py-4">Topic</th>
                      <th className="px-6 py-4">Name Of Presentor</th>
                      <th className="px-6 py-4">List Of Author</th>
                      <th className="px-6 py-4">Institute</th>
                      <th className="px-6 py-4">City Name</th>
                      <th className="px-6 py-4">Abstract Word</th>
                      <th className="px-6 py-4">Consent For Social Media</th>
                      <th className="px-6 py-4">File URL</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {abstractData.map((data, index) => (
                      <tr
                        key={data.Id || index}
                        className="border-b border-neutral-200"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.Topic}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.NameOfPresentor}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.ListOfAuthor}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.Institute}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.CityName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.AbstractWord}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.IsConsentForSocialMedia ? "Yes" : "No"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {data.FileUrl ? (
                            <Link
                              to={data.FileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              View File
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            onClick={() => getUserDetail(data.Id)}
                            className="text-blue-500 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {abstractData.length === 0 && (
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center py-4 text-gray-500"
                        >
                          No abstracts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <UserDataModel
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={data}
          setDatta={setDatta}
        />
      )}
    </>
  );
};

export default AbstractTable;
