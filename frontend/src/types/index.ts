export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'client';
  created_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
}

export interface Appointment {
  id: number;
  client: number;
  staff: number;
  service: number | null;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
  client_details?: User;
  staff_details?: User;
  service_details?: Service;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: 'client' | 'staff' | 'admin';
}
