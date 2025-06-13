// Registration.js
import React, { useEffect, useState } from "react";
import {
  GetDynamicRegistrationPricingData,
  getPriceMemebership,
} from "../../Services/accomodation";
import eventService, { getPaymentToken } from "../../Services/eventService";
import { RegistrationSkeleton } from "../../components/Skeleton/TableSkeleton";
import { useAuth } from "../../contexts/LoginContext";
import { checkRecipetdata } from "../../Services/RazorPayComponent";
import { useRazorpay } from "react-razorpay";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UpdatePrice } from "../../Services/dashboardFunction/RegistrationTable";
import { getEmail, storeAuthData } from "../../Services/Api";
import { CustomerLoginTokenRefresh } from "../../Services/dashboardFunction/CustomerLoginTokenRefresh";

const PricingTable = ({ regionData, selectedValue, onSelect }) => {
  if (!regionData || !regionData.Data || regionData.Data.length === 0)
    return null;

  const groupedData = regionData.Data.reduce((acc, item) => {
    if (!acc[item.EventType]) acc[item.EventType] = [];
    acc[item.EventType].push(item);
    return acc;
  }, {});

  const eventTypes = Object.keys(groupedData);

  const pricingColumns = Object.keys(regionData.Data[0]).filter(
    (key) =>
      !["EventType", "UserType"].includes(key) &&
      !key.toLowerCase().includes("id")
  );

  return (
    <div className="mb-4">
      <div className="bg-blue-800 text-white p-3 font-bold border border-gray-400 border-b-0">
        {regionData.Region === "Indian"
          ? "For delegates of Indian Origin ₹"
          : "For Overseas delegates US $(GST+Taxes applicable)"}
      </div>
      <div className="overflow-x-auto border border-gray-400">
        <table className="min-w-full table-fixed border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th
                className="border border-gray-400 px-3 py-2"
                style={{ width: 160 }}
              >
                Event
              </th>
              <th
                className="border border-gray-400 px-3 py-2"
                style={{ width: 180 }}
              >
                Category
              </th>
              {pricingColumns.map((col) => (
                <th
                  key={col}
                  className="border border-gray-400 px-3 py-2"
                  style={{ width: 140 }}
                >
                  {col}
                </th>
              ))}
              <th
                className="border border-gray-400 px-3 py-2"
                style={{ width: 100 }}
              >
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {eventTypes.map((eventType) => {
              const rows = groupedData[eventType];
              return rows.map((item, idx) => {
                const rowKey = `${eventType}-${item.UserType}`;
                return (
                  <tr
                    key={rowKey}
                    className={idx % 2 === 1 ? "bg-gray-100" : ""}
                  >
                    {idx === 0 && (
                      <td
                        className="border border-gray-400 px-3 py-2 font-bold text-center align-middle"
                        rowSpan={rows.length}
                      >
                        {eventType}
                      </td>
                    )}
                    <td className="border border-gray-400 px-3 py-2 font-semibold text-center">
                      {item.UserType}
                    </td>
                    {pricingColumns.map((col) => (
                      <td
                        key={col}
                        className="border border-gray-400 px-3 py-2 text-center"
                      >
                        {item[col]}
                      </td>
                    ))}
                    <td className="border border-gray-400 cursor-pointer px-3 py-2 text-center">
                      <input
                        type="radio"
                        name="pricingOption"
                        value={rowKey}
                        checked={selectedValue?.rowKey === rowKey}
                        onChange={() => onSelect({ rowKey, item })}
                      />
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EventPriceDetails = ({ eventPriceData, pricing, setPricing }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState({}); // Track selected Value for each day
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [EventId, setEventId] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState({});

  const { Razorpay } = useRazorpay();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { res } = eventPriceData;
  if (!res) return null;

  useEffect(() => {
    if (res?.EventId) {
      setPricing((prev) => ({ ...prev, EventTypeId: res.EventId.toString() }));
      setEventId(res.EventId);
    }
    if (res?.CurrencyId) {
      setSelectedCurrency(res.CurrencyId.toString());
    }
  }, [res?.EventId, res]);

  const groupedByDay = Array.isArray(res.DropdownList)
    ? res.DropdownList.reduce((acc, item) => {
        if (!acc[item.DayType]) acc[item.DayType] = [];
        acc[item.DayType].push(item);
        return acc;
      }, {})
    : {};

  const groupedByDay2 = Array.isArray(res.DropdownList2)
    ? res.DropdownList2.reduce((acc, item) => {
        if (!acc[item.DayType]) acc[item.DayType] = [];
        acc[item.DayType].push(item);
        return acc;
      }, {})
    : {};

  const handleSelectionChange = (dayType, selectedText, selectedValue) => {
    if (!selectedText || selectedText.trim() === "") {
      setSelectedOptions((prev) => {
        const newOptions = { ...prev };
        delete newOptions[dayType];
        return newOptions;
      });
      setSelectedValues((prev) => {
        const newValues = { ...prev };
        delete newValues[dayType];
        return newValues;
      });
      setPricing((prev) => ({
        ...prev,
        [`WorkShopDay${dayType}`]: "",
      }));
      return;
    }

    // Check if the selected Value is already chosen for another day
    const otherDay = dayType === "1" ? "2" : "1";
    if (selectedValues[otherDay] === selectedValue) {
      toast.error("You have already selected this workshop for another day.");
      return;
    }

    setSelectedOptions((prev) => ({
      ...prev,
      [dayType]: selectedText,
    }));

    setSelectedValues((prev) => ({
      ...prev,
      [dayType]: selectedValue,
    }));

    setPricing((prev) => ({
      ...prev,
      [`WorkShopDay${dayType}`]: selectedText,
    }));
  };

  const handleCurrencyChange = async (e) => {
    const value = e.target.value;
    setSelectedCurrency(value);
    if (value && EventId) {
      const DataOptions = {
        CurrencyId: Number(value),
        EventTypeId: `${EventId}`,
      };
      try {
        const updatedPriceResponse = await UpdatePrice(DataOptions, user);
        if (updatedPriceResponse?.res) {
          setUpdatedPrice(updatedPriceResponse.res);
        }
      } catch (error) {
        console.error("Error updating price:", error);
        toast.error("Failed to update price. Please try again.");
      }
    }
  };

  const handlePayment = async () => {
    try {
      if (res?.IsWorkShop) {
        if (
          !pricing?.WorkShopDay1 &&
          !pricing?.WorkShopDay2 &&
          !pricing?.WorkShopDay3
        ) {
          toast.error("Please select at least one workshop before continuing.");
          return;
        }
      }

      const orderAmount = updatedPrice?.FinalPrice
        ? Number(updatedPrice.FinalPrice)
        : Number(pricing?.orderAmount ?? 0);

      const payload = {
        ...pricing,
        orderAmount,
        CurrencyId: selectedCurrency
          ? Number(selectedCurrency)
          : Number(pricing?.CurrencyId ?? 0),
        EventTypeId: String(pricing?.EventTypeId || ""),
        WorkShopDay1: pricing?.WorkShopDay1 || "",
        WorkShopDay2: pricing?.WorkShopDay2 || "",
        WorkShopDay3: pricing?.WorkShopDay3 || "",
      };
      setLoading(true);

      const paymentResponse = await getPaymentToken(payload, user);

      if (paymentResponse?.res) {
        setLoading(false);
        const razorpayDetails = paymentResponse.res;

        const currencyCodeMap = {
          1: "INR",
          2: "USD",
        };
        const currencyCode = currencyCodeMap[selectedCurrency] || "INR";

        const options = {
          key: razorpayDetails.RazorPayAppId,
          amount: razorpayDetails.amount,
          currency: currencyCode,
          name: "TCS Event",
          description:
            "The organizing committee of the 16TH TCS ANNUAL CONFERENCE & WORKSHOP(S) welcomes you one & all.",
          order_id: razorpayDetails.orderId,
          handler: async (response) => {
            toast.success("Payment Successful!");
            const receipt = await checkRecipetdata({
              order_id: razorpayDetails.orderId,
              rzp_id: response.razorpay_payment_id,
            });

            const userData = await getEmail();
            const email = userData.userData.email;
            // console.log(email, "for get name ");

            const data = await CustomerLoginTokenRefresh({ email, user });
            await storeAuthData(data);
            // console.log("after registration", receipt);
            navigate("/event2025/dashboard/receipt", {
              state: { receiptData: receipt.data.res },
            });
          },
          prefill: {
            name: user?.name || "John Doe",
            email: user?.email || "john.doe@example.com",
            contact: user?.phone || "9999999999",
          },
          theme: {
            color: "#1560BD",
          },
        };

        if (paymentResponse.rs === 1) {
          const rzp = new Razorpay(options);
          rzp.on("payment.failed", function (response) {
            toast.error("Payment failed! Please try again.");
            console.error("Failed Payment:", response.error);
          });
          rzp.open();
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Event Price Details</h3>

      {res?.CurrencyId === 1 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-blue-200 rounded-lg mb-4">
          <h4 className="font-semibold mb-4 text-yellow-800 flex items-center">
            <span className="mr-2">🏭</span>Choose Amount according to currency
          </h4>
          <div className="p-4 bg-white border border-yellow-300 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <h5 className="font-medium text-gray-800">
                Choose Currency Method
              </h5>
            </div>
            <div className="mb-3">
              <select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">--Select--</option>
                <option value="1">INR</option>
                <option value="2">USD</option>
              </select>
            </div>
            {/* {selectedCurrency && (
              <div className="mt-2 p-2 bg-yellow-100 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Selected:</strong>{" "}
                  {selectedCurrency === "1" ? "INR" : "USD"}
                </p>
              </div>
            )} */}
          </div>
        </div>
      )}

      <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
        <h4 className="text-md font-semibold mb-3 text-blue-700">
          Price Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Base Price</p>
            <p className="text-xl font-bold text-blue-800">
              {`${selectedCurrency === "1" ? "₹" : "$"}${
                updatedPrice?.Price ?? res?.Price
              }`}
            </p>
          </div>
          {res.IsGst && (
            <div className="text-center p-3 bg-orange-50 rounded">
              <p className="text-sm text-gray-600">
                {updatedPrice?.CurrencyId === 2 ? "USD Rate" : "GST Amount"}
              </p>
              <p className="text-xl font-bold text-orange-600">
                {`${selectedCurrency === "1" ? "₹" : "₹"}${
                  updatedPrice?.CurrencyId === 1
                    ? updatedPrice.GstAmount
                    : updatedPrice?.USDRate ?? res.GstAmount
                }`}
              </p>
            </div>
          )}
          <div className="text-center p-3 bg-green-50 rounded">
            <p className="text-sm text-gray-600">Final Price</p>
            <p className="text-xl font-bold text-green-700">
              {`${selectedCurrency === "1" ? "₹" : "$"}${
                updatedPrice?.FinalPrice ?? res.FinalPrice
              }`}
            </p>
          </div>
        </div>
      </div>

      {res.IsWorkShop
        ? res.IsWorkShop &&
          Object.keys(groupedByDay).length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-yellow-800 flex items-center">
                <span className="mr-2">🏭</span>Workshop Schedule - Select
                Options for Day 1
              </h4>
              <div className="space-y-4">
                {Object.keys(groupedByDay)
                  .sort()
                  .map((dayType) => (
                    <div
                      key={dayType}
                      className="p-4 bg-white border border-yellow-300 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full text-sm font-bold mr-3">
                          {dayType}
                        </span>
                        <h5 className="font-medium text-gray-800">
                          Day {dayType} Workshop Options
                        </h5>
                      </div>
                      <div className="mb-3">
                        <select
                          value={selectedOptions[dayType] || ""}
                          onChange={(e) => {
                            const selectedOption = groupedByDay[dayType].find(
                              (item) => item.Text === e.target.value
                            );
                            handleSelectionChange(
                              dayType,
                              e.target.value,
                              selectedOption ? selectedOption.Value : null
                            );
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">--Select--</option>
                          {groupedByDay[dayType].map((item) => (
                            <option
                              key={item.Value}
                              value={item.Text}
                              disabled={selectedValues["2"] === item.Value}
                            >
                              {item.Text}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* {selectedOptions[dayType] && (
                        <div className="mt-2 p-2 bg-yellow-100 rounded">
                          <p className="text-sm text-yellow-800">
                            <strong>Selected:</strong>{" "}
                            {selectedOptions[dayType]}
                          </p>
                        </div>
                      )} */}
                    </div>
                  ))}
              </div>
            </div>
          )
        : ""}

      {res.IsWorkShop
        ? res.IsWorkShop &&
          Object.keys(groupedByDay2).length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-yellow-800 flex items-center">
                <span className="mr-2">🏭</span>Workshop Schedule - Select
                Options for Day 2
              </h4>
              <div className="space-y-4">
                {Object.keys(groupedByDay2)
                  .sort()
                  .map((dayType) => (
                    <div
                      key={dayType}
                      className="p-4 bg-white border border-yellow-300 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full text-sm font-bold mr-3">
                          {dayType}
                        </span>
                        <h5 className="font-medium text-gray-800">
                          Day {dayType} Workshop Options
                        </h5>
                      </div>
                      <div className="mb-3">
                        <select
                          value={selectedOptions[dayType] || ""}
                          onChange={(e) => {
                            const selectedOption = groupedByDay2[dayType].find(
                              (item) => item.Text === e.target.value
                            );
                            handleSelectionChange(
                              dayType,
                              e.target.value,
                              selectedOption ? selectedOption.Value : null
                            );
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">--Select--</option>
                          {groupedByDay2[dayType].map((item) => (
                            <option
                              key={item.Value}
                              value={item.Text}
                              disabled={selectedValues["1"] === item.Value}
                            >
                              {item.Text}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* {selectedOptions[dayType] && (
                        <div className="mt-2 p-2 bg-yellow-100 rounded">
                          <p className="text-sm text-yellow-800">
                            <strong>Selected:</strong>{" "}
                            {selectedOptions[dayType]}
                          </p>
                        </div>
                      )} */}
                    </div>
                  ))}
              </div>
            </div>
          )
        : ""}

      <div className="flex items-center justify-center py-10">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="text-white bg-blue-600 px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

const Registration = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pricesData, setPricesData] = useState([]);
  const [eventPriceData, setEventPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEventPrice, setIsLoadingEventPrice] = useState(false);
  const { user } = useAuth();
  const [pricing, setPricing] = useState({
    orderAmount: "",
    CurrencyId: "",
    WorkShopDay1: "",
    WorkShopDay2: "",
    WorkShopDay3: "",
    EventTypeId: "",
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        const [res] = await Promise.all([
          getPriceMemebership(user),
          new Promise((resolve) => setTimeout(resolve, 2000)),
        ]);
        setPricesData(res.data?.res || []);
      } catch (err) {
        console.error("Error fetching pricing data", err);
        toast.error("Failed to load pricing data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrices();
  }, [user]);

  const handleSelect = async ({ rowKey, item }) => {
    const ids = Object.entries(item)
      .filter(([key]) => key.toLowerCase().includes("id"))
      .map(([_, value]) => value);

    setSelectedOption({ rowKey, ids });

    if (ids.length > 0) {
      try {
        setIsLoadingEventPrice(true);
        setEventPriceData(null);

        const eventPriceResponse = await eventService.getEventSelectedPriceList(
          ids
        );
        setEventPriceData(eventPriceResponse);

        setPricing((prev) => ({
          ...prev,
          orderAmount: eventPriceResponse.res?.FinalPrice || "",
          CurrencyId: eventPriceResponse.res?.CurrencyId?.toString() || "",
          WorkShopDay1: "",
          WorkShopDay2: "",
          WorkShopDay3: "",
          EventTypeId: "",
        }));
      } catch (error) {
        console.error("Error fetching event price data:", error);
        toast.error("Failed to load event price details.");
        setEventPriceData(null);
      } finally {
        setIsLoadingEventPrice(false);
      }
    } else {
      setEventPriceData(null);
    }
  };

  if (isLoading) return <RegistrationSkeleton />;

  return (
    <div className="p-4 md:p-8 lg:p-16">
      {pricesData.map((regionData) => (
        <PricingTable
          key={regionData.Region}
          regionData={regionData}
          selectedValue={selectedOption}
          onSelect={handleSelect}
        />
      ))}

      {isLoadingEventPrice && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700">Loading event price details...</p>
        </div>
      )}

      {eventPriceData && !isLoadingEventPrice && (
        <EventPriceDetails
          eventPriceData={eventPriceData}
          pricing={pricing}
          setPricing={setPricing}
        />
      )}
    </div>
  );
};

export default Registration;
