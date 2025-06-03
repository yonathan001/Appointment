import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from '../components/AppointmentList';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const Appointments: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.role === 'admin' 
              ? 'All Appointments' 
              : user?.role === 'staff' 
                ? 'Your Assigned Appointments' 
                : 'Your Appointments'}
          </h1>
          <div className="mt-2 flex space-x-4">
            <span className="text-blue-600 font-semibold">List View</span>
            <Link to="/calendar" className="text-gray-600 hover:text-blue-600">Calendar View</Link>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link to="/calendar">
            <Button variant="secondary" size="small">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar View
            </Button>
          </Link>
          
          {user?.role === 'client' && (
            <Link to="/appointments/book">
              <Button variant="primary" size="small">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Book New Appointment
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <AppointmentList />
      </div>
    </div>
  );
};

export default Appointments;
