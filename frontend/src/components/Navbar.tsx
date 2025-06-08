import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const commonLinkClasses = "block md:inline-block px-3 py-2 rounded-md hover:text-gray-300 hover:bg-gray-700 md:hover:bg-transparent transition-colors";
  const activeLinkClasses = "text-white bg-gray-900 md:bg-transparent md:text-white"; // Example active style, can be refined with NavLink

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
            AppointmentSys
          </Link>

          {/* Hamburger Menu Button (visible on mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. Heroicon name: menu */} 
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open. Heroicon name: x */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu Links (hidden on mobile by default) */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link to="/" className={`${commonLinkClasses} ${location.pathname === '/' ? activeLinkClasses : ''}`}>Home</Link>
            {isAuthenticated ? (
              <>
                {userRole === 'admin' && <Link to="/admin/dashboard" className={`${commonLinkClasses} ${location.pathname.startsWith('/admin') ? activeLinkClasses : ''}`}>Admin</Link>}
                {userRole === 'staff' && <Link to="/staff/dashboard" className={`${commonLinkClasses} ${location.pathname.startsWith('/staff') ? activeLinkClasses : ''}`}>Staff</Link>}
                {userRole === 'client' && <Link to="/client/dashboard" className={`${commonLinkClasses} ${location.pathname.startsWith('/client') ? activeLinkClasses : ''}`}>My Appointments</Link>}
                {user && (
                  <span className="text-gray-400 px-3 py-2 text-sm font-medium">
                    Hi, {user.username}
                  </span>
                )}
                <button 
                  onClick={handleLogout} 
                  className="ml-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${commonLinkClasses} ${location.pathname === '/login' ? activeLinkClasses : ''}`}>Login</Link>
                <Link to="/register" className={`${commonLinkClasses} ${location.pathname === '/register' ? activeLinkClasses : ''}`}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (shown when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`${commonLinkClasses} ${location.pathname === '/' ? activeLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            {isAuthenticated ? (
              <>
                {userRole === 'admin' && <Link to="/admin/dashboard" className={`${commonLinkClasses} ${location.pathname.startsWith('/admin') ? activeLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>}
                {userRole === 'staff' && <Link to="/staff/dashboard" className={`${commonLinkClasses} ${location.pathname.startsWith('/staff') ? activeLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Staff</Link>}
                {userRole === 'client' && <Link to="/client/dashboard" className={`${commonLinkClasses} ${location.pathname.startsWith('/client') ? activeLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>My Appointments</Link>}
                {user && (
                  <span className="block text-gray-400 px-3 py-2 text-sm font-medium">
                    Hi, {user.username}
                  </span>
                )}
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left block bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors mt-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${commonLinkClasses} ${location.pathname === '/login' ? activeLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className={`${commonLinkClasses} ${location.pathname === '/register' ? activeLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
