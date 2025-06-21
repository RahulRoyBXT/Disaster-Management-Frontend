import {
  createResourceUrl,
  deleteResourceUrl,
  getAllResourcesUrl,
  getDisasterResourcesUrl,
  getNearbyResourcesUrl,
  getResourceUrl,
  updateResourceUrl,
} from '@/constants/apiConstants';
import axios from 'axios';

/**
 * Create a new resource
 * @param {Object} resourceData - The resource data to create
 * @returns {Promise<Object>} The created resource
 */
export const createResource = async resourceData => {
  try {
    const response = await axios.post(createResourceUrl, resourceData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw new Error(error.response?.data?.message || 'Failed to create resource');
  }
};

/**
 * Update a resource
 * @param {string} resourceId - The resource ID to update
 * @param {Object} resourceData - The resource data to update
 * @returns {Promise<Object>} The updated resource
 */
export const updateResource = async (resourceId, resourceData) => {
  try {
    const response = await axios.put(updateResourceUrl(resourceId), resourceData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw new Error(error.response?.data?.message || 'Failed to update resource');
  }
};

/**
 * Delete a resource by ID
 * @param {string} id - The resource ID
 * @returns {Promise<Object>} Success message
 */
export const deleteResource = async id => {
  try {
    const response = await axios.delete(deleteResourceUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete resource');
  }
};

/**
 * Get a specific resource by ID
 * @param {string} id - The resource ID
 * @returns {Promise<Object>} The resource data
 */
export const getResource = async id => {
  try {
    const response = await axios.get(getResourceUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch resource');
  }
};

/**
 * Get all resources
 * @returns {Promise<Array>} List of resources
 */
export const getAllResources = async () => {
  try {
    const response = await axios.get(getAllResourcesUrl, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch resources');
  }
};

/**
 * Get resources for a specific disaster
 * @param {string} disasterId - The disaster ID
 * @returns {Promise<Array>} List of resources for the disaster
 */
export const getDisasterResources = async disasterId => {
  try {
    const response = await axios.get(getDisasterResourcesUrl(disasterId), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching disaster resources:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch disaster resources');
  }
};

/**
 * Get nearby resources
 * @param {Object} params - Parameters for nearby query (e.g., latitude, longitude, radius)
 * @returns {Promise<Array>} List of nearby resources
 */
export const getNearbyResources = async params => {
  try {
    const response = await axios.get(getNearbyResourcesUrl, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby resources:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch nearby resources');
  }
};
