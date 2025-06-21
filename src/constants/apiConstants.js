const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

export const profileUrl = `${BASE_BACKEND_URL}/users/profile`;
export const loginUrl = `${BASE_BACKEND_URL}/users/login`;
export const signupUrl = `${BASE_BACKEND_URL}/users/register`;
export const logoutUrl = `${BASE_BACKEND_URL}/users/logout`;

// Disaster related endpoints
export const disastersBaseUrl = `${BASE_BACKEND_URL}/disasters`;
export const createDisasterUrl = `${disastersBaseUrl}/create`;
export const getDisasterUrl = id => `${disastersBaseUrl}/${id}`;
export const updateDisasterUrl = id => `${disastersBaseUrl}/${id}`;
export const deleteDisasterUrl = id => `${disastersBaseUrl}/${id}`;
export const getOfficialUpdatesUrl = id => `${disastersBaseUrl}/${id}/official-updates`;

// Report related endpoints
export const reportsBaseUrl = `${BASE_BACKEND_URL}/reports`;
export const createReportUrl = `${reportsBaseUrl}/create`;
export const getReportUrl = id => `${reportsBaseUrl}/${id}`;
export const updateReportUrl = id => `${reportsBaseUrl}/${id}`;
export const deleteReportUrl = id => `${reportsBaseUrl}/${id}`;

// Resource related endpoints
export const resourcesBaseUrl = `${BASE_BACKEND_URL}/resources`;
export const createResourceUrl = `${resourcesBaseUrl}/create`;
export const updateResourceUrl = `${resourcesBaseUrl}/update`;
export const deleteResourceUrl = id => `${resourcesBaseUrl}/delete/${id}`;
export const getResourceUrl = id => `${resourcesBaseUrl}/${id}`;
export const getAllResourcesUrl = `${resourcesBaseUrl}`;
export const getDisasterResourcesUrl = disasterId => `${resourcesBaseUrl}/disaster/${disasterId}`;
export const getNearbyResourcesUrl = `${resourcesBaseUrl}/nearby`;

// AI/Verification related endpoints
export const aiBaseUrl = `${BASE_BACKEND_URL}/ai`;
export const verifyImageUrl = id => `${aiBaseUrl}/verify-image/${id}`;
export const getGeolocationUrl = `${aiBaseUrl}/geolocation`;

// Cache related endpoints
export const cacheBaseUrl = `${BASE_BACKEND_URL}/cache`;
export const getCacheUrl = key => `${cacheBaseUrl}/${key}`;
export const setCacheUrl = `${cacheBaseUrl}`;
export const deleteCacheUrl = key => `${cacheBaseUrl}/${key}`;
