import React, { useEffect, useState } from "react";
import MembershipOptions from "../../components/dashboard/MembershipOptions";
import { isMembershipPlan } from "../../Services/dashboardFunction/MemeberShip";
import { checkStatus } from "../../Services/dashboardFunction/checkReceiptAvailabe";
import { useAuth } from "../../contexts/LoginContext";

const Plan = () => {
  const [member, setIsMember] = useState([""]);
  const { user } = useAuth();

  const [lastPayment, setlastPayment] = useState({
    CurrencyId: "",
    LastPaidAmount: "",
  });

  useEffect(() => {
    const isMember = async () => {
      const rcdata = await isMembershipPlan(user);
      if (rcdata.rs == 1) {
        return setIsMember(rcdata.rc);
      } else {
        console.log("Error in fetch data in membership");
      }
    };
    const checkLastPayment = async () => {
      try {
        const statusRes = await checkStatus(user);
        const res = statusRes.data.res;
        setlastPayment({
          CurrencyId: res.CurrencyId,
          LastPaidAmount: res.LastPaidAmount,
        });
      } catch (error) {
        console.log(error);
      }
    };

    isMember();
    checkLastPayment();
  }, [user]);
  // console.log(las
  return (
    <div className="py-10">
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Plans and Pricing
        </h2>
        <MembershipOptions data={member} lastPayment={lastPayment} />
      </div>
    </div>
  );
};

export default Plan;
