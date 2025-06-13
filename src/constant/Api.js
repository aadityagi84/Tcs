const API_URL = import.meta.env.VITE_API_URL;

export const society = {
  homepage: `${API_URL}/api/Society/GetHomePageList`,
  GetSocietyPageList: `${API_URL}/api/Society/GetSocietyPageList`,
  GetECMemberPageList: `${API_URL}/api/Society/GetECMemberPageList`,
  GetMembershipPageList: `${API_URL}/api/Society/GetMembershipPageList`,
  GetRegCertificatePageList: `${API_URL}/api/Society/GetRegCertificatePageList`,
  GetContactUsPageList: `${API_URL}/api/Society/GetContactUsPageList`,
  GetByLawPageList: `${API_URL}/api/Society/GetByLawPageList`,
  GetElectionNotificationPageList: `${API_URL}/api/Society/GetElectionNotificationPageList`,
  GetResourcePageList: `${API_URL}/api/Society/GetResourcePageList`,
  GetResourcePageDetailsList: `${API_URL}/api/Society/GetResourcePageDetailsList`,
  GetAwardsPageList: `${API_URL}/api/Society/GetAwardsPageList`,
  GetAnnualMeetingPageList: `${API_URL}/api/Society/GetAnnualMeetingPageList`,
  GetAnnualMeetingPageDetailsList: `${API_URL}/api/Society/GetAnnualMeetingPageDetailsList`,
  GetWorkshopandConferancePageList: `${API_URL}/api/Society/GetWorkshopandConferancePageList`,
};
