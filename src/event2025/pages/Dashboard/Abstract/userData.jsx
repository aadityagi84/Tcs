// src/pages/Dashboard/Abstract/userData.jsx
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function UserDataModel({ open, onClose, data, setDatta }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-[9999]">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:w-[60%] md:w-[75%] w-[90%]">
            <div className="bg-[#EFF7FF] border rounded-[10px] p-10">
              <form>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                  <div className="w-full">
                    <label className="block mb-2 font-semibold">
                      Name Of Presentor *
                    </label>
                    <input
                      disabled
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
                      disabled
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
                    <label className="block mb-2 font-semibold">Topic *</label>
                    <input
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                </div>
                <div className="w-full my-8">
                  <Link
                    to={data.FileUrl}
                    className="bg-blue-600 px-6 py-3 text-white rounded"
                    target="_blank"
                  >
                    View Document
                  </Link>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
