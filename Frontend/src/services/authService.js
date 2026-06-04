import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials).then((res) => res.data),
  register: (credentials) => api.post('/auth/register', credentials).then((res) => res.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
};
