import React, { useEffect, useState } from "react";
import DashboardCards from "./DashboardCards";
import MembershipOptions from "./MembershipOptions";
import { checkStatus } from "../../Services/dashboardFunction/checkReceiptAvailabe";
import { useAuth } from "../../contexts/LoginContext";
import { isMembershipPlan } from "../../Services/dashboardFunction/MemeberShip";

const DashboardContent = () => {
  const { user } = useAuth();
  const [member, setIsMember] = useState([""]);
  const [lastPayment, setlastPayment] = useState({
    CurrencyId: "",
    LastPaidAmount: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const statusRes = await checkStatus(user);
        const rc = statusRes?.data?.res;
        // console.log(rc);
      } catch (error) {
        console.log(error);
      }
    };
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
    getData();
  }, [user]);
  // console.log(lastPayment);
  return (
    <div className="flex-1 overflow-auto py-10">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-[rgba(175,175,175,0.66)]">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Membership Options Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Membership Options
          </h2>
          <MembershipOptions data={member} lastPayment={lastPayment} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
