import { useEffect, useState } from "react";
import { dashboard } from "../../imagesProvider/AllImages";
import { NavLink } from "react-router-dom";
import { checkIsReceipt } from "../../Services/dashboardFunction/checkReceiptAvailabe";
import { useAuth } from "../../contexts/LoginContext";

const DashboardCards = () => {
  const { user } = useAuth();
  const [receiptData, setReceiptData] = useState(false);
  useEffect(() => {
    const checkReceipt = async () => {
      try {
        const response = await checkIsReceipt(user);
        console.log(response);
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

  const cardData = [
    {
      title: "Delegate Profile",
      icon: dashboard.svg1,
      bgImage: dashboard.blueDash,
      bg: "",
      textColor: "text-white",
      iconBg: "bg-white/20",
      status: "incomplete",
      statusBg: "bg-red-500",
      link: "/dashboard/edit-profile",
    },
    {
      title: "Registration",
      icon: dashboard.svg3,
      bgImage: "",
      bg: "#DDEEFF",
      textColor: "#212121",
      iconBg: "bg-gray-200",
      status: `${receiptData ? "Completed" : "Pending"}`,
      statusBg: "bg-[#229D6C]",
      link: `${receiptData ? "/dashboard/receipt" : "/dashboard/registration"}`,
    },
    {
      title: "Proceed to Abstract",
      icon: dashboard.svg2,
      bgImage: "",
      bg: "#DDEEFF",
      textColor: "#212121",
      iconBg: "bg-gray-200",
      status: `${receiptData ? "Completed" : "Pending"}`,
      statusBg: "bg-[#229D6C]",
      link: `${
        receiptData ? "/dashboard/abstracts" : "/dashboard/registration"
      }`,
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {cardData.map((card, index) => (
        <NavLink key={index} to={card.link}>
          <div
            className="rounded-lg p-3  shadow-sm flex items-start w-full border flex-col lg:h-[210px] h-[150px] hover:shadow-md transition-shadow duration-300"
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
            <div className="p-4 flex items-center w-full justify-between  h-full">
              <div className="flex flex-col  w-full">
                <div className="flex lg:items-center items-start mt-2  justify-between w-full ">
                  <div className="w-full">
                    <h3
                      className={`${card.textColor} lg:text-[26px] md:text-[20px] text-[16px] font-semibold `}
                    >
                      {card.title}
                    </h3>
                  </div>

                  <div className={`  rounded-full`}>
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
        </NavLink>
      ))}
    </div>
  );
};

export default DashboardCards;
