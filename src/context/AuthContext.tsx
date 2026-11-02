import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: () => void;
  logout: () => Promise<void>;
}

const AUTH_STORAGE_KEY = 'autoluma_auth_user_v1';

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr-admin-01',
  email: 'admin@autoluma.com',
  full_name: 'Lead Lighting Engineer & System Admin',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage session first
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    // If Supabase is configured, check auth state
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const authUser: AdminUser = {
            id: session.user.id,
            email: session.user.email || 'admin@autoluma.com',
            full_name: session.user.user_metadata?.full_name || 'System Admin',
            role: 'admin',
          };
          setUser(authUser);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // If Supabase is connected, authenticate via Supabase Auth
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const authUser: AdminUser = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: data.user.user_metadata?.full_name || 'System Admin',
          role: 'admin',
        };
        setUser(authUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        setIsLoading(false);
        return { success: true };
      }
    }

    // Standalone / Local Auth validation
    // Standard Demo Credentials: admin@autoluma.com / autoluma2026! or any demo admin entry
    if (
      (email.toLowerCase() === 'admin@autoluma.com' && password === 'autoluma2026!') ||
      (email.toLowerCase().includes('admin') && password.length >= 6)
    ) {
      const authUser: AdminUser = {
        id: 'usr-admin-01',
        email,
        full_name: 'Lead Lighting Engineer & System Admin',
        role: 'admin',
      };
      setUser(authUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid credentials. Use admin@autoluma.com and password: autoluma2026! or click Quick Demo Access.',
    };
  };

  const quickDemoLogin = () => {
    setUser(DEFAULT_ADMIN);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN));
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        quickDemoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
