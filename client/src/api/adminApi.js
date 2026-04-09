import api from './axiosInstance';

export const getPlatformStats = () => api.get('/admin/stats');
export const getAllUsers = () => api.get('/admin/users');
export const addQuestion = (data) => api.post('/admin/questions', data);
export const updateQuestion = (id, data) => api.put(`/admin/questions/${id}`, data);
export const deleteQuestion = (id) => api.delete(`/admin/questions/${id}`);
export const getAdminQuestions = (params = {}) => api.get('/questions', { params });
