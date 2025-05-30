import React from "react";

const Notification = ({ data }) => {
  return (
    <div>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full border border-[#000] text-left">
          {/* <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300">Event</th>
              <th className="p-3 border border-gray-300">Date</th>
            </tr>
          </thead> */}
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border font-bold border-gray-300">
                  {item.event}
                </td>
                <td className="p-3 border font-bold border-gray-300">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
