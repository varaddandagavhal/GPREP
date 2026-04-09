import api from './axiosInstance';

export const submitAttempt = (data) => api.post('/attempts', data);
export const getUserAttempts = (params = {}) => api.get('/attempts', { params });
export const getAttemptById = (id) => api.get(`/attempts/${id}`);
