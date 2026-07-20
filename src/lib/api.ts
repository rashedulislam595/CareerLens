import axios from 'axios';
import { authClient } from './auth-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Cache the token in memory so we don't call getSession() on every request
let cachedToken: string | null = null;
let tokenFetchedAt = 0;
const TOKEN_TTL_MS = 60 * 1000; // re-fetch every 60 seconds

async function getSessionToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const now = Date.now();
  if (cachedToken && now - tokenFetchedAt < TOKEN_TTL_MS) {
    return cachedToken;
  }

  try {
    // authClient.getSession() calls /api/auth/get-session on the Next.js
    // server (same origin), which CAN read the HttpOnly session cookie.
    // It returns the session object including the raw session token.
    const result = await authClient.getSession();
    const token = (result as any)?.data?.session?.token ?? null;
    cachedToken = token;
    tokenFetchedAt = now;
    return token;
  } catch {
    return null;
  }
}

// Request Interceptor — attaches Bearer token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await getSessionToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — on 401, clear cached token and pass error along
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // Invalidate cached token so next request re-fetches a fresh one
      cachedToken = null;
      tokenFetchedAt = 0;
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;
