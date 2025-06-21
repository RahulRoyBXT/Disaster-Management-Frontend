import {
  createDisasterUrl,
  deleteDisasterUrl,
  disastersBaseUrl,
  getDisasterUrl,
  getOfficialUpdatesUrl,
  updateDisasterUrl,
} from '@/constants/apiConstants';
import axios from 'axios';

export const getAllDisasters = async () => {
  try {
    const response = await axios.get(disastersBaseUrl, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching disasters:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch disasters');
  }
};

export const createDisaster = async disasterData => {
  try {
    const response = await axios.post(createDisasterUrl, disasterData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating disaster:', error);
    throw new Error(error.response?.data?.message || 'Failed to create disaster');
  }
};

export const getDisaster = async id => {
  try {
    const response = await axios.get(getDisasterUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching disaster:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch disaster');
  }
};

export const updateDisaster = async (id, updateData) => {
  try {
    const response = await axios.put(updateDisasterUrl(id), updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating disaster:', error);
    throw new Error(error.response?.data?.message || 'Failed to update disaster');
  }
};

export const deleteDisaster = async id => {
  try {
    const response = await axios.delete(deleteDisasterUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting disaster:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete disaster');
  }
};

export const getOfficialUpdates = async id => {
  try {
    const response = await axios.get(getOfficialUpdatesUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching official updates:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch official updates');
  }
};
