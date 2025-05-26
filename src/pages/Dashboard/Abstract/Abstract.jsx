import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { abstract } from "../../../Services/Abstract";
import { useAuth } from "../../../contexts/LoginContext";
import toast, { ToastBar } from "react-hot-toast";

const AbstractSubmissionForm = () => {
  const [file, setFile] = useState(null);
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
        alert("File size should be less than or equal to 5MB");
        toast.error("File size should be less than or equal to 5MB");
      }
    }
  };
  const handleSubmitAbstract = async (e) => {
    e.preventDefault();
    try {
      const apidata = await abstract({ data, user });
      if (apidata.data.res.ResponseStatus === 1) {
        console.log(data);
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
      } else {
        toast.error("Submission failed. Please check your input.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="my-10">
      <div className=" p-4">
        <h2 className="text-[25px] font-bold mb-4">Proceed to Abstract</h2>
      </div>
      <div className="bg-[#EFF7FF] border rounded-[10px] p-10">
        <form action="" onSubmit={handleSubmitAbstract}>
          <div className="grid grid-cols-3 gap-10">
            <div className="w-full ">
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
            <div className="w-full ">
              <label className="block mb-2 font-semibold">City Name *</label>
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
            <div className="w-full ">
              <label className="block mb-2 font-semibold">Topic *</label>
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
            <div className="w-full ">
              <label className="block mb-2 font-semibold">
                List Of Author *
              </label>
              <input
                type="text"
                value={data.ListOfAuthor}
                onChange={(e) =>
                  setDatta((prev) => ({
                    ...prev,
                    ListOfAuthor: e.target.value,
                  }))
                }
                required
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Type here..."
              />
            </div>
            <div className="w-full ">
              <label className="block mb-2 font-semibold">Institute *</label>
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
            <div className="w-full ">
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
                    IsConsentForSocialMedia: parseInt(e.target.value, 10),
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
              <div className="parent">
                <div className="file-upload">
                  {/* <img src={uploadImg} alt="upload" /> */}
                  <h3>Click box to upload</h3>
                  <p>Maximun file size 5mb</p>
                  <input type="file" onChange={handleFileChange} />
                  {data.File && <p>Selected file: {data.File.name}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 mx-2">
            <button
              className="bg-blue text-white rounded-tr-[10px] rounded-bl-[10px]  px-6 py-3"
              type="submit"
            >
              <span className="flex items-center gap-2">
                Submit <FaArrowRightLong />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AbstractSubmissionForm;
