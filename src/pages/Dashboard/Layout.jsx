import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopNavbar from "../../components/dashboard/TopNavbar";
import Footer from "../../components/footer/Footer";

const LayoutDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid 2xl:grid-cols-[12%,1fr] xl:grid-cols-[18%,1fr] lg:grid-cols-[21%,1fr] min-h-screen bg-gray-50 ">
      <div className="">
        {/* Mobile sidebar */}
        <div
          className={`lg:hidden fixed top-0 inset-0 z-[99] h-screen ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="absolute inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col fixed top-0 max-w-[16rem] w-full bg-white h-screen">
            <Sidebar mobile={true} closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0 h-screen fixed top-0 left-0">
          <Sidebar />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <TopNavbar openSidebar={() => setSidebarOpen(true)} />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto main-width ">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default LayoutDashboard;
