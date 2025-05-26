import { API_ENDPOINTS } from '../Constant/ApiUrl';
import axios from 'axios';

const cache = {
    homePage: null,
    cacheTime: null
};

const CACHE_DURATION = 5 * 60 * 1000;
let isLoading = false;
let pendingPromise = null;

const isCacheValid = () => {
    return cache.homePage &&
        cache.cacheTime &&
        (Date.now() - cache.cacheTime) < CACHE_DURATION;
};


const fetchFromAPI = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.HOME_PAGE_LIST, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;
        cache.homePage = data;
        cache.cacheTime = Date.now();

        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(`API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        } else if (error.request) {
            throw new Error('Network error: No response received from server');
        } else {
            throw new Error(`Request error: ${error.message}`);
        }
    }
};

const getHomePageList = async () => {
    try {
        if (isCacheValid()) {
            return cache.homePage;
        }

        if (isLoading && pendingPromise) {
            return pendingPromise;
        }

        isLoading = true;
        pendingPromise = fetchFromAPI();

        const data = await pendingPromise;
        return data;
    } catch (error) {
        console.error('Error fetching homepage data:', error);

        if (cache.homePage) {
            console.warn('Returning cached data due to API error');
            return cache.homePage;
        }

        throw error;
    } finally {
        isLoading = false;
        pendingPromise = null;
    }
};

const clearCache = () => {
    cache.homePage = null;
    cache.cacheTime = null;
    isLoading = false;
    pendingPromise = null;
};

const getCurrentData = () => {
    return cache.homePage;
};

const hasData = () => {
    return cache.homePage !== null;
};

const forceRefresh = async () => {
    clearCache();
    return getHomePageList();
};

export const homeApiService = {
    getHomePageList,
    clearCache,
    getCurrentData,
    hasData,
    forceRefresh
};

export default homeApiService;
