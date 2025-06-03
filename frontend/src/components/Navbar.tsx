import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationBell from './NotificationBell';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Appointment System</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/appointments" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Appointments
                </Link>
                
                <Link to="/calendar" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Calendar
                </Link>
                
                {user && user.role === 'admin' && (
                  <>
                    <Link to="/users" className="hover:bg-blue-700 px-3 py-2 rounded">
                      Users
                    </Link>
                    <Link to="/services" className="hover:bg-blue-700 px-3 py-2 rounded">
                      Services
                    </Link>
                  </>
                )}
                
                {user && user.role === 'client' && (
                  <Link to="/appointments/book" className="hover:bg-blue-700 px-3 py-2 rounded text-sm">
                    Book Appointment
                  </Link>
                )}
                
                <Link to="/notifications" className="hover:bg-blue-700 px-3 py-2 rounded text-sm">
                  Notifications
                </Link>
                
                <div className="flex items-center">
                  <div className="px-3 py-2">
                    <span className="mr-2">Welcome, {user?.username}</span>
                    <span className="bg-blue-800 px-2 py-1 rounded text-xs">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </span>
                  </div>
                  
                  <div className="px-3 py-2">
                    <NotificationBell />
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Login
                </Link>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/appointments"
                  className="block px-3 py-2 rounded hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Appointments
                </Link>
                
                <Link
                  to="/calendar"
                  className="block px-3 py-2 rounded hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calendar
                </Link>
                
                {user && user.role === 'admin' && (
                  <>
                    <Link
                      to="/users"
                      className="block px-3 py-2 rounded hover:bg-blue-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Users
                    </Link>
                    <Link
                      to="/services"
                      className="block px-3 py-2 rounded hover:bg-blue-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </Link>
                  </>
                )}
                
                {user && user.role === 'client' && (
                  <Link
                    to="/appointments/book"
                    className="block px-3 py-2 rounded hover:bg-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Appointment
                  </Link>
                )}
                
                <div className="flex items-center">
                  <div className="px-3 py-2">
                    <span className="mr-2">Welcome, {user?.username}</span>
                    <span className="bg-blue-800 px-2 py-1 rounded text-xs">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </span>
                  </div>
                  
                  <div className="px-3 py-2">
                    <NotificationBell />
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
