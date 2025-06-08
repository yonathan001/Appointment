import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

// Interceptors for adding Authorization header and refreshing tokens are removed.
// Cookie-based authentication relies on the browser to send cookies automatically.
// The backend will handle cookie validation and refresh if necessary.

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

// Appointment type (matches backend fields)
export interface Appointment {
  id: number;
  client: number;
  staff: number;
  service: number;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
  client_details?: UserData;
  staff_details?: UserData;
  service_details?: Service;
}


export interface CreateAppointmentPayload {
  service: number; // ID of the service
  date: string;    // YYYY-MM-DD
  time: string;    // HH:MM or HH:MM:SS
  notes?: string;
  // staff?: number; // Optional: if staff selection is implemented
}

export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}

// Fetch client appointments (for logged-in user)
export const fetchClientAppointments = () => {
  return apiClient.get<Appointment[]>('/appointments/');
};

// Cancel appointment by ID
export const cancelAppointment = (id: number) => {
  return apiClient.patch(`/appointments/${id}/`, { status: 'cancelled' });
};

export const loginUser = (data: Pick<UserData, 'username' | 'password'>) => {
  return apiClient.post<AuthResponse>('/auth/login/', data); // Updated endpoint
};

export const registerUser = (data: UserData) => {
  return apiClient.post<UserData>('/users/', data);
};

export const fetchUserProfile = () => {
  // Ensure this endpoint exists on your backend (e.g., /api/users/me/)
  // It should return details of the authenticated user based on the token.
  return apiClient.get<UserData>('/users/me/'); 
};

// Fetch all services
export const fetchServices = () => {
  return apiClient.get<Service[]>('/services/');
};

// Create a new appointment
export const createAppointment = (data: CreateAppointmentPayload) => {
  return apiClient.post<Appointment>('/appointments/', data);
};
