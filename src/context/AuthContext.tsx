'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';
import api from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  /** Refetch profile from /users/profile and update context */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [profile, setProfile] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Track whether we've completed the very first session check.
  // This prevents useRequireAuth from redirecting during the initial load
  // when isPending briefly returns false before the session resolves.
  const hasInitialized = useRef(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isPending && !hasInitialized.current) {
      hasInitialized.current = true;
      setInitialized(true);
    }
  }, [isPending]);

  // When session changes, fetch extended profile from our API
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) return;
      setProfileLoading(true);
      try {
        const { data } = await api.get('/users/profile');
        setProfile(data.data.user);
      } catch {
        // Fallback: build minimal user from Better Auth session data
        setProfile({
          _id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          avatar: session.user.image || '',
          role: 'user',
          savedJobs: [],
          isVerified: session.user.emailVerified,
          profile: {
            skills: [],
            experience: '',
            location: '',
            bio: '',
            title: '',
            linkedIn: '',
            github: '',
            portfolio: '',
          },
        } as unknown as User);
      } finally {
        setProfileLoading(false);
      }
    };

    if (session?.user) {
      fetchProfile();
    } else if (!session?.user && !isPending) {
      setProfile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id, isPending]);

  const logout = async () => {
    await authClient.signOut();
    setProfile(null);
  };

  const refreshUser = async () => {
    if (!session?.user) return;
    try {
      const { data } = await api.get('/users/profile');
      setProfile(data.data.user);
    } catch {
      // ignore
    }
  };

  // isLoading is true until:
  // 1. We've completed the initial session check (initialized)
  // 2. Better Auth is done fetching the session (isPending)
  // 3. Profile is being fetched after session is confirmed (profileLoading)
  const isLoading = !initialized || isPending || (!!session?.user && profileLoading);

  return (
    <AuthContext.Provider
      value={{
        user: profile,
        isLoading,
        isAuthenticated: !!session?.user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
