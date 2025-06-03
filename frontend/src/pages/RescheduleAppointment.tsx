import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Appointment } from '../types';
import AppointmentService from '../services/appointment.service';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import Button from '../components/Button';

const RescheduleAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    date: '',
    time: ''
  });

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await AppointmentService.getAppointment(parseInt(id));
        setAppointment(response);
        
        // Initialize form with current values
        setFormData({
          date: response.date,
          time: response.time
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching appointment details:', err);
        setError('Failed to load appointment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointment) return;
    
    if (!formData.date || !formData.time) {
      setError('Please select both date and time');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      await AppointmentService.updateAppointment(appointment.id, {
        date: formData.date,
        time: formData.time
      });
      
      setSuccess('Appointment rescheduled successfully');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(`/appointments/${appointment.id}`);
      }, 2000);
    } catch (err) {
      console.error('Error rescheduling appointment:', err);
      setError('Failed to reschedule appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading message="Loading appointment details..." />;
  }

  if (error && !appointment) {
    return <ErrorMessage message={error} />;
  }

  if (!appointment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Appointment not found. It may have been deleted or you don't have permission to view it.
              </p>
            </div>
          </div>
        </div>
        <Button variant="secondary" onClick={() => navigate('/appointments')}>
          Back to Appointments
        </Button>
      </div>
    );
  }

  // Check if user has permission to reschedule
  const canReschedule = 
    user?.role === 'admin' || 
    (user?.role === 'staff' && appointment.staff === user.id) ||
    (user?.role === 'client' && appointment.client === user.id);
  
  if (!canReschedule) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="You don't have permission to reschedule this appointment" />
        <div className="mt-4">
          <Button variant="secondary" onClick={() => navigate(`/appointments/${appointment.id}`)}>
            Back to Appointment Details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate(`/appointments/${appointment.id}`)}>
          &larr; Back to Appointment Details
        </Button>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h1 className="text-xl font-bold text-gray-800">Reschedule Appointment</h1>
        </div>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Current Appointment</p>
              <p className="text-base text-gray-900">
                Date: {appointment.date} | Time: {appointment.time}
              </p>
              {appointment.service_details && (
                <p className="text-sm text-gray-600 mt-1">
                  Service: {appointment.service_details.name} ({appointment.service_details.duration_minutes} min)
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">New Date and Time</h2>
              
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                  New Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                  New Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="primary"
                loading={submitting}
              >
                Reschedule Appointment
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/appointments/${appointment.id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointment;
