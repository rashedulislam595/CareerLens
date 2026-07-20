import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper to get cookie value by name on the client side
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
// This acts as a fallback for cross-domain cookie restrictions on Vercel
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Better Auth stores session token in localStorage/cookies.
      // We look for both cookie and localStorage fallback
      const token = getCookie('better-auth.session_token') || localStorage.getItem('better-auth.session_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── 401 Handler ─────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';

      if (!isAuthPage) {
        const token = getCookie('better-auth.session_token') || localStorage.getItem('better-auth.session_token');
        if (!token) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;
