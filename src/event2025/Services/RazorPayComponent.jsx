import axios from "axios";
import { API_ENDPOINTS } from "../Constant/ApiUrl";

export const checkRecipetdata = async ({ order_id, rzp_id }) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.Check_order}/${order_id}?PaymentId=${rzp_id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
