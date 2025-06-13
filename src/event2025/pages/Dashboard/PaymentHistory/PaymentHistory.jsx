import React, { useEffect } from "react";
import PaymentHistoryTable from "../../../components/dashboard/PaymentHistoryTable/PaymentHistoryTable";

const PaymentHistory = () => {
  return (
    <div>
      <div className=" mx-auto my-10 sm:w-[580px] w-[380px] md:w-[700px] lg:w-full">
        <PaymentHistoryTable />
      </div>
    </div>
  );
};

export default PaymentHistory;
