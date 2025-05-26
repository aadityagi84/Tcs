import React, { useState } from "react";

const PaymentHistoryTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className=" p-4">
      <h2 className="text-[25px] font-bold mb-4">Payment History</h2>
      <div className="flex flex-wrap justify-between items-center bg-blue-700 text-white px-4 py-2 rounded-t">
        <div className="flex items-center gap-2">
          <label htmlFor="entries">Show</label>
          <select
            id="entries"
            className="text-black px-2 py-1 rounded"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 25, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="text-black px-2 py-1 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border border-t-0">
          <thead className="bg-blue-100 text-sm">
            <tr>
              <th className="border p-2">S. No</th>
              <th className="border p-2">Payment ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Order Id</th>
              <th className="border p-2">Date of Payment</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="text-sm">
                <td className="border p-2">
                  {String(index + 1).padStart(2, "0")}.
                </td>
                <td className="border p-2">{item.paymentId}</td>
                <td className="border p-2">{item.amount}</td>
                <td className="border p-2">{item.orderId}</td>
                <td className="border p-2">{item.date}</td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-700 text-white px-4 py-2 flex justify-between items-center rounded-b text-sm">
        <span>
          Showing{" "}
          {filteredData.length === 0
            ? 0
            : (currentPage - 1) * entriesPerPage + 1}{" "}
          to {Math.min(currentPage * entriesPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-white text-blue-700 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            className="px-3 py-1 bg-white text-blue-700 rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
