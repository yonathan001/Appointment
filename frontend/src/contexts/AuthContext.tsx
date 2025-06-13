import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { loginUser as apiLoginUser, registerUser as apiRegisterUser, fetchUserProfile as apiFetchUserProfile } from '../services/api';
import type { UserData } from '../services/api';

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Pick<UserData, 'username' | 'password'>) => Promise<void>;
  logout: () => void;
  register: (userData: UserData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiFetchUserProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile, token might be invalid.', error);
      // Clear tokens if fetch fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials: Pick<UserData, 'username' | 'password'>) => {
    try {
      const response = await apiLoginUser(credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // After setting token, fetch user data
      await fetchUser();
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to be caught by the calling component
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    // Optional: notify backend of logout. Not strictly necessary for token auth.
  };

  const register = async (userData: UserData) => {
    try {
      await apiRegisterUser(userData);
      // Registration is successful, user can now log in.
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw to be caught by the calling component
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
