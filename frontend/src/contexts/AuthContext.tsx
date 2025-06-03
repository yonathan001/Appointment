import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import AuthService from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    const loadUser = async () => {
      if (authState.token) {
        try {
          const user = await AuthService.getCurrentUser();
          setAuthState(prev => ({
            ...prev,
            user,
            loading: false
          }));
        } catch (error) {
          console.error('Failed to load user:', error);
          AuthService.logout();
          setAuthState({
            token: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            loading: false,
            error: 'Session expired. Please login again.'
          });
        }
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false
        }));
      }
    };

    loadUser();
  }, [authState.token]);

  const login = async (username: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const data = await AuthService.login({ username, password });
      
      // Get user data after successful login
      const user = await AuthService.getCurrentUser();
      
      setAuthState({
        token: data.access,
        refreshToken: data.refresh,
        user,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Invalid credentials. Please try again.'
      }));
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string, role = 'client') => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await AuthService.register({ username, email, password, role: role as any });
      
      // Login after successful registration
      await login(username, password);
    } catch (error) {
      console.error('Registration error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Registration failed. Please try again.'
      }));
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setAuthState({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  };

  const value = {
    ...authState,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
