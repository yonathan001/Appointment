import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Initialize state directly from localStorage for immediate reflection
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => !!localStorage.getItem('accessToken'));
  const [userRole, setUserRole] = React.useState<string | null>(() => localStorage.getItem('userRole'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    // Update state immediately and dispatch event
    setIsAuthenticated(false);
    setUserRole(null);
    window.dispatchEvent(new Event('authChange')); 
    navigate('/login');
  };

  React.useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem('accessToken');
      const role = localStorage.getItem('userRole');
      setIsAuthenticated(!!token);
      setUserRole(role);
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', updateAuthState);
    // Listen for custom authChange event dispatched by login/logout functions
    window.addEventListener('authChange', updateAuthState);
    
    // Call it once to set initial state correctly after component mounts
    updateAuthState(); 

    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('authChange', updateAuthState);
    };
  }, []);

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
              {userRole === 'client' && <Link to="/client/dashboard" className="hover:text-gray-300 transition-colors px-3 py-2 rounded-md">My Appointments</Link>}
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
