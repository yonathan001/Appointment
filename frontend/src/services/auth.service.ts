import api from './api';
import { LoginCredentials, RegisterData, User } from '../types';

const AuthService = {
  // Login user and get tokens
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/token/', credentials);
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    return response.data;
  },

  // Register a new user
  register: async (data: RegisterData) => {
    return api.post('/auth/users/', data);
  },

  // Get current user information
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me/');
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};

export default AuthService;
