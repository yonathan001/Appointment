import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Appointment Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          A comprehensive solution for managing appointments between service providers and clients.
          Book, track, and manage appointments with ease.
        </p>
        
        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button variant="primary" size="large">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="large">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="primary" size="large">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-center">
              Clients can easily browse services and book appointments at their convenience.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Service Management</h3>
            <p className="text-gray-600 text-center">
              Administrators can easily manage services, pricing, and availability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Role-Based Access</h3>
            <p className="text-gray-600 text-center">
              Different user roles (Admin, Staff, Client) with appropriate permissions and views.
            </p>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-blue-100 text-blue-500 rounded-full p-4 md:mr-6 mb-4 md:mb-0">
              <span className="text-2xl font-bold">1</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Register as a client to book appointments or as a service provider to offer services.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-green-100 text-green-500 rounded-full p-4 md:mr-6 mb-4 md:mb-0">
              <span className="text-2xl font-bold">2</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Browse Services</h3>
              <p className="text-gray-600">
                Explore available services, view details, pricing, and duration.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-purple-100 text-purple-500 rounded-full p-4 md:mr-6 mb-4 md:mb-0">
              <span className="text-2xl font-bold">3</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
              <p className="text-gray-600">
                Select a service, choose a date and time, and confirm your booking.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-yellow-100 text-yellow-500 rounded-full p-4 md:mr-6 mb-4 md:mb-0">
              <span className="text-2xl font-bold">4</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Manage Appointments</h3>
              <p className="text-gray-600">
                View, reschedule, or cancel your appointments through your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Join our platform today and experience the convenience of our appointment management system.
        </p>
        
        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="large">
                Create an Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="large">
                Log In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="primary" size="large">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
