import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/LoginContext";
import { GetResourceList } from "../../Services/dashboardFunction/GetResourceCategoryList";
import ResourceModal from "./ResourceModal";

const ResourcePage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [UserList, setUserList] = useState({
    CurrentPage: 1,
    RecordsPerPage: 30,
  });
  const [data, setData] = useState([]);
  const [modalUrl, setModalUrl] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getResourceData = async () => {
      setLoading(true);
      try {
        const payload = {
          currentPage: UserList.CurrentPage,
          recordsPerPage: UserList.RecordsPerPage,
          CategoryId: Number(id),
        };

        const res = await GetResourceList({ payload, user });
        console.log(res.data.rc);
        setData(res.data.rc || []);
      } catch (error) {
        console.error("Failed to fetch resource list:", error);
        setData([]);
      }
      setLoading(false);
    };

    if (id) getResourceData();
  }, [id, user, UserList.CurrentPage, UserList.RecordsPerPage]);

  const handlePageChange = (page) => {
    if (page < 1) return;
    setUserList((prev) => ({ ...prev, CurrentPage: page }));
  };

  return (
    <>
      <div className="py-10 w-[380px] md:w-[700px] lg:w-full mx-auto">
        <div className="flex flex-wrap justify-between items-center bg-blue-700 text-white px-4 py-2 rounded-t">
          <div className="flex items-center gap-2">
            <label htmlFor="entries">Show</label>
            <select
              id="entries"
              className="text-black px-2 py-1 rounded"
              value={UserList.RecordsPerPage}
              onChange={(e) =>
                setUserList({
                  CurrentPage: 1,
                  RecordsPerPage: Number(e.target.value),
                })
              }
            >
              {[5, 10, 25, 30, 50].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="lg:w-full w-[1200px] text-center border border-t-0">
            <thead className="bg-blue-100 text-sm">
              <tr>
                <th className="border p-2">S. No</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Affiliation</th>
                <th className="border p-2">FileUrl</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No data found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.Id || index} className="text-sm">
                    <td className="border p-2">
                      {String(
                        (UserList.CurrentPage - 1) * UserList.RecordsPerPage +
                          index +
                          1
                      ).padStart(2, "0")}
                      .
                    </td>
                    <td className="border p-2">{item.TitleOftheTalk || "-"}</td>
                    <td className="border p-2">{item.PresenterName || "-"}</td>

                    <td className="border p-2">{item.Affiliation || "-"}</td>
                    <td className="border p-2">
                      {item.FileUrl ? (
                        <button
                          onClick={() => setModalUrl(item.FileUrl)}
                          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                        >
                          View
                        </button>
                      ) : (
                        // <Link
                        //   to={item.FileUrl}
                        //   target="_blank"
                        //   className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                        // >
                        //   View
                        // </Link>
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center rounded-b sm:text-sm text-[10px]">
          <span>
            Showing{" "}
            {data.length === 0
              ? 0
              : (UserList.CurrentPage - 1) * UserList.RecordsPerPage + 1}{" "}
            to{" "}
            {(UserList.CurrentPage - 1) * UserList.RecordsPerPage + data.length}{" "}
            entries
          </span>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-white text-blue-700 rounded disabled:opacity-50"
              onClick={() => handlePageChange(UserList.CurrentPage - 1)}
              disabled={UserList.CurrentPage === 1}
            >
              Previous
            </button>
            <span>{UserList.CurrentPage}</span>
            <button
              className="px-3 md:text-[16px] text-[14px] py-1 bg-white text-blue-700 rounded disabled:opacity-50"
              onClick={() => handlePageChange(UserList.CurrentPage + 1)}
              disabled={data.length < UserList.RecordsPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {modalUrl && (
        <ResourceModal url={modalUrl} onClose={() => setModalUrl(null)} />
      )}
    </>
  );
};

export default ResourcePage;
