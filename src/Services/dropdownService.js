import { API_ENDPOINTS } from "../Constant/ApiUrl";

// Base function to fetch dropdown data
const fetchDropdownData = async (flag, parentId = null) => {
    try {
        const params = new URLSearchParams({ Flag: flag });
        if (parentId) params.append('ParentId', parentId);

        const response = await fetch(`${API_ENDPOINTS.ALL_DropDown}?${params}`);
        const data = await response.json();

        if (data.rs !== 1) {
            throw new Error('API returned error status');
        }

        return data;
    } catch (error) {
        console.error(`Error fetching ${flag}:`, error.message);
        throw error;
    }
};

// Get all countries
export const getCountries = async () => {
    try {
        const response = await fetchDropdownData('country');
        return response.rc || [];
    } catch (error) {
        console.error('Failed to fetch countries:', error.message);
        return [];
    }
};

// Get states by country ID
export const getStates = async (countryId) => {
    if (!countryId) {
        console.warn('Country ID is required');
        return [];
    }

    try {
        const response = await fetchDropdownData('state', countryId);
        return response.rc || [];
    } catch (error) {
        console.error(`Failed to fetch states for country ${countryId}:`, error.message);
        return [];
    }
};

// Get cities by state ID (kept for future use if needed)
export const getCities = async (stateId) => {
    if (!stateId) {
        console.warn('State ID is required');
        return [];
    }

    try {
        const response = await fetchDropdownData('city', stateId);
        return response.rc || [];
    } catch (error) {
        console.error(`Failed to fetch cities for state ${stateId}:`, error.message);
        return [];
    }
};

// Generic dropdown fetcher
export const getDropdownItems = async (type, parentId = null) => {
    try {
        const response = await fetchDropdownData(type, parentId);
        return response.rc || [];
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error.message);
        return [];
    }
};

// Search items by text
export const searchItems = (items, searchText) => {
    if (!searchText || !Array.isArray(items)) return items || [];

    return items.filter(item =>
        item.Text?.toLowerCase().includes(searchText.toLowerCase())
    );
};

// Find item by value
export const findByValue = (items, value) => {
    if (!Array.isArray(items) || !value) return null;
    return items.find(item => item.Value === value) || null;
};

// Format for select components
export const formatForSelect = (items) => {
    if (!Array.isArray(items)) return [];

    return items.map(item => ({
        value: item.Value,
        label: item.Text
    }));
};

// Get complete country-state mapping
export const getCountryStateMapping = async () => {
    try {
        const countries = await getCountries();
        const mapping = {};

        await Promise.all(
            countries.map(async (country) => {
                const states = await getStates(country.Value);
                mapping[country.Value] = {
                    name: country.Text,
                    states
                };
            })
        );

        return mapping;
    } catch (error) {
        console.error('Failed to create country-state mapping:', error.message);
        return {};
    }
};

// Default export object for backward compatibility
const dropdownService = {
    getCountries,
    getStates,
    getCities,
    getDropdownItems,
    searchItems,
    findByValue,
    formatForSelect,
    getCountryStateMapping
};

export default dropdownService;
