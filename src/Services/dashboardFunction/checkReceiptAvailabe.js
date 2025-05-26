import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

export const checkIsReceipt = async (user) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GetCustomerReceipt, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
