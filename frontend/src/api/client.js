import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do dodawania tokena
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (email, password, firstName, lastName) =>
    apiClient.post('/auth/register', { email, password, firstName, lastName }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

// Picks endpoints
export const picksAPI = {
  create: (data) => apiClient.post('/picks', data),
  getAll: () => apiClient.get('/picks'),
  getById: (id) => apiClient.get(`/picks/${id}`),
  update: (id, data) => apiClient.put(`/picks/${id}`, data),
  delete: (id) => apiClient.delete(`/picks/${id}`),
};

// Users endpoints
export const usersAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  getNotifications: () => apiClient.get('/users/notifications'),
};

// Subscriptions endpoints
export const subscriptionsAPI = {
  getActive: () => apiClient.get('/subscriptions/active'),
  getHistory: () => apiClient.get('/subscriptions/history'),
};

// Payments endpoints
export const paymentsAPI = {
  testPayment: (planType, amount) =>
    apiClient.post('/payments/test-payment', { planType, amount }),
  getHistory: () => apiClient.get('/payments/history'),
};

export default apiClient;
