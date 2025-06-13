import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

export const isMembershipPlan = async (user) => {
  try {
    const rs = await axios.get(API_ENDPOINTS.GeCustomerMembershipList, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    return rs.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetEventSelectedPriceList = async ({ id, user }) => {
  try {
    const rs = await axios.get(
      `${API_ENDPOINTS.GetEventSelectedPriceList}?Ids=${id}`,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};

export const GetCustomerReceipt = async ({ user }) => {
  try {
    const rs = await axios.get(
      `${API_ENDPOINTS.GetCustomerReceipt}?IsMemberShip=${1}`,
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    return rs;
  } catch (error) {
    console.log(error);
  }
};
