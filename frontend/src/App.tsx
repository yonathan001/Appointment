import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css'; // Import App.css

// Placeholder Dashboard Components
const ClientDashboard = () => <div className="container mx-auto p-4"><h1 className='text-3xl font-semibold'>Client Dashboard</h1><p className='mt-2 text-gray-700'>Your appointments and personal information.</p></div>;
const StaffDashboard = () => <div className="container mx-auto p-4"><h1 className='text-3xl font-semibold'>Staff Dashboard</h1><p className='mt-2 text-gray-700'>Manage your assigned appointments and schedule.</p></div>;
const AdminDashboard = () => <div className="container mx-auto p-4"><h1 className='text-3xl font-semibold'>Admin Dashboard</h1><p className='mt-2 text-gray-700'>Oversee users, services, and all appointments.</p></div>;
const NotFoundPage = () => <div className="container mx-auto p-4 text-center"><h1 className='text-4xl font-bold text-red-600'>404 - Page Not Found</h1><p className='mt-4 text-lg'>Sorry, the page you are looking for does not exist.</p></div>;

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: Array<'admin' | 'client' | 'staff'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole') as 'admin' | 'client' | 'staff' | null;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // User is authenticated but does not have the required role
    // Redirect to a generic 'unauthorized' page or their default dashboard
    // For simplicity, redirecting to home. A dedicated 'Unauthorized' component is better.
    return <Navigate to="/" replace />; 
  }

  return element;
};

const App: React.FC = () => {
  // This state and effect ensure the app re-renders if auth state changes, 
  // which helps ProtectedRoute to re-evaluate.
  const [, setAuthCheck] = useState(0);
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthCheck(c => c + 1);
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  return (

    
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow pt-4 pb-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Client Routes */}
          <Route 
            path="/client/dashboard"
            element={<ProtectedRoute element={<ClientDashboard />} allowedRoles={['client', 'admin']} />}
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
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} AppointmentSys. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
