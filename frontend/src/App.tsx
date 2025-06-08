import React from 'react'; // Removed useEffect, useState as they are no longer directly used in App component
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import AuthProvider and useAuth
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the Footer component
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ContactUsPage from './pages/ContactUsPage'; // Added import
import FAQPage from './pages/FAQPage'; // Added import
import ClientSettingsPage from './pages/client/ClientSettingsPage';
import NotificationPage from './pages/client/NotificationPage';
import './App.css'; // Import App.css

// Dashboard Components
import ClientDashboardPage from './pages/client/ClientDashboardPage';
import BookAppointmentPage from './pages/client/BookAppointmentPage'; // Added import
// Placeholder for future staff and admin dashboard pages
const StaffDashboard = () => <div className="container mx-auto p-4"><h1 className='text-3xl font-semibold'>Staff Dashboard</h1><p className='mt-2 text-gray-700'>Manage your assigned appointments and schedule.</p></div>;
const AdminDashboard = () => <div className="container mx-auto p-4"><h1 className='text-3xl font-semibold'>Admin Dashboard</h1><p className='mt-2 text-gray-700'>Oversee users, services, and all appointments.</p></div>;
const NotFoundPage = () => <div className="container mx-auto p-4 text-center"><h1 className='text-4xl font-bold text-red-600'>404 - Page Not Found</h1><p className='mt-4 text-lg'>Sorry, the page you are looking for does not exist.</p></div>;

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: Array<'admin' | 'client' | 'staff'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You might want to render a loading spinner here
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user?.role;

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // User is authenticated but does not have the required role
    // Redirect to a generic 'unauthorized' page or their default dashboard
    // For simplicity, redirecting to home. A dedicated 'Unauthorized' component is better.
    return <Navigate to="/" replace />; 
  }

  return element;
};

const App: React.FC = () => {
  // The AuthProvider will manage authentication state.
  // The useEffect for 'authChange' and setAuthCheck state are no longer needed.
  return (
    <AuthProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto mt-4 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/client/settings" element={<ProtectedRoute element={<ClientSettingsPage />} allowedRoles={['client']} />} />
            <Route path="/client/notifications" element={<ProtectedRoute element={<NotificationPage />} allowedRoles={['client']} />} />

            {/* Client Routes */}
            <Route 
              path="/client/dashboard"
              element={<ProtectedRoute element={<ClientDashboardPage />} allowedRoles={['client', 'admin']} />}
            />
            <Route 
              path="/book-appointment"
              element={<ProtectedRoute element={<BookAppointmentPage />} allowedRoles={['client', 'admin']} />}
            />
            
            {/* Staff Routes */}
            <Route 
              path="/staff/dashboard"
              element={<ProtectedRoute element={<StaffDashboard />} allowedRoles={['staff', 'admin']} />}
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard"
              element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
