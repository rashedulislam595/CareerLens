import { createAuthClient } from 'better-auth/react';

// Points to our Next.js API routes handler
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});

// Named exports for convenient usage
export const { useSession, signIn, signUp, signOut } = authClient;
