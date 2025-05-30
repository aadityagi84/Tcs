import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

export const GetCustomerPaymentLists = async ({
  CurrentPage,
  RecordsPerPage,
  SearchName,
  user,
}) => {
  try {
    const payload = {
      CurrentPage,
      RecordsPerPage,
      SearchName,
    };

    const res = await axios.post(
      API_ENDPOINTS.GetCustomerPaymentList,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
