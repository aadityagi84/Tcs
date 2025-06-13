import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

export const GetResourceCategoryList = async ({ user }) => {
  try {
    const data = await axios.get(API_ENDPOINTS.GetResourceCategoryList, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetResourceList = async ({ payload, user }) => {
  try {
    const data = await axios.post(API_ENDPOINTS.GetResourceList, payload, {
      headers: {
        Authorization: `Bearer ${user}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
