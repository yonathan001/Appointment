import api from './api';
import { Appointment } from '../types';

const AppointmentService = {
  // Get all appointments (filtered by user role)
  getAppointments: async () => {
    const response = await api.get('/appointments/');
    return response.data;
  },

  // Get a single appointment by ID
  getAppointment: async (id: number): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}/`);
    return response.data;
  },

  // Create a new appointment
  createAppointment: async (appointmentData: Partial<Appointment>) => {
    const response = await api.post('/appointments/', appointmentData);
    return response.data;
  },

  // Update an existing appointment
  updateAppointment: async (id: number, appointmentData: Partial<Appointment>) => {
    const response = await api.put(`/appointments/${id}/`, appointmentData);
    return response.data;
  },

  // Delete an appointment
  deleteAppointment: async (id: number) => {
    return api.delete(`/appointments/${id}/`);
  },

  // Update appointment status
  updateStatus: async (id: number, status: Appointment['status']) => {
    const response = await api.patch(`/appointments/${id}/`, { status });
    return response.data;
  }
};

export default AppointmentService;
