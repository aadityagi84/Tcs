import axios from "axios";
import { society } from "../constant/Api";

export const getHomePageData = async () => {
  try {
    const rs = await axios.get(society.homepage);
    // console.log("data from api comes ", rs.data);
    const rec = rs.data.res;
    return rec;
  } catch (error) {
    console.log(error);
  }
};

// about society
export const GetSocietyPageList = async () => {
  try {
    const rs = await axios.get(society.GetSocietyPageList);
    // console.log("data from api comes ", rs.data);
    const rec = rs.data.res;
    return rec;
  } catch (error) {
    console.log(error);
  }
};
// Ec members
export const GetECMemberPageList = async () => {
  try {
    const rs = await axios.get(society.GetECMemberPageList);
    // console.log("data from api comes ", rs.data);
    const rec = rs.data.res;
    return rec;
  } catch (error) {
    console.log(error);
  }
};
// GetMembershipPageList
export const GetMembershipPageList = async () => {
  try {
    const rs = await axios.get(society.GetMembershipPageList);
    // console.log("data from api comes ", rs.data);
    const rec = rs.data.res;
    return rec;
  } catch (error) {
    console.log(error);
  }
};

// GetRegCertificatePageList
export const GetRegCertificatePageList = async () => {
  try {
    const rs = await axios.get(society.GetRegCertificatePageList);
    // console.log("data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.rc) {
      return rs.data.rc;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// GetContactUsPageList
export const GetContactUsPageList = async () => {
  try {
    const rs = await axios.get(society.GetContactUsPageList);
    // console.log("contact us data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.res) {
      return rs.data.res;
    }
    return null;
  } catch (error) {
    console.log("Error fetching contact us data:", error);
    return null;
  }
};

// GetByLawPageList
export const GetByLawPageList = async () => {
  try {
    const rs = await axios.get(society.GetByLawPageList);
    // console.log("bylaws data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.res) {
      return rs.data.res;
    }
    return null;
  } catch (error) {
    console.log("Error fetching bylaws data:", error);
    return null;
  }
};

// GetElectionNotificationPageList
export const GetElectionNotificationPageList = async () => {
  try {
    const rs = await axios.get(society.GetElectionNotificationPageList);
    // console.log("election notification data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.res) {
      return rs.data.res;
    }
    return null;
  } catch (error) {
    console.log("Error fetching election notification data:", error);
    return null;
  }
};

// GetResourcePageList - GET request to fetch resource categories by year
export const GetResourcePageList = async () => {
  try {
    const rs = await axios.get(society.GetResourcePageList);
    // console.log("resource page data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.rc) {
      return rs.data.rc;
    }
    return [];
  } catch (error) {
    console.log("Error fetching resource page data:", error);
    return [];
  }
};

// GetResourcePageDetailsList - POST request to fetch resource details by category
export const GetResourcePageDetailsList = async (currentPage = 1, recordsPerPage = 10, categoryId) => {
  try {
    const requestData = {
      currentPage,
      recordsPerPage,
      CategoryId: categoryId
    };

    const rs = await axios.post(society.GetResourcePageDetailsList, requestData);
    // console.log("resource page details data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.rc) {
      return {
        resources: rs.data.rc,
        totalRecords: rs.data.rc.length > 0 ? rs.data.rc[0].TotalRecords : 0
      };
    }
    return {
      resources: [],
      totalRecords: 0
    };
  } catch (error) {
    console.log("Error fetching resource page details:", error);
    return {
      resources: [],
      totalRecords: 0
    };
  }
};

// GetAwardsPageList
export const GetAwardsPageList = async () => {
  try {
    const rs = await axios.get(society.GetAwardsPageList);
    // console.log("awards data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.res) {
      return rs.data.res;
    }
    return null;
  } catch (error) {
    console.log("Error fetching awards data:", error);
    return null;
  }
};

// GetAnnualMeetingPageList - POST request to fetch annual meeting list
export const GetAnnualMeetingPageList = async () => {
  try {
    const requestData = {
      Id: null
    };

    const rs = await axios.post(society.GetAnnualMeetingPageList, requestData);
    // console.log("annual meeting data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.rc) {
      return rs.data.rc;
    }
    return [];
  } catch (error) {
    console.log("Error fetching annual meeting data:", error);
    return [];
  }
};

// GetAnnualMeetingPageDetailsList - POST request to fetch annual meeting details by meeting ID
export const GetAnnualMeetingPageDetailsList = async (currentPage = 1, recordsPerPage = 100, meetingId) => {
  try {
    const requestData = {
      currentPage,
      recordsPerPage,
      MeetingId: meetingId
    };

    const rs = await axios.post(society.GetAnnualMeetingPageDetailsList, requestData);
    // console.log("annual meeting details data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.rc) {
      return {
        meetingDetails: rs.data.rc,
        totalRecords: rs.data.rc.length > 0 ? rs.data.rc[0].TotalRecords : 0
      };
    }
    return {
      meetingDetails: [],
      totalRecords: 0
    };
  } catch (error) {
    console.log("Error fetching annual meeting details:", error);
    return {
      meetingDetails: [],
      totalRecords: 0
    };
  }
};


// GetWorkshopandConferancePageList - GET request to fetch workshop and conference list
export const GetWorkshopandConferancePageList = async () => {
  try {
    const rs = await axios.get(society.GetWorkshopandConferancePageList);
    // console.log("workshop and conference data from api comes ", rs.data);

    if (rs.data.rs === 1 && rs.data.res) {
      return rs.data.res;
    }
    return [];
  } catch (error) {
    console.log("Error fetching workshop and conference data:", error);
    return [];
  }
};
