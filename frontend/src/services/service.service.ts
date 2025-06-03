import api from './api';
import { Service } from '../types';

const ServiceService = {
  // Get all services
  getServices: async () => {
    const response = await api.get('/services/');
    return response.data;
  },

  // Get a single service by ID
  getService: async (id: number): Promise<Service> => {
    const response = await api.get(`/services/${id}/`);
    return response.data;
  },

  // Create a new service (admin only)
  createService: async (serviceData: Partial<Service>) => {
    const response = await api.post('/services/', serviceData);
    return response.data;
  },

  // Update an existing service (admin only)
  updateService: async (id: number, serviceData: Partial<Service>) => {
    const response = await api.put(`/services/${id}/`, serviceData);
    return response.data;
  },

  // Delete a service (admin only)
  deleteService: async (id: number) => {
    return api.delete(`/services/${id}/`);
  }
};

export default ServiceService;
