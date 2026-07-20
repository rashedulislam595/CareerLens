import axios from 'axios';

// ─── API Client ───────────────────────────────────────────────────────────────
// All requests go through /api/proxy (our Next.js server-side proxy route).
// The proxy reads the HttpOnly session cookie, gets the Bearer token, and
// forwards the request to the Express backend with proper Authorization header.
// This eliminates all cross-origin cookie issues in production.
const api = axios.create({
  baseURL: '/api/proxy',
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — just pass errors along for the UI to handle
api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export { api };
export default api;
