import React, { useEffect, useState } from "react";
import { GetCustomerPaymentLists } from "../../../Services/dashboardFunction/PaymentHistory";
import { useAuth } from "../../../contexts/LoginContext";

const PaymentHistoryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  const [UserList, setUserList] = useState({
    CurrentPage: 1,
    RecordsPerPage: 15,
    SearchName: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GetCustomerPaymentLists({
          ...UserList,
          user: user,
        });
        // console.log(res);
        setData(res?.rc || []);
      } catch (err) {
        console.error("Failed to fetch payment data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [UserList]);
  // console.log(data);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setUserList({
        ...UserList,
        SearchName: searchTerm,
        CurrentPage: 1,
      });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setUserList((prev) => ({
      ...prev,
      CurrentPage: newPage,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-[25px] font-bold mb-4">Payment History</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center bg-blue-700 text-white px-4 py-2 rounded-t">
        <div className="flex items-center gap-2">
          <label htmlFor="entries">Show</label>
          <select
            id="entries"
            className="text-black px-2 py-1 rounded"
            value={UserList.RecordsPerPage}
            onChange={(e) =>
              setUserList({
                ...UserList,
                RecordsPerPage: Number(e.target.value),
                CurrentPage: 1,
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

        {/* search functionliaty */}
        {/* <div className="flex items-center gap-2">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="text-black px-2 py-1 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="lg:w-full w-[1000px] text-center border border-t-0">
          <thead className="bg-blue-100 text-sm">
            <tr>
              <th className="border p-2">S. No</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Registration No</th>
              <th className="border p-2">Event Name</th>
              <th className="border p-2">WorkShopDays</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="border p-2">
                    {String(
                      (UserList.CurrentPage - 1) * UserList.RecordsPerPage +
                        index +
                        1
                    ).padStart(2, "0")}
                    .
                  </td>
                  <td className="border p-2">{item.Title}</td>
                  <td className="border p-2">
                    {item.FirstName}&nbsp;{item.LastName}
                  </td>
                  <td className="border p-2">
                    {item.RegistrationNo ? item.RegistrationNo : "Null"}
                  </td>
                  <td className="border p-2">{item.EventName}</td>
                  <td className="border p-2">
                    {item.WorkShopDay1 ? (
                      <>
                        <span className="font-semibold"> WorkShopDay1:</span>{" "}
                        {item.WorkShopDay1}
                        <br /> <br />
                      </>
                    ) : (
                      ""
                    )}
                    {item.WorkShopDay2 ? (
                      <>
                        <span className="font-semibold"> WorkShopDay2:</span>
                        {item.WorkShopDay2}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="border p-2 w-[110px]">
                    <span className="font-semibold">
                      {item.CurrencyId === 1 || item.CurrencyId == null
                        ? "₹"
                        : "$"}
                    </span>
                    {item.Amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center rounded-b text-sm">
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
            className="px-3 py-1 bg-white text-blue-700 rounded disabled:opacity-50"
            onClick={() => handlePageChange(UserList.CurrentPage + 1)}
            disabled={data.length < UserList.RecordsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
