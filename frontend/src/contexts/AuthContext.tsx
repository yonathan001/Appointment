import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // type-only import
import apiClient, { loginUser as apiLoginUser, registerUser as apiRegisterUser, fetchUserProfile as apiFetchUserProfile } from '../services/api';
import type { UserData } from '../services/api'; // type-only import for UserData

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Pick<UserData, 'username' | 'password'>) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: UserData) => Promise<void>;
  fetchUser: () => Promise<UserData | null>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true to fetch user

  const fetchUser = async (): Promise<UserData | null> => {
    setIsLoading(true);
    try {
      // This request will succeed if HTTP-only cookies are present and valid
      const response = await apiFetchUserProfile();
      setUser(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.warn('No authenticated user found or failed to fetch user.');
      setUser(null);
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials: Pick<UserData, 'username' | 'password'>) => {
    setIsLoading(true);
    try {
      await apiLoginUser(credentials);
      // After successful login, backend sets cookies. Now fetch user details.
      await fetchUser(); 
    } catch (error) {
      setIsLoading(false);
      throw error; // Re-throw to be caught by the calling component (e.g., LoginPage)
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Backend should clear HTTP-only cookies on this request.
      // The endpoint '/users/logout/' is an example; adjust if your backend uses a different one.
      // We'll need to ensure this endpoint exists and works as expected on the backend.
      await apiClient.post('/auth/logout/'); // Updated endpoint 
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear user state on frontend as a fallback
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: UserData) => {
    setIsLoading(true);
    try {
      await apiRegisterUser(userData);
      // Decide if registration should auto-login. If so, call login() here.
      // For now, registration completes, and user can then login separately.
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error; // Re-throw to be caught by the calling component
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register, fetchUser }}>
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
