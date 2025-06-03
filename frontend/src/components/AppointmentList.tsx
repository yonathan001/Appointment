import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Appointment } from '../types';
import AppointmentService from '../services/appointment.service';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await AppointmentService.getAppointments();
        setAppointments(response.results || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id: number, status: Appointment['status']) => {
    try {
      await AppointmentService.updateStatus(id, status);
      
      // Update the local state
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError('Failed to update appointment status. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await AppointmentService.deleteAppointment(id);
        
        // Remove from local state
        setAppointments(prevAppointments => 
          prevAppointments.filter(appointment => appointment.id !== id)
        );
      } catch (err) {
        console.error('Error deleting appointment:', err);
        setError('Failed to delete appointment. Please try again.');
      }
    }
  };

  const getStatusBadgeColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
        {user?.role === 'client' && (
          <div className="mt-3">
            <Link 
              to="/appointments/book" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Book an Appointment
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            {(user?.role === 'admin' || user?.role === 'client') && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff
              </th>
            )}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.client_details?.username || 'Unknown'}
                </div>
              </td>
              {(user?.role === 'admin' || user?.role === 'client') && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.staff_details?.username || 'Unknown'}
                  </div>
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.service_details?.name || 'No service'}
                </div>
                {appointment.service_details && (
                  <div className="text-sm text-gray-500">
                    ${appointment.service_details.price} - {appointment.service_details.duration_minutes} min
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(new Date(appointment.date), 'MMM dd, yyyy')}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.time}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {/* Staff and Admin can update status */}
                {(user?.role === 'admin' || user?.role === 'staff') && appointment.status === 'pending' && (
                  <button
                    onClick={() => handleStatusUpdate(appointment.id, 'approved')}
                    className="text-green-600 hover:text-green-900 mr-2"
                  >
                    Approve
                  </button>
                )}
                
                {(user?.role === 'admin' || user?.role === 'staff') && 
                 (appointment.status === 'pending' || appointment.status === 'approved') && (
                  <button
                    onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Complete
                  </button>
                )}
                
                {/* Anyone can cancel their appointments */}
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                    className="text-red-600 hover:text-red-900 mr-2"
                  >
                    Cancel
                  </button>
                )}
                
                {/* Admin can delete appointments */}
                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
