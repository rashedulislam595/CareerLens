import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor to attach Better Auth Token to Authorization Header
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getCookie('better-auth.session_token') || localStorage.getItem('better-auth.session_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// We remove the hard redirect to /login from the API interceptor.
// Redirection logic is cleanly managed by our useRequireAuth hook inside pages.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Just pass the error along — let the hooks or UI handle 401 statuses gracefully
    return Promise.reject(error);
  }
);

export { api };
export default api;
