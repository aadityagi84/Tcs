// src\Services\services.js
import axios from "axios";
import { API_ENDPOINTS } from "../Constant/ApiUrl";

const DEFAULT_HEADERS = {
    accept: "*/*"
};

export const getMembershipPageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.MEMBERSHIP_PAGE_LIST,
        headers: DEFAULT_HEADERS,
        extractFields: ['Id', 'Name', 'Title', 'Description', 'BannerImage']
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        const extractedData = {};
        serviceParams.extractFields.forEach(field => {
            extractedData[field] = response.data.res[field];
        });

        return extractedData;
    } catch (error) {
        console.log('Error in getMembershipPageList:', error);
        throw error;
    }
};

export const getCommitteePageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.COMMITTEE_PAGE_LIST,
        headers: DEFAULT_HEADERS,
        extractFields: ['Id', 'Name', 'Title', 'BannerImage', 'IsActive', 'CommunityDetailList'],
        dataTransformers: {
            transformCommitteeMembers: (data) => data.CommunityDetailList?.map((member) => ({
                name: member.Name,
                role: member.CategoryName,
                title: member.Designation,
                education: member.Education,
                image: member.Image,
                id: member.Id,
            })) || []
        }
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        const extractedData = {};
        serviceParams.extractFields.forEach(field => {
            extractedData[field] = response.data.res[field];
        });

        if (serviceParams.dataTransformers) {
            extractedData.transformedCommitteeMembers = serviceParams.dataTransformers.transformCommitteeMembers(response.data.res);
        }

        return extractedData;
    } catch (error) {
        console.log('Error in getCommitteePageList:', error);
        throw error;
    }
};

export const getFacultyPageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.FACULTY_PAGE_LIST,
        headers: DEFAULT_HEADERS,
        extractFields: ['Id', 'Name', 'Title', 'BannerImage', 'IsActive', 'FacultyDetailsList'],
        defaultValues: {
            title: "Faculty",
            description: "The Cytometry Society (TCS)-India and the Organizing Committee of the 16th Annual TCS and workshops cordially invite you to join the...",
            bannerImage: null
        },
        dataTransformers: {
            transformFacultyMembers: (data) => data.FacultyDetailsList?.map((member) => ({
                name: member.Name,
                role: member.CategoryName,
                title: member.Designation,
                education: member.Education,
                image: member.Image,
                id: member.Id,
            })) || []
        }
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        const extractedData = {};
        serviceParams.extractFields.forEach(field => {
            extractedData[field] = response.data.res[field];
        });

        if (serviceParams.dataTransformers) {
            extractedData.transformedFacultyMembers = serviceParams.dataTransformers.transformFacultyMembers(response.data.res);
        }

        return extractedData;
    } catch (error) {
        console.log('Error in getFacultyPageList:', error);
        throw error;
    }
};

export const getAwardsPageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.AWARDS_PAGE_LIST,
        headers: DEFAULT_HEADERS,
        extractFields: ['Id', 'Title', 'Description', 'DocumentUrl', 'DocumentUrl2'],
        dataTransformers: {
            transformDescriptionToHtml: (data) => {
                if (!data.Description) return '';

                // Split the description into sections
                const sections = data.Description.split(/\n\n(?=[A-Za-z])/g);

                let htmlContent = '';

                sections.forEach(section => {
                    if (section.trim().startsWith('Eligibility Criteria:') ||
                        section.trim().startsWith('Selection Procedure') ||
                        section.trim().startsWith('Terms and Conditions')) {

                        // Create section header
                        const headerMatch = section.match(/^([^:]+)(?::|$)/);
                        const headerText = headerMatch ? headerMatch[1].trim() : '';

                        htmlContent += `<h3 class="text-xl font-semibold text-blue-600 mb-3">${headerText}</h3>`;

                        // Create bulleted list for the content
                        const listItems = section.replace(/^[^:]+:?/, '')
                            .split(/\n+/)
                            .filter(item => item.trim().length > 0 && !item.trim().startsWith('Click Here'))
                            .map(item => {
                                // Handle links (if they exist)
                                if (item.includes('Click Here')) {
                                    return item.replace('Click Here', '<a href="#" class="text-blue-600 hover:underline ml-1">Click Here</a>');
                                }
                                return item;
                            });

                        htmlContent += '<ul class="list-disc pl-6 space-y-2">';
                        listItems.forEach(item => {
                            htmlContent += `<li>${item}</li>`;
                        });
                        htmlContent += '</ul>';
                    } else {
                        // Regular paragraph
                        htmlContent += `<p class="mb-4">${section}</p>`;
                    }
                });

                return htmlContent;
            }
        }
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        const extractedData = {
            ...response.data.res
        };

        if (serviceParams.dataTransformers) {
            extractedData.htmlDescription = serviceParams.dataTransformers.transformDescriptionToHtml(response.data.res);
        }

        return extractedData;
    } catch (error) {
        console.log('Error in getAwardsPageList:', error);
        throw error;
    }
};

export const getAbstractPageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.ABSTRACT_PAGE_LIST,
        headers: DEFAULT_HEADERS,
        extractFields: ['Id', 'AbstractName', 'DocumentUrl', 'DisplayDate', 'IsOpen']
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        return {
            res: response.data,
            status: response.status
        };
    } catch (error) {
        console.log('Error in getAbstractPageList:', error);
        throw error;
    }
};

export const getConferencePageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.CONFERENCE_PAGE_LIST,
        headers: DEFAULT_HEADERS,
        extractFields: ['Id', 'Name', 'DocumentUrl']
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        return response.data.res;
    } catch (error) {
        console.log('Error in getConferencePageList:', error);
        throw error;
    }
};

export const getExhibitionPageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.EXHIBITION_PAGE_LIST,
        headers: DEFAULT_HEADERS,
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        return {
            categories: response.data.rc || [],
            status: response.status
        };
    } catch (error) {
        console.log('Error in getExhibitionPageList:', error);
        throw error;
    }
};

export const getWorkshopPageList = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.WORKSHOP_PAGE_LIST,
        headers: DEFAULT_HEADERS
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });
        return response.data;
    } catch (error) {
        console.log('Error in getWorkshopPageList:', error);
        throw error;
    }
};

export const getDynamicRegistrationPricing = async () => {
    const serviceParams = {
        endpoint: API_ENDPOINTS.REGISTRATION_PRICING,
        headers: DEFAULT_HEADERS,
    };

    try {
        const response = await axios.get(serviceParams.endpoint, {
            headers: serviceParams.headers,
        });

        return response.data.res;
    } catch (error) {
        console.log('Error in getDynamicRegistrationPricing:', error);
        throw error;
    }
};

// Generic service creator
export const createPageService = (config) => {
    return async (customParams = {}) => {
        const serviceParams = {
            ...config,
            ...customParams
        };

        try {
            const response = await axios.get(serviceParams.endpoint, {
                headers: serviceParams.headers || DEFAULT_HEADERS,
            });

            const extractedData = {};
            if (serviceParams.extractFields) {
                serviceParams.extractFields.forEach(field => {
                    extractedData[field] = response.data.res[field];
                });
            }

            if (serviceParams.dataTransformers) {
                Object.entries(serviceParams.dataTransformers).forEach(([key, transformer]) => {
                    extractedData[key] = transformer(response.data.res);
                });
            }

            return extractedData;
        } catch (error) {
            console.log(`Error in ${serviceParams.name || 'service'}:`, error);
            throw error;
        }
    };
};

// Export a collection of services
const ApiService = {
    getMembershipPageList,
    getCommitteePageList,
    getFacultyPageList,
    getAwardsPageList,
    getDynamicRegistrationPricing,
    getAbstractPageList,
    getConferencePageList,
    getWorkshopPageList,
    getExhibitionPageList,

};

export default ApiService;
