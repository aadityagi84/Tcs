import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  User,
  FileText,
  LogOut,
  X,
} from "lucide-react";
import { headerImages } from "../../imagesProvider/AllImages";
import { logout } from "../../Services/Api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/LoginContext";
import { checkIsReceipt } from "../../Services/dashboardFunction/checkReceiptAvailabe";

const Sidebar = ({ mobile = false, closeSidebar }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/")[1];
  const { user } = useAuth();
  const [receiptData, setReceiptData] = useState(false);
  useEffect(() => {
    const checkReceipt = async () => {
      try {
        const response = await checkIsReceipt(user);
        if (response.data.rs === 1) {
          setReceiptData(true);
        } else {
          console.log("Receipt check failed:", response.data);
        }
      } catch (error) {
        console.error("Error fetching receipt data:", error);
      }
    };
    if (user) {
      checkReceipt();
    }
  }, [user]);

  const menuItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboards",
    },
    {
      id: "resources",
      icon: <BookOpen size={20} />,
      label: "Resources",
    },
    {
      id: "payment-history",
      icon: <CreditCard size={20} />,
      label: "Payment History",
    },
    {
      id: "edit-profile",
      icon: <User size={20} />,
      label: "Edit Profile",
    },
    {
      id: `${receiptData ? "abstracts" : "dashboard/registration"}`,
      icon: <FileText size={20} />,
      label: "Abstract Submission",
    },
    {
      id: "plans",
      icon: <CreditCard size={20} />,
      label: "Plans and Pricing",
    },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-[100vh]">
      {/* Logo and Close Button (for mobile) */}
      <div className="p-4 flex items-center justify-between">
        <div className="  overflow-hidden flex items-center">
          <img
            src={headerImages.logo}
            alt="The Cytometry Society Logo"
            className="h-full w-full object-contain"
          />
        </div>
        {mobile && (
          <button
            onClick={closeSidebar}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-2 space-y-1 px-2">
        {menuItems.map((item) => {
          const isActive = currentPath === item.id;

          return (
            <Link
              key={item.id}
              to={`/${item.id}`}
              onClick={mobile ? closeSidebar : undefined}
              className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div
                className={`mr-3 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              >
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto mb-6 px-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <LogOut size={18} className="mr-2" />
          <span className="font-medium">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
