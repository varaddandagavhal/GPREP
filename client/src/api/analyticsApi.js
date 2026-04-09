import api from './axiosInstance';

export const getAnalyticsSummary = () => api.get('/analytics/summary');
export const getSubjectwiseAnalytics = () => api.get('/analytics/subjectwise');
