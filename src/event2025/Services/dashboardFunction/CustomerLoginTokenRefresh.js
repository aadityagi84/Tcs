import axios from "axios";
import { API_ENDPOINTS } from "../../Constant/ApiUrl";

export const CustomerLoginTokenRefresh = async ({ email, user }) => {
  try {
    const rc = await axios.post(
      `${API_ENDPOINTS.CustomerLoginTokenRefresh}`,
      {
        EmailId: email,
      },
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    // console.log(rc.data.res);
    return rc.data.res;
  } catch (error) {
    console.log(error);
  }
};
