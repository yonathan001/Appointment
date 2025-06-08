import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth(); // Use AuthContext

  let dashboardPath = '/login'; // Default to login
  // isLoading will be true initially, during which isAuthenticated is false.
  // Once loading is false, isAuthenticated and user will have their true values.
  if (!isLoading && isAuthenticated && user) {
    switch (user.role) {
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
        // This case should ideally not be reached if roles are well-defined
        // and user object is guaranteed when isAuthenticated is true.
        dashboardPath = '/'; // Fallback to home or a generic authenticated page
    }
  } else if (isLoading) {
    // Optionally, handle the loading state for dashboardPath or button display
    // For now, if loading, isAuthenticated is false, so login/register buttons will show.
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 text-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Manage Your Appointments <span className="text-indigo-600">Effortlessly</span>.
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10">
          Book, schedule, and organize with ease. Our platform simplifies your workflow, connecting you seamlessly with clients and staff.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {isAuthenticated ? (
            <Link
              to={dashboardPath}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
