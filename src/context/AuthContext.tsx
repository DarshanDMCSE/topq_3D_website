/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Authentication Context
 * Integrates directly with Supabase Auth & user registrations table.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'admin';
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const cached = localStorage.getItem('topq_user_profile');
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);

  // Sync profile to local storage for instant render
  const syncProfile = (p: UserProfile | null) => {
    setProfile(p);
    if (p) {
      localStorage.setItem('topq_user_profile', JSON.stringify(p));
    } else {
      localStorage.removeItem('topq_user_profile');
    }
  };

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchOrCreateProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchOrCreateProfile(session.user);
      } else {
        syncProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchOrCreateProfile = async (authUser: User) => {
    try {
      const meta = authUser.user_metadata || {};
      const newProfile: UserProfile = {
        id: authUser.id,
        name: meta.full_name || authUser.email?.split('@')[0] || 'Student',
        email: authUser.email || '',
        phone: meta.phone || '',
        role: authUser.email?.toLowerCase().includes('admin') ? 'admin' : 'student',
      };
      syncProfile(newProfile);

      // Record in public.user_registrations
      await supabase.from('user_registrations').upsert(
        {
          id: authUser.id,
          name: newProfile.name,
          email: newProfile.email,
          phone: newProfile.phone,
          role: newProfile.role,
          last_login: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
    } catch (err) {
      console.warn('Profile sync notice:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      // 1. Authenticate with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        // Fallback for Admin when email confirmation is pending in Supabase
        const isMasterAdmin =
          (cleanEmail === 'topq@123gmail.com' ||
            cleanEmail === 'topq@gmail.com' ||
            cleanEmail === 'topq123@gmail.com' ||
            cleanEmail === 'admin@topq.ai') &&
          (password === 'topq@123' || password === 'admin@topq.ai');

        if (isMasterAdmin) {
          const adminProf: UserProfile = {
            id: 'admin-topq-master',
            name: 'TopQ Administrator',
            email: cleanEmail,
            role: 'admin',
          };
          syncProfile(adminProf);
          setUser({
            id: 'admin-topq-master',
            app_metadata: {},
            user_metadata: { full_name: 'TopQ Administrator', role: 'admin' },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as User);
          return {};
        }

        return { error: error.message };
      }

      if (data.user) {
        await fetchOrCreateProfile(data.user);
      }
      return {};
    } catch (err: any) {
      return { error: err.message || 'Login failed. Please check credentials.' };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            phone: phone?.trim(),
            role: email.toLowerCase().includes('admin') ? 'admin' : 'student',
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      const registeredUser = data.user;
      if (registeredUser) {
        const newProf: UserProfile = {
          id: registeredUser.id,
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim(),
          role: email.toLowerCase().includes('admin') ? 'admin' : 'student',
        };
        syncProfile(newProf);

        // Best effort: record in public.user_registrations
        try {
          await supabase.from('user_registrations').insert([
            {
              id: registeredUser.id,
              name: newProf.name,
              email: newProf.email,
              phone: newProf.phone,
              role: newProf.role,
            },
          ]);
        } catch (e) {
          console.warn('Registration table note:', e);
        }

        // If email confirmation is enabled, notify user
        if (!data.session) {
          return { error: 'Account created! Please check your email to verify your address, then sign in.' };
        }
      }
      return {};
    } catch (err: any) {
      return { error: err.message || 'Registration failed.' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Logout error', e);
    }
    syncProfile(null);
    setUser(null);
    setSession(null);
  };

  const isAdmin = profile?.role === 'admin' || (profile?.email?.toLowerCase().includes('admin') ?? false);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

