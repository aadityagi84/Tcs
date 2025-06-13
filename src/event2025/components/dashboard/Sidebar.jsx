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
import { getUserData, logout } from "../../Services/Api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/LoginContext";
import { checkIsReceipt } from "../../Services/dashboardFunction/checkReceiptAvailabe";
import { GetResourceCategoryList } from "../../Services/dashboardFunction/GetResourceCategoryList";

const Sidebar = ({ mobile = false, closeSidebar }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [receiptData, setReceiptData] = useState(false);
  const [resourceCategories, setResourceCategories] = useState([]);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const checkReceipt = async () => {
      try {
        const response = await checkIsReceipt(user);
        // console.log(response);
        if (response.data.rs === 1) {
          setReceiptData(true);
        }
      } catch (error) {
        console.error("Error fetching receipt data:", error);
      }
    };
    const checkIsMember = async () => {
      try {
        const userData = getUserData();
        // console.log("from sidebar", userData);
        if (userData.IsMemberShip === 1) {
          setIsMember(true);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
      }
    };

    const getResourceList = async () => {
      try {
        const res = await GetResourceCategoryList({ user });
        // console.log(res);
        const valid = res.rc.filter(
          (item) => item.Id !== null && item.ResourceCategory !== null
        );
        // console.log("valid", valid);
        setResourceCategories(valid);
      } catch (error) {
        console.error("Error loading resource categories:", error);
      }
    };

    if (user) {
      checkReceipt();
      checkIsMember();
      getResourceList();
    }
  }, [user, isMember]);

  const prefixPath = (path) => {
    if (!path.startsWith("/event2025/")) {
      return `/event2025${path.startsWith("/") ? path : "/" + path}`;
    }
    return path;
  };

  const logoLink = location.pathname.startsWith("/event2025/")
    ? "/event2025"
    : "/";

  const menuItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboards",
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
      id: receiptData ? "abstracts" : "dashboard/registration",
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
      await logout();
      navigate("/event2025/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-[100vh]">
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        <div className="overflow-hidden flex items-center">
          <Link to={logoLink}>
            <img
              src={headerImages.logo}
              alt="The Cytometry Society Logo"
              className="h-full w-full object-contain"
            />
          </Link>
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
        {/* Standard Items */}
        {menuItems.map((item) => {
          const isActive = location.pathname === prefixPath(`/${item.id}`);
          return (
            <Link
              key={item.id}
              to={prefixPath(`/${item.id}`)}
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

        {isMember && (
          <div className="px-2">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center w-full px-4 py-3 text-sm text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <BookOpen size={20} className="mr-3 text-blue-600" />
              <span className="font-medium flex-1">Resources</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isResourcesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all overflow-y-auto hide-scrollbar ${
                isResourcesOpen ? "max-h-[300px]" : "max-h-0"
              }`}
            >
              {resourceCategories.map((res) => (
                <Link
                  key={res.Id}
                  to={prefixPath(`/resources/${res.Id}`)}
                  onClick={mobile ? closeSidebar : undefined}
                  className="block ml-9 px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  {res.ResourceCategory}
                </Link>
              ))}
            </div>
          </div>
        )}
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
