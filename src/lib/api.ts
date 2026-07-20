import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Axios Instance ───────────────────────────────────────────────────────────
// withCredentials: true ensures session cookies are sent on every request.
// Better Auth manages session refresh automatically — no manual token logic needed.
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ─── 401 Handler ─────────────────────────────────────────────────────────────
// Only redirect to login if the user has no active Better Auth session cookie.
// This prevents false redirects when our Express API has a transient auth issue
// while the user's session is still valid on the client side.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';

      if (!isAuthPage) {
        // Check if a Better Auth session cookie actually exists.
        // If it does, the user IS logged in — don't force-redirect;
        // let useRequireAuth handle it gracefully via React state.
        const hasSessionCookie = document.cookie
          .split(';')
          .some((c) => c.trim().startsWith('better-auth.session_token='));

        if (!hasSessionCookie) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;
