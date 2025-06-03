import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Appointment } from '../types';
import AppointmentService from '../services/appointment.service';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import Button from '../components/Button';
import Modal from '../components/Modal';

const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await AppointmentService.getAppointment(parseInt(id));
        setAppointment(response);
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

  const handleStatusUpdate = async (status: Appointment['status']) => {
    if (!appointment) return;
    
    try {
      setActionLoading(true);
      await AppointmentService.updateStatus(appointment.id, status);
      
      // Update the local state
      setAppointment(prev => prev ? { ...prev, status } : null);
      setSuccess(`Appointment status updated to ${status}.`);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError('Failed to update appointment status. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubmit = async () => {
    if (!appointment) return;
    
    try {
      setActionLoading(true);
      await AppointmentService.updateAppointment(appointment.id, {
        status: 'cancelled',
        notes: appointment.notes ? `${appointment.notes}\n\nCancellation reason: ${cancelReason}` : `Cancellation reason: ${cancelReason}`
      });
      
      // Update the local state
      setAppointment(prev => prev ? { 
        ...prev, 
        status: 'cancelled',
        notes: prev.notes ? `${prev.notes}\n\nCancellation reason: ${cancelReason}` : `Cancellation reason: ${cancelReason}`
      } : null);
      
      setShowCancelModal(false);
      setCancelReason('');
      setSuccess('Appointment has been cancelled.');
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError('Failed to cancel appointment. Please try again.');
    } finally {
      setActionLoading(false);
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
    return <Loading message="Loading appointment details..." />;
  }

  if (error) {
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

  const appointmentDate = new Date(appointment.date);
  const isPastAppointment = new Date() > appointmentDate;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/appointments')}>
          &larr; Back to Appointments
        </Button>
      </div>

      {success && <SuccessMessage message={success} />}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Appointment Details
            </h1>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Appointment Information</h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-base text-gray-900">{format(appointmentDate, 'EEEE, MMMM d, yyyy')}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-base text-gray-900">{appointment.time}</p>
              </div>
              
              {appointment.service_details && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="text-base text-gray-900">{appointment.service_details.name}</p>
                  <p className="text-sm text-gray-600">
                    ${appointment.service_details.price} - {appointment.service_details.duration_minutes} minutes
                  </p>
                </div>
              )}
              
              {appointment.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-base text-gray-900 whitespace-pre-line">{appointment.notes}</p>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">People</h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Client</p>
                <p className="text-base text-gray-900">{appointment.client_details?.username || 'Unknown'}</p>
                {appointment.client_details?.email && (
                  <p className="text-sm text-gray-600">{appointment.client_details.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Staff</p>
                <p className="text-base text-gray-900">{appointment.staff_details?.username || 'Unknown'}</p>
                {appointment.staff_details?.email && (
                  <p className="text-sm text-gray-600">{appointment.staff_details.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons based on role and appointment status */}
          {!isPastAppointment && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Actions</h2>
              
              <div className="flex flex-wrap gap-3">
                {/* Staff and Admin can approve pending appointments */}
                {(user?.role === 'admin' || user?.role === 'staff') && appointment.status === 'pending' && (
                  <Button 
                    variant="success" 
                    onClick={() => handleStatusUpdate('approved')}
                    loading={actionLoading}
                  >
                    Approve Appointment
                  </Button>
                )}
                
                {/* Staff and Admin can mark appointments as completed */}
                {(user?.role === 'admin' || user?.role === 'staff') && 
                 (appointment.status === 'pending' || appointment.status === 'approved') && (
                  <Button 
                    variant="primary" 
                    onClick={() => handleStatusUpdate('completed')}
                    loading={actionLoading}
                  >
                    Mark as Completed
                  </Button>
                )}
                
                {/* Anyone can cancel their appointments */}
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <Button 
                    variant="danger" 
                    onClick={() => setShowCancelModal(true)}
                    loading={actionLoading}
                  >
                    Cancel Appointment
                  </Button>
                )}
                
                {/* Reschedule option */}
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <Link to={`/appointments/reschedule/${appointment.id}`}>
                    <Button variant="secondary">
                      Reschedule
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Appointment"
      >
        <div className="p-6">
          <p className="mb-4 text-gray-700">
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </p>
          
          <div className="mb-4">
            <label htmlFor="cancelReason" className="block text-gray-700 text-sm font-bold mb-2">
              Reason for Cancellation
            </label>
            <textarea
              id="cancelReason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              placeholder="Please provide a reason for cancellation..."
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              variant="secondary" 
              onClick={() => setShowCancelModal(false)}
            >
              Keep Appointment
            </Button>
            <Button 
              variant="danger" 
              onClick={handleCancelSubmit}
              loading={actionLoading}
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentDetail;
