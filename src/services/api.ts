import axios from 'axios';
import * as authHelper from '../pages/auth/core/auth-helpers';
// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor if you need to attach token dynamically
api.interceptors.request.use(
  (config) => {

    const token = authHelper.getAuth(); //localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
