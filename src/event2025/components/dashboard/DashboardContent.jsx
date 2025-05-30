import React from "react";
import DashboardCards from "./DashboardCards";
import MembershipOptions from "./MembershipOptions";

const DashboardContent = () => {
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
          <MembershipOptions />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
