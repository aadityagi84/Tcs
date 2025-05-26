import { API_ENDPOINTS } from '../Constant/ApiUrl';
import axios from 'axios';

const cache = {
    societyPage: null,
    cacheTime: null
};

const CACHE_DURATION = 5 * 60 * 1000;
let isLoading = false;
let pendingPromise = null;

const isCacheValid = () => {
    return cache.societyPage &&
        cache.cacheTime &&
        (Date.now() - cache.cacheTime) < CACHE_DURATION;
};

const fetchFromAPI = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.SOCIETY_PAGE_LIST, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;

        cache.societyPage = data;
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

const getSocietyPageList = async () => {
    try {
        if (isCacheValid()) {
            return cache.societyPage;
        }

        if (isLoading && pendingPromise) {
            return pendingPromise;
        }

        isLoading = true;
        pendingPromise = fetchFromAPI();

        const data = await pendingPromise;
        return data;
    } catch (error) {
        console.error('Error fetching society data:', error);

        if (cache.societyPage) {
            console.warn('Returning cached data due to API error');
            return cache.societyPage;
        }

        throw error;
    } finally {
        isLoading = false;
        pendingPromise = null;
    }
};

const clearCache = () => {
    cache.societyPage = null;
    cache.cacheTime = null;
    isLoading = false;
    pendingPromise = null;
};

const getCurrentData = () => {
    return cache.societyPage;
};

const hasData = () => {
    return cache.societyPage !== null;
};

const forceRefresh = async () => {
    clearCache();
    return getSocietyPageList();
};

export const societyApiService = {
    getSocietyPageList,
    clearCache,
    getCurrentData,
    hasData,
    forceRefresh
};

export default societyApiService;
