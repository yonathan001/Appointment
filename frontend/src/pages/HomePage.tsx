import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  let dashboardPath = '/login'; // Default to login if not authenticated
  if (isAuthenticated) {
    switch (userRole) {
      case 'admin':
        dashboardPath = '/admin/dashboard';
        break;
      case 'staff':
        dashboardPath = '/staff/dashboard';
        break;
      case 'client':
        dashboardPath = '/client/dashboard';
        break;
      default:
        dashboardPath = '/'; // Or some other appropriate default
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] bg-gradient-to-br from-sky-500 to-indigo-600 text-white p-6">
      <div className="text-center bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-xl shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to AppointmentSys
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Streamline your scheduling, manage appointments with ease, and connect with clients and staff efficiently. 
          Our platform is designed to simplify your workflow.
        </p>
        <div className="space-x-4">
          {isAuthenticated ? (
            <Link 
              to={dashboardPath}
              className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-100 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                to="/login"
                className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-100 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white hover:text-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
