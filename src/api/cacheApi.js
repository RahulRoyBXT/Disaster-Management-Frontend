import { deleteCacheUrl, getCacheUrl, setCacheUrl } from '@/constants/apiConstants';
import axios from 'axios';

/**
 * Get a specific cache entry
 * @param {string} key - The cache key
 * @returns {Promise<Object>} The cache data
 */
export const getCache = async key => {
  try {
    const response = await axios.get(getCacheUrl(key), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cache:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cache');
  }
};

/**
 * Set cache entries
 * @param {Object} cacheData - The cache data to set
 * @returns {Promise<Object>} Success message
 */
export const setCache = async cacheData => {
  try {
    const response = await axios.post(setCacheUrl, cacheData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error setting cache:', error);
    throw new Error(error.response?.data?.message || 'Failed to set cache');
  }
};

/**
 * Delete a specific cache entry
 * @param {string} key - The cache key
 * @returns {Promise<Object>} Success message
 */
export const deleteCache = async key => {
  try {
    const response = await axios.delete(deleteCacheUrl(key), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cache:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete cache');
  }
};
