import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

export const UpdatePrice = async (data, userToken) => {
  try {
    const res = await axios.post(
      API_ENDPOINTS.CheckEventPriceByCurrency,
      data,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating price:", error);
    throw error;
  }
};
