import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
authApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnAuthorized = error?.response?.status === 401 || error?.response?.status === 403;
    
    if (isUnAuthorized) {
      // Clear auth state on unauthorized access
      useAuthStore.getState().logout();
      // Optionally redirect to login page
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default authApi;
