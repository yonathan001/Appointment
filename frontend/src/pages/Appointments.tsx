import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from '../components/AppointmentList';
import { useAuth } from '../contexts/AuthContext';

const Appointments: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.role === 'admin' 
            ? 'All Appointments' 
            : user?.role === 'staff' 
              ? 'Your Assigned Appointments' 
              : 'Your Appointments'}
        </h1>
        
        {user?.role === 'client' && (
          <Link
            to="/appointments/book"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Book New Appointment
          </Link>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <AppointmentList />
      </div>
    </div>
  );
};

export default Appointments;
