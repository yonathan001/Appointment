import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        if (!refreshTokenValue) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userRole');
          window.dispatchEvent(new Event('authChange'));
          // Consider redirecting to login, e.g., window.location.href = '/login';
          return Promise.reject(new Error('No refresh token available. User logged out.'));
        }
        const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/token/refresh/`, { refresh: refreshTokenValue });
        localStorage.setItem('accessToken', data.access);
        if (data.refresh) localStorage.setItem('refreshToken', data.refresh);
        
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.access;
        originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
        window.dispatchEvent(new Event('authChange')); // Notify UI of new token
        
        return apiClient(originalRequest);
      } catch (refreshError: any) {
        console.error('Token refresh failed:', refreshError.message);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        window.dispatchEvent(new Event('authChange'));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'client' | 'staff';
    first_name?: string;
    last_name?: string;
  };
}

export interface UserData {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: 'admin' | 'client' | 'staff';
  first_name?: string;
  last_name?: string;
}

export const loginUser = (data: Pick<UserData, 'username' | 'password'>) => {
  return apiClient.post<AuthResponse>('/token/', data);
};

export const registerUser = (data: UserData) => {
  return apiClient.post<UserData>('/users/', data);
};

export const fetchUserProfile = () => {
  // Ensure this endpoint exists on your backend (e.g., /api/users/me/)
  // It should return details of the authenticated user based on the token.
  return apiClient.get<UserData>('/users/me/'); 
};
