import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const userRole = user?.role;
  const activePath = location.pathname;

  // Common styles
  const linkClasses = "px-2 py-1 rounded text-xs transition-colors";
  const activeLinkClasses = "bg-gray-700 text-white";
  const inactiveLinkClasses = "text-gray-300 hover:bg-gray-800 hover:text-white";
  const mobileLinkClasses = "block py-2 px-3 rounded text-xs transition-colors";

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-1 text-white hover:opacity-90"
            style={{ minHeight: 32 }}
          >
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Appointly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            

            {isAuthenticated ? (
              <>
                {userRole === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className={`${linkClasses} ${activePath.startsWith('/admin') ? activeLinkClasses : inactiveLinkClasses}`}
                  >
                    Admin
                  </Link>
                )}
                {userRole === 'staff' && (
                  <Link 
                    to="/staff/dashboard" 
                    className={`${linkClasses} ${activePath.startsWith('/staff') ? activeLinkClasses : inactiveLinkClasses}`}
                  >
                    Staff
                  </Link>
                )}
                {userRole === 'client' && (
                  <Link 
                    to="/client/dashboard" 
                    className={`${linkClasses} ${activePath.startsWith('/client') ? activeLinkClasses : inactiveLinkClasses}`}
                  >
                    Appointments
                  </Link>
                )}

                {/* Profile Dropdown */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-1 p-1 rounded hover:bg-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 dark:border-gray-500">
  <svg 
    className="h-4 w-4 text-gray-500 dark:text-gray-400" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
    />
  </svg>
</span>
                    <span className="text-gray-300 text-xs truncate max-w-[100px]">
                      {user?.first_name || user?.username}
                    </span>
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700">
                      <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                        {user?.email}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-gray-700 hover:text-red-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`${linkClasses} ${activePath === '/login' ? activeLinkClasses : inactiveLinkClasses}`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-xs font-medium text-white transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <span className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs mr-2">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <span className="sr-only">Open menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`${mobileLinkClasses} ${activePath === '/' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {userRole === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className={`${mobileLinkClasses} ${activePath.startsWith('/admin') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {userRole === 'staff' && (
                  <Link
                    to="/staff/dashboard"
                    className={`${mobileLinkClasses} ${activePath.startsWith('/staff') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Staff Dashboard
                  </Link>
                )}
                {userRole === 'client' && (
                  <Link
                    to="/client/dashboard"
                    className={`${mobileLinkClasses} ${activePath.startsWith('/client') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Appointments
                  </Link>
                )}

                <div className="pt-2 border-t border-gray-800">
                  <div className="px-3 py-2 text-xs text-gray-400">{user?.email}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-gray-700 hover:text-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${mobileLinkClasses} ${activePath === '/login' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded text-xs font-medium text-white text-center mx-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
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