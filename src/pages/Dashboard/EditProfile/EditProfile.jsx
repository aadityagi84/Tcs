import { useState, useEffect } from "react";
import { getCountries, getStates } from "../../../Services/dropdownService";
import customerService from "../../../Services/CustomerEditFormService";

export default function EditProfileForm() {
  const [formData, setFormData] = useState({
    prefix: "",
    name: "",
    surname: "",
    currentDesignation: "",
    currentOrganisation: "",
    communicationAddress: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
    emailId: "",
    dob: "",
    gender: "",
    countryCode: "",
    mealPreference: "",
    department: "",
  });

  const [customerData, setCustomerData] = useState(null);
  const [dropdownData, setDropdownData] = useState({
    countries: [],
    states: [],
  });

  const [loading, setLoading] = useState({
    customer: false,
    countries: false,
    states: false,
    submitting: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    try {
      return dateString.split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Load customer data on component mount
  useEffect(() => {
    const loadCustomerData = async () => {
      setLoading((prev) => ({ ...prev, customer: true }));
      setError(null);

      try {
        const response = await customerService.getCustomerByIdList();
        console.log("Customer API Response:", response);

        if (response.rs === 1) {
          // Use the first customer from rc array or res object
          const customer =
            response.rc && response.rc.length > 0
              ? response.rc[0]
              : response.res;

          if (customer && customer.Id) {
            setCustomerData(customer);

            // Map API data to form fields
            setFormData((prev) => ({
              ...prev,
              prefix: customer.Title || "",
              name: customer.FirstName || "",
              surname: customer.LastName || "",
              currentDesignation: customer.Position || "",
              currentOrganisation: customer.Institute || "",
              communicationAddress: customer.Address || "",
              country: customer.CountryId ? customer.CountryId.toString() : "",
              state: customer.StateId ? customer.StateId.toString() : "",
              city: customer.City || "",
              mobile: customer.MobileNo || "",
              emailId: customer.EmailId || "",
              dob: formatDateForInput(customer.DOB),
              gender: customer.Gender || "",
              countryCode: customer.CountryCode || "",
              mealPreference: customer.MealPreferance || "",
              department: customer.Department || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error loading customer data:", error);
        setError("Failed to load customer data. Please try again.");
      } finally {
        setLoading((prev) => ({ ...prev, customer: false }));
      }
    };

    loadCustomerData();
  }, []);

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      setLoading((prev) => ({ ...prev, countries: true }));
      try {
        const countries = await getCountries();
        setDropdownData((prev) => ({ ...prev, countries }));
      } catch (error) {
        console.error("Error loading countries:", error);
        setError("Failed to load countries. Please try again.");
      } finally {
        setLoading((prev) => ({ ...prev, countries: false }));
      }
    };

    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    const loadStates = async () => {
      if (!formData.country) {
        setDropdownData((prev) => ({ ...prev, states: [] }));
        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        return;
      }

      setLoading((prev) => ({ ...prev, states: true }));
      try {
        const states = await getStates(formData.country);
        setDropdownData((prev) => ({ ...prev, states }));
        // Only reset state if it's not already set from loaded customer data
        if (
          !customerData ||
          formData.country !==
            (customerData.CountryId ? customerData.CountryId.toString() : "")
        ) {
          setFormData((prev) => ({ ...prev, state: "", city: "" }));
        }
      } catch (error) {
        console.error("Error loading states:", error);
      } finally {
        setLoading((prev) => ({ ...prev, states: false }));
      }
    };

    loadStates();
  }, [formData.country]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSuccess(false);
    setError(null);

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!customerData) {
      setError("Customer data not loaded. Please try again.");
      return;
    }

    // Validate required fields based on API error response
    const requiredFields = {
      name: "FirstName",
      surname: "LastName",
      prefix: "Title",
      currentDesignation: "Position",
      currentOrganisation: "Institute",
      department: "Department",
      communicationAddress: "Address",
      city: "City",
      mobile: "MobileNo",
      countryCode: "CountryCode",
      mealPreference: "MealPreferance",
    };

    const missingFields = [];
    Object.entries(requiredFields).forEach(([formField, apiField]) => {
      if (!formData[formField] || formData[formField].trim() === "") {
        missingFields.push(apiField);
      }
    });

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setLoading((prev) => ({ ...prev, submitting: true }));
    setError(null);
    setSuccess(false);

    try {
      // Map form data to API format
      const apiData = {
        Id: customerData.Id,
        EmailId: formData.emailId,
        Title: formData.prefix,
        FirstName: formData.name,
        LastName: formData.surname,
        DOB: formData.dob,
        Gender: formData.gender,
        Institute: formData.currentOrganisation,
        Department: formData.department,
        Position: formData.currentDesignation,
        CountryId: formData.country ? parseInt(formData.country) : null,
        StateId: formData.state ? parseInt(formData.state) : null,
        CountryName: null, // Will be set by backend
        StateName: null, // Will be set by backend
        City: formData.city,
        Address: formData.communicationAddress,
        CountryCode: formData.countryCode,
        MobileNo: formData.mobile,
        MealPreferance: formData.mealPreference,
        IsActive: customerData.IsActive,
      };

      console.log("Submitting customer data:", apiData);
      const response = await customerService.updateCustomerById(apiData);

      if (response.rs === 1) {
        setSuccess(true);
        console.log("Customer updated successfully:", response);
      } else {
        setError("Failed to update customer. Please try again.");
      }
    } catch (error) {
      console.error("Error updating customer:", error);

      // Handle validation errors from API
      if (error.errors) {
        const errorMessages = Object.entries(error.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("; ");
        setError(`Validation errors: ${errorMessages}`);
      } else {
        setError("Failed to update customer. Please try again.");
      }
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  const renderSelect = (
    name,
    options,
    placeholder,
    disabled = false,
    isLoading = false
  ) => (
    <select
      name={name}
      value={formData[name]}
      onChange={handleInputChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      disabled={disabled || isLoading}
      required
    >
      <option value="">{isLoading ? "Loading..." : placeholder}</option>
      {options.map((option) => (
        <option key={option.Value} value={option.Value}>
          {option.Text}
        </option>
      ))}
    </select>
  );

  if (loading.customer) {
    return (
      <div className="p-4">
        <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Profile
            </h1>
          </div>
          <div className="p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading customer data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
          {customerData && (
            <p className="text-sm text-gray-600 mt-1">
              Editing profile for: {customerData.EmailId}
            </p>
          )}
        </div>

        <div className="p-8 space-y-8">
          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">
                    Profile updated successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="prefix"
                  placeholder="Prefix/Title* (Mr, Mrs, Dr, etc.)"
                  value={formData.prefix}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="First Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="surname"
                  placeholder="Last Name*"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="currentDesignation"
                  placeholder="Current Position*"
                  value={formData.currentDesignation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="currentOrganisation"
                  placeholder="Current Institute/Organisation*"
                  value={formData.currentOrganisation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="department"
                  placeholder="Department*"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                />
              </div>
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div>
                <select
                  name="mealPreference"
                  value={formData.mealPreference}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                >
                  <option value="">Meal Preference*</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Jain">Jain</option>
                </select>
              </div>
              <div>
                <input
                  type="email"
                  name="emailId"
                  placeholder="Email ID"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Communication Address Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Address Information
            </h3>
            <div className="space-y-6">
              <div>
                <textarea
                  name="communicationAddress"
                  placeholder="Address*"
                  rows="3"
                  value={formData.communicationAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {renderSelect(
                    "country",
                    dropdownData.countries,
                    "Country*",
                    false,
                    loading.countries
                  )}
                </div>
                <div>
                  {renderSelect(
                    "state",
                    dropdownData.states,
                    "State*",
                    !formData.country,
                    loading.states
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City*"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <input
                  type="text"
                  name="countryCode"
                  placeholder="Country Code* (+1, +91, etc.)"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile*"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading.submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span>Update Profile</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
