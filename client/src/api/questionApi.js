import api from './axiosInstance';

export const getSubjects = () => api.get('/questions/subjects');
export const getQuizQuestions = (subject, count = 10, difficulty = '') =>
    api.get(`/questions/quiz?subject=${encodeURIComponent(subject)}&count=${count}${difficulty ? `&difficulty=${difficulty}` : ''}`);
export const getQuestions = (params = {}) => api.get('/questions', { params });
export const getQuestionById = (id) => api.get(`/questions/${id}`);
