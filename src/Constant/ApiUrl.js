// src/Constant/ApiUrl.js
const API_URL = import.meta.env.VITE_API_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  LOGIN: `${API_URL}/api/Website/CustomerLogin`,
  SIGNUP: `${API_URL}/api/Website/CreateCustomerRegistration`,

  // Website endpoints
  HOME_PAGE_LIST: `${API_URL}/api/Website/GetHomePageList`,
  SOCIETY_PAGE_LIST: `${API_URL}/api/Website/GetSocietyPageList`,
  MEMBERSHIP_PAGE_LIST: `${API_URL}/api/Website/GetMembershipPageList`,
  COMMITTEE_PAGE_LIST: `${API_URL}/api/Website/GetCommiteePageList`,
  FACULTY_PAGE_LIST: `${API_URL}/api/Website/GetFacultyPageList`,
  AWARDS_PAGE_LIST: `${API_URL}/api/Website/GetAwardsPageList`,
  REGISTRATION_PRICING: `${API_URL}/api/Website/GetDynamicRegistrationPricingData`,
  ABSTRACT_PAGE_LIST: `${API_URL}/api/Website/GetAbstractPageList`,
  CONFERENCE_PAGE_LIST: `${API_URL}/api/Website/GetConferancePageList`,
  WORKSHOP_PAGE_LIST: `${API_URL}/api/Website/GetWorkshopPageList`,
  EXHIBITION_PAGE_LIST: `${API_URL}/api/Website/GetExhibitionPageList`,
  ACCOMMODATION_PAGE_LIST: `${API_URL}/api/Website/GetAccomodationPageList`,
  ALL_DropDown: `${API_URL}/api/Website/GetAllDropDown`,
  proceed_to_abstract: `${API_URL}/api/Customer/CustomerAbstractSubmission`,
  GetPaymentToken: `${API_URL}/api/Customer/GetPaymentToken`,
  Check_order: `${API_URL}/api/Customer/check-order-status`,
  GetCustomerReceipt: `${API_URL}/api/Customer/GetCustomerReceipt`,
  CheckEventPriceByCurrency: `${API_URL}/api/Customer/CheckEventPriceByCurrency`,
};

export { API_URL };
