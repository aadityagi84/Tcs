import { useEffect, useState } from "react";
import { dashboard } from "../../imagesProvider/AllImages";
import { useNavigate } from "react-router-dom";
import {
  checkIsReceipt,
  checkStatus,
} from "../../Services/dashboardFunction/checkReceiptAvailabe";
import { useAuth } from "../../contexts/LoginContext";
import { toast } from "react-hot-toast";

const DashboardCards = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [receiptData, setReceiptData] = useState(false);
  const [abstractProfileCount, setAbstractProfileCount] = useState(null);
  const [totalAbstractCount, setTotalAbstractCount] = useState(null);
  const [finalCount, setFinalCount] = useState(null);

  const [status, setStatus] = useState({
    IsAbstractProfile: false,
    IsDeligateProfile: false,
    IsRegistrationProfile: false,
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Check receipt availability
        const receiptRes = await checkIsReceipt(user);
        setReceiptData(receiptRes.data.rs === 1);

        // Check status
        const statusRes = await checkStatus(user);
        const rc = statusRes?.data?.res;
        if (rc) {
          setStatus({
            IsAbstractProfile: rc.IsAbstractProfile,
            IsDeligateProfile: rc.IsDeligateProfile,
            IsRegistrationProfile: rc.IsRegistrationProfile,
          });
          setAbstractProfileCount(rc.AbstractProfileCount);
          setTotalAbstractCount(rc.AbstractCount);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [user]);

  // Calculate finalCount whenever counts change
  useEffect(() => {
    if (
      abstractProfileCount !== null &&
      totalAbstractCount !== null &&
      !isNaN(abstractProfileCount) &&
      !isNaN(totalAbstractCount)
    ) {
      setFinalCount(totalAbstractCount - abstractProfileCount);
    }
  }, [abstractProfileCount, totalAbstractCount]);

  const handleCardClick = (type) => {
    const { IsAbstractProfile, IsDeligateProfile, IsRegistrationProfile } =
      status;

    if (type === "registration") {
      if (!IsDeligateProfile) {
        return toast.error("Please complete your Delegate Profile first.");
      }
      return navigate(
        receiptData
          ? "/event2025/dashboard/receipt"
          : "/event2025/dashboard/registration"
      );
    }

    if (type === "abstract") {
      if (!IsDeligateProfile || !IsRegistrationProfile) {
        return toast.error(
          "Please complete Registration first to proceed to Abstract."
        );
      }
      return navigate(
        receiptData
          ? "/event2025/dashboard/abstracts"
          : "/event2025/dashboard/registration"
      );
    }

    if (type === "profile") {
      return navigate("/event2025/dashboard/edit-profile");
    }
  };

  const cardData = [
    {
      title: "Delegate Profile",
      icon: dashboard.svg1,
      bgImage: dashboard.blueDash,
      bg: "",
      textColor: "text-white",
      iconBg: "bg-white/20",
      status: status.IsDeligateProfile ? "Completed" : "Incomplete",
      statusBg: status.IsDeligateProfile ? "bg-green-600" : "bg-red-500",
      onClick: () => handleCardClick("profile"),
    },
    {
      title: "Registration",
      icon: dashboard.svg3,
      bgImage: "",
      bg: "#DDEEFF",
      textColor: "#212121",
      iconBg: "bg-gray-200",
      status:
        status.IsRegistrationProfile && receiptData
          ? "Completed"
          : status.IsDeligateProfile
          ? "Pending"
          : "Locked",
      statusBg:
        status.IsRegistrationProfile && receiptData
          ? "bg-green-600"
          : status.IsDeligateProfile
          ? "bg-yellow-500"
          : "bg-gray-500",
      onClick: () => handleCardClick("registration"),
    },
    {
      title: "Proceed to Abstract",
      icon: dashboard.svg2,
      bgImage: "",
      bg: "#DDEEFF",
      textColor: "#212121",
      iconBg: "bg-gray-200",
      status:
        status.IsAbstractProfile && receiptData
          ? "Completed"
          : status.IsRegistrationProfile
          ? "Pending"
          : "Locked",
      statusBg:
        status.IsAbstractProfile && receiptData
          ? "bg-green-600"
          : status.IsRegistrationProfile
          ? "bg-yellow-500"
          : "bg-gray-500",
      onClick: () => handleCardClick("abstract"),
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          onClick={card.onClick}
          className="rounded-lg p-3 cursor-pointer shadow-sm flex items-start w-full border flex-col lg:h-[210px] h-[150px] hover:shadow-md transition-shadow duration-300"
          style={{
            backgroundImage: card.bgImage ? `url(${card.bgImage})` : "none",
            backgroundColor: !card.bgImage ? card.bg : "transparent",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`${card.statusBg} px-3 py-1 self-start text-xs font-medium text-white rounded-[5px]`}
          >
            {card.status}
          </div>
          <div className="p-4 flex items-center w-full justify-between h-full">
            <div className="flex flex-col w-full">
              <div className="flex lg:items-center items-start mt-2 justify-between w-full">
                <div className="w-full">
                  <h3
                    className={`${card.textColor} lg:text-[26px] md:text-[20px] text-[16px] pb-2 font-semibold`}
                  >
                    {card.title}
                  </h3>
                  {card.title === "Proceed to Abstract" &&
                    finalCount !== null && (
                      <span className="text-sm bg-white px-4 py-2 rounded-tr-[10px] rounded-bl-[10px] text-[#3b82f6] font-semibold mt-1">
                        {finalCount} Abstract left
                      </span>
                    )}
                </div>
                <div className="rounded-full">
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="lg:w-[80%] w-[50%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
