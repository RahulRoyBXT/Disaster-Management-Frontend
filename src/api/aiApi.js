import { getGeolocationUrl, verifyImageUrl } from '@/constants/apiConstants';
import axios from 'axios';

/**
 * Verify an image for a disaster report
 * @param {string} id - The report ID
 * @param {Object} imageData - The image data to verify
 * @returns {Promise<Object>} Verification result
 */
export const verifyImage = async (id, imageData) => {
  try {
    const response = await axios.post(verifyImageUrl(id), imageData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying image:', error);
    throw new Error(error.response?.data?.message || 'Failed to verify image');
  }
};

/**
 * Get geolocation from description
 * @param {Object} descriptionData - The description data to process
 * @returns {Promise<Object>} Geolocation data
 */
export const getGeolocation = async descriptionData => {
  try {
    const response = await axios.post(getGeolocationUrl, descriptionData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting geolocation:', error);
    throw new Error(error.response?.data?.message || 'Failed to get geolocation');
  }
};
