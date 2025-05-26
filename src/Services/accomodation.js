import axios from "axios";
import { API_ENDPOINTS } from "../Constant/ApiUrl";

export const getAccomdationPageList = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.ACCOMMODATION_PAGE_LIST}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// dashboard registration

export const GetDynamicRegistrationPricingData = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.REGISTRATION_PRICING}`);
    return response;
  } catch (error) {
    console.log(error.message || error);
  }
};
