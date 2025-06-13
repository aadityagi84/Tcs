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

export const GetDynamicRegistrationPricingData = async (user) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.REGISTRATION_PRICING}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message || error);
  }
};
export const getPriceMemebership = async (user) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.GetDynamicRegistrationPricingData}`,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    // console.log("data after ", response);
    return response;
  } catch (error) {
    console.log(error.message || error);
  }
};
