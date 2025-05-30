import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { abstract, getSingleAbstract } from "../../../Services/Abstract";
import { useAuth } from "../../../contexts/LoginContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkStatus } from "../../../Services/dashboardFunction/checkReceiptAvailabe";
import { IoPersonAdd } from "react-icons/io5";
import AbstractTable from "./AbstractTable";

const AbstractSubmissionForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setDatta] = useState({
    Customer_Fk_Id: null,
    NameOfPresentor: "",
    CityId: 0,
    CityName: "",
    Topic: "",
    ListOfAuthor: "",
    Institute: "",
    AbstractWord: "",
    IsConsentForSocialMedia: 0,
    File: null,
  });
  const [AbstractProfileCount, setAbstractProfileCount] = useState(null);
  const [totalAbstractCount, setTotalAbstractCount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (selectedFile.size <= maxSize) {
        setDatta((prev) => ({
          ...prev,
          File: selectedFile,
        }));
      } else {
        toast.error("File size should be less than or equal to 5MB");
      }
    }
  };

  const handleSubmitAbstract = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const apidata = await abstract({ data, user });
      if (apidata.data.res.ResponseStatus === 1) {
        setLoading(false);
        navigate("/event2025/dashboard");
        toast.success("Abstract submitted successfully!");
        setDatta({
          Customer_Fk_Id: null,
          NameOfPresentor: "",
          CityId: 0,
          CityName: "",
          Topic: "",
          ListOfAuthor: "",
          Institute: "",
          AbstractWord: "",
          IsConsentForSocialMedia: 0,
          File: null,
        });
        setFile(null);
        setShowForm(false); // hide form after successful submit
      } else {
        setLoading(false);
        toast.error("Submission failed. Please check your input.");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Updated showForm:", showForm);
    // // if (showForm) {
    // //   alert("Form is now visible!");
    // // }
  }, [showForm]);

  const enableForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const data = await checkStatus(user);
        const rc = data?.data.res;
        setAbstractProfileCount(rc.AbstractProfileCount);
        setTotalAbstractCount(rc.AbstractCount);
      } catch (err) {
        console.error("Error checking user status:", err);
      }
    };
    if (user) {
      checkUserStatus();
    }
  }, [user, AbstractProfileCount, totalAbstractCount]);

  return (
    <div className="py-10  overflow-hidden">
      <div className="p-4 flex md:flex-row flex-col   w-full md:items-center justify-center md:justify-between">
        <div>
          <h2 className="text-[20px] md:textr-left text-center font-bold mb-4">
            Proceed to Abstract
          </h2>
        </div>
        <div className="">
          {AbstractProfileCount <= 0 ? (
            ""
          ) : (
            <>
              {AbstractProfileCount < totalAbstractCount && (
                <button
                  onClick={enableForm}
                  className={`${
                    showForm ? "bg-red-600" : "bg-blue-600"
                  } flex items-center justify-center md:w-auto w-[180px] mx-auto  gap-2 md:text-[15px] text-[14px] text-white px-6 py-3 rounded-[10px]`}
                >
                  {showForm ? (
                    <>
                      Cancel Abstract <IoPersonAdd />
                    </>
                  ) : (
                    <>
                      Add Abstract <IoPersonAdd />
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="">
        {AbstractProfileCount <= 0 ? (
          <>
            {AbstractProfileCount < totalAbstractCount ? (
              <div className="bg-[#EFF7FF] border rounded-[10px] p-10">
                <form onSubmit={handleSubmitAbstract}>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-10">
                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        Name Of Presentor *
                      </label>
                      <input
                        required
                        value={data.NameOfPresentor}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            NameOfPresentor: e.target.value,
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        City Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.CityName}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            CityName: e.target.value,
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        Topic *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.Topic}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            Topic: e.target.value,
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        List Of Author *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.ListOfAuthor}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            ListOfAuthor: e.target.value,
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        Institute *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.Institute}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            Institute: e.target.value,
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        Abstract Word *
                      </label>
                      <input
                        required
                        type="text"
                        value={data.AbstractWord}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            AbstractWord: e.target.value,
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-2 font-semibold">
                        Consent For SocialMedia *
                      </label>
                      <select
                        required
                        value={data.IsConsentForSocialMedia}
                        onChange={(e) =>
                          setDatta((prev) => ({
                            ...prev,
                            IsConsentForSocialMedia: parseInt(
                              e.target.value,
                              10
                            ),
                          }))
                        }
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      >
                        <option value="">---</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </select>
                    </div>

                    <div className="w-full ">
                      <label className="block mb-2 font-semibold">File*</label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        className="border bg-white  p-1 rounded "
                      />
                      {/* {data.File && <p>Selected file: {data.File.name}</p>} */}
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-600 w-full md:w-[350px] mx-auto text-white px-10 py-3 mt-6 rounded-md md:text-[15px] text-[14px]"
                  >
                    {loading ? "Submitting..." : "Submit Abstract"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="  w-[390px] sm:w-[600px] lg:w-full mx-auto ">
                <AbstractTable />
              </div>
            )}
          </>
        ) : (
          <>
            {showForm ? (
              <div className="mb-10">
                {AbstractProfileCount < totalAbstractCount ? (
                  <div className="bg-[#EFF7FF] border rounded-[10px] p-10">
                    <form onSubmit={handleSubmitAbstract}>
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            Name Of Presentor *
                          </label>
                          <input
                            required
                            value={data.NameOfPresentor}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                NameOfPresentor: e.target.value,
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            City Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={data.CityName}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                CityName: e.target.value,
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            Topic *
                          </label>
                          <input
                            type="text"
                            required
                            value={data.Topic}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                Topic: e.target.value,
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            List Of Author *
                          </label>
                          <input
                            type="text"
                            required
                            value={data.ListOfAuthor}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                ListOfAuthor: e.target.value,
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            Institute *
                          </label>
                          <input
                            type="text"
                            required
                            value={data.Institute}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                Institute: e.target.value,
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            Abstract Word *
                          </label>
                          <input
                            required
                            type="text"
                            value={data.AbstractWord}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                AbstractWord: e.target.value,
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                          />
                        </div>

                        <div className="w-full">
                          <label className="block mb-2 font-semibold">
                            Consent For SocialMedia *
                          </label>
                          <select
                            required
                            value={data.IsConsentForSocialMedia}
                            onChange={(e) =>
                              setDatta((prev) => ({
                                ...prev,
                                IsConsentForSocialMedia: parseInt(
                                  e.target.value,
                                  10
                                ),
                              }))
                            }
                            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                          >
                            <option value="">---</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </select>
                        </div>

                        <div className="w-full ">
                          <label className="block mb-2 font-semibold">
                            File*
                          </label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            className="border bg-white  p-1 rounded "
                          />
                          {/* {data.File && <p>Selected file: {data.File.name}</p>} */}
                        </div>
                      </div>

                      <button
                        disabled={loading}
                        type="submit"
                        className="bg-blue-600 w-full md:w-[350px] mx-auto text-white px-10 py-3 mt-6 rounded-md md:text-[15px] text-[14px]"
                      >
                        {loading ? "Submitting..." : "Submit Abstract"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="  w-[390px] sm:w-[600px] lg:w-full mx-auto ">
                    <AbstractTable />
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="  w-[390px] sm:w-[600px] lg:w-full mx-auto ">
              <AbstractTable />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AbstractSubmissionForm;
