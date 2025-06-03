import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointment: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book a New Appointment</h1>
      <AppointmentForm />
    </div>
  );
};

export default BookAppointment;
