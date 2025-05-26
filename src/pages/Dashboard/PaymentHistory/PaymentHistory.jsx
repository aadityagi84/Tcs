import React from "react";
import PaymentHistoryTable from "../../../components/dashboard/PaymentHistoryTable/PaymentHistoryTable";

const dummyData = [
  {
    paymentId: "77294415",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2028",
  },
  {
    paymentId: "77294416",
    amount: 50,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },

  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989248",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
  {
    paymentId: "77294416",
    amount: 500,
    orderId: "648989244",
    date: "10-05-2025",
  },
];

const PaymentHistory = () => {
  return (
    <div>
      <div className=" mx-auto my-10">
        <PaymentHistoryTable data={dummyData} />
      </div>
    </div>
  );
};

export default PaymentHistory;
