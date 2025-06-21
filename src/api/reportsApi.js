import {
  createReportUrl,
  deleteReportUrl,
  getReportUrl,
  reportsBaseUrl,
  updateReportUrl,
} from '@/constants/apiConstants';
import axios from 'axios';

export const createReport = async reportData => {
  try {
    const response = await axios.post(createReportUrl, reportData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw new Error(error.response?.data?.message || 'Failed to create report');
  }
};

export const getAllReports = async () => {
  try {
    const response = await axios.get(reportsBaseUrl, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch report');
  }
};

export const getReport = async id => {
  try {
    const response = await axios.get(getReportUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch report');
  }
};

export const updateReport = async (id, updateData) => {
  try {
    const response = await axios.put(updateReportUrl(id), updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating report:', error);
    throw new Error(error.response?.data?.message || 'Failed to update report');
  }
};

export const deleteReport = async id => {
  try {
    const response = await axios.delete(deleteReportUrl(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting report:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete report');
  }
};
