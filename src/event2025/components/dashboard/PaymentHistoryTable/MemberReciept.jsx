import React from "react";
import Receipt from "../../ReceiptComponent/Receipt";
import { useLocation } from "react-router-dom";

const MemberReciept = () => {
  const location = useLocation();
  const receiptData = location.state?.receiptData;
  console.log(receiptData);

  if (!receiptData) {
    return (
      <div className="text-center text-red-500">No receipt data found.</div>
    );
  }

  return (
    <div className="py-10">
      <Receipt data={receiptData} />
    </div>
  );
};

export default MemberReciept;
