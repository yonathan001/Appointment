import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions from context

  const handleLogout = async () => {
    try {
      await logout(); // Call logout from AuthContext
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Optionally, display an error message to the user
    }
  };

  // The useEffect for listening to 'storage' and 'authChange' events is no longer needed
  // as AuthContext will manage and propagate state changes.

  // If auth state is loading, you might want to render a placeholder or minimal navbar
  // For simplicity, we'll let it render based on the initial/loading state of isAuthenticated and user.
  // if (isLoading) {
  //   return (
  //     <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
  //       <div className="container mx-auto flex justify-between items-center">
  //         <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
  //           AppointmentSys
  //         </Link>
  //         <div>Loading...</div>
  //       </div>
  //     </nav>
  //   );
  // }

  const userRole = user?.role; // Get role from the user object in context

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          AppointmentSys
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">Home</Link>
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && <Link to="/admin/dashboard" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">Admin</Link>}
              {userRole === 'staff' && <Link to="/staff/dashboard" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">Staff</Link>}
              {/* Ensure user object is not null before accessing role for client dashboard link */}
              {userRole === 'client' && <Link to="/client/dashboard" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">My Appointments</Link>}
              {/* Display Username */}
              {user && (
                <span className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  Hi, {user.username}
                </span>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">Login</Link>
              <Link to="/register" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
