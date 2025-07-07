import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { showErrorMessage } from '@/lib/utils/messageUtils';

let hasShownNetworkError = false;

// Reset the flag on route change
window.addEventListener('popstate', () => {
  hasShownNetworkError = false;
});
// For pushState (programmatic navigation)
(function(history){
  const pushState = history.pushState;
  history.pushState = function(data: any, unused: string, url?: string | URL | null) {
    hasShownNetworkError = false;
    return pushState.call(history, data, unused, url);
  };
})(window.history);

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.designers-collection.co.uk",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Request interceptor
authApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.set("ngrok-skip-browser-warning", true);
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
    const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
    const isNetworkError = error.message === 'Network Error' || error.message?.includes('net::ERR');
    
    if (isUnAuthorized) {
      // Clear auth state on unauthorized access
      useAuthStore.getState().logout();
      // Optionally redirect to login page
      window.location.href = '/auth/login';
    } else if ((isTimeout || isNetworkError) && !hasShownNetworkError) {
      hasShownNetworkError = true;
      showErrorMessage(isTimeout ? 'Network timeout. Please try again.' : 'Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default authApi;
