import React, { useEffect, useState } from "react";
import { ChevronRight, CreditCard, Clock } from "lucide-react";
import { getPaymentToken } from "../../Services/eventService";
import { useAuth } from "../../contexts/LoginContext";
import { useRazorpay } from "react-razorpay";
import {
  GetCustomerReceipt,
  GetEventSelectedPriceList,
} from "../../Services/dashboardFunction/MemeberShip";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkRecipetdata } from "../../Services/RazorPayComponent";
import { CustomerLoginTokenRefresh } from "../../Services/dashboardFunction/CustomerLoginTokenRefresh";
import { getDisplayName, getEmail, storeAuthData } from "../../Services/Api";

const MembershipOptions = ({ data, lastPayment }) => {
  console.log(data);
  const { user } = useAuth();
  const { Razorpay } = useRazorpay();
  const [isOpen, setIsOpen] = useState(false);
  const [accept, setAccept] = useState(false);
  const [res, setRes] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    setAccept(false);
    setRes(null);
  };

  const renuePlan = async ({ id, price, currencyId }) => {
    try {
      const response = await GetEventSelectedPriceList({ id, user });
      const ResponseStatus = response.data;
      console.log(ResponseStatus);
      setRes(ResponseStatus);
      setIsOpen(true);
      setAccept(false);
    } catch (error) {
      setAccept(false);
      console.error(error);
      toast.error("Failed to fetch plan details.");
    }
  };

  useEffect(() => {
    const processPayment = async () => {
      if (accept && res && res.rs === 1) {
        setIsOpen(false);
        try {
          const payload = {
            CurrencyId: res.res.CurrencyId,
            orderAmount: res.res.FinalPrice,
            EventTypeId: `${res.res.EventId || ""}`,
          };
          const paymentResponse = await getPaymentToken(payload, user);
          console.log(paymentResponse, "from cards ");

          if (paymentResponse.rs === 1) {
            const razorpayDetails = paymentResponse.res;
            const currencyCode = res.res.CurrencyId === 1 ? "INR" : "USD";

            const options = {
              key: razorpayDetails.RazorPayAppId,
              amount: res.res.FinalPrice,
              currency: currencyCode,
              name: "TCS Event",
              description:
                "The organizing committee of the 16TH TCS ANNUAL CONFERENCE & WORKSHOP(S) welcomes you one & all.",
              order_id: razorpayDetails.orderId,
              handler: async (response) => {
                setIsOpen(false);
                toast.success("Payment Successful!");
                console.log("for order id and testing id ", response);
                const receipt = await checkRecipetdata({
                  order_id: response.razorpay_order_id,
                  rzp_id: response.razorpay_payment_id,
                });
                console.log("after order id and response id", receipt);

                // const recepitData = await GetCustomerReceipt({ user });
                // console.log("payment data", response);
                // console.log("reciept data", recepitData.data.res);
                const userData = await getEmail();
                const email = userData.userData.email;
                // console.log(email, "for get name ");

                const data = await CustomerLoginTokenRefresh({ email, user });
                await storeAuthData(data);
                navigate("/event2025/dashboard/membershiprecipt", {
                  state: { receiptData: receipt.data.res },
                });

                // navigate("/event2025/dashboard/thankyou");
                closeModal();
              },
              prefill: {
                name: user?.name || "John Doe",
                email: user?.email || "john.doe@example.com",
                contact: user?.phone || "9999999999",
              },
              theme: { color: "#1560BD" },
            };

            const rzp = new Razorpay(options);
            rzp.on("payment.failed", (response) => {
              toast.error("Payment failed! Please try again.");
              console.error("Failed Payment:", response.error);
              closeModal();
            });
            rzp.open();
          } else {
            setAccept(false);
            toast.error("Failed to generate payment token.");
            closeModal();
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment processing error.");
          setAccept();
          closeModal();
        }
      }
    };

    processPayment();
  }, [accept, res, user, Razorpay]);

  // console.log(lastPayment);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-10">
        {lastPayment && (
          <div className="bg-gradient-to-br from-teal-600 to-blue-700 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-10 -ml-10 bg-white opacity-10 rounded-full"></div>

            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Last Payment</h3>
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Clock size={20} className="text-white" />
              </div>
            </div>

            <div className="font-bold text-3xl mb-10  h-[130px]">
              {lastPayment.CurrencyId ? (
                <> {lastPayment.CurrencyId === 1 ? "₹" : "$"} </>
              ) : (
                "₹"
              )}
              {/* {lastPayment.CurrencyId === 1 ? "₹" : "$"} */}
              {lastPayment.LastPaidAmount ? lastPayment.LastPaidAmount : "0"}
            </div>

            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-white border-opacity-20">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </div>
            </div>
          </div>
        )}

        {Array.isArray(data) &&
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.EventType}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.RegionName}
                  </p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
              </div>

              <div className="">
                {item.EventTypeId === 8 ? (
                  <>
                    {item.Type === 2 ? (
                      <div className="font-semibold text-3xl text-gray-900 mb-4">
                        {item.MemberShipNo}
                      </div>
                    ) : (
                      <div className="font-semibold text-3xl text-gray-900 mb-4">
                        {item.CurrencyId === 1 ? "₹" : "$"} {item.Price}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {item.Type === 1 ? (
                      <div className="font-semibold text-3xl text-gray-900 mb-4">
                        {item.MemberShipNo}
                      </div>
                    ) : (
                      <div className="font-semibold text-3xl text-gray-900 mb-4">
                        {item.CurrencyId === 1 ? "₹" : "$"} {item.Price}
                      </div>
                    )}
                  </>
                )}
              </div>
              {item.Notes && (
                <p
                  className="text-sm mb-6 line-clamp-2 h-[80px] overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.Notes }}
                ></p>
              )}

              {item.EventTypeId === 8 ? (
                <>
                  {item.Type === 2 ? (
                    ""
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          renuePlan({
                            id: item.Id,
                            price: item.Price,
                            currencyId: item.CurrencyId,
                          })
                        }
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-medium flex items-center justify-center w-full shadow-sm hover:shadow transition-all"
                      >
                        <span>Renew Your Plan</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {item.Type === 1 ? (
                    ""
                  ) : (
                    <button
                      onClick={() =>
                        renuePlan({
                          id: item.Id,
                          price: item.Price,
                          currencyId: item.CurrencyId,
                        })
                      }
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-medium flex items-center justify-center w-full shadow-sm hover:shadow transition-all"
                    >
                      <span>Renew Your Plan</span>
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
      </div>

      {isOpen && res && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow w-full max-w-2xl p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Payment Summary
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition">
                    <th className="text-left px-4 py-3 font-medium bg-gray-100 text-black w-1/3">
                      Currency
                    </th>
                    <td className="px-4 py-3 text-black">
                      {res.res.CurrencyId === 1 ? "INR" : "USD"}
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition">
                    <th className="text-left px-4 py-3 font-medium bg-gray-100 text-black">
                      Base Price
                    </th>
                    <td className="px-4 py-3 text-black">{res.res.Price}</td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition">
                    <th className="text-left px-4 py-3 font-medium bg-gray-100 text-black">
                      GST Amount
                    </th>
                    <td className="px-4 py-3 text-black">
                      {res.res.GstAmount}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <th className="text-left px-4 py-3 font-medium bg-gray-100 text-black">
                      GST Applied
                    </th>
                    <td className="px-4 py-3 text-black">
                      {res.res.IsGst ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition font-semibold">
                    <th className="text-left px-4 py-3 font-semibold bg-gray-100 text-black">
                      Final Price
                    </th>
                    <td className="px-4 py-3 text-black">
                      {res.res.FinalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={() => setAccept(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                I accept
              </button>
              <button
                onClick={closeModal}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-blue-700 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipOptions;
