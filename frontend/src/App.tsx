import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import AppointmentDetail from './pages/AppointmentDetail';
import RescheduleAppointment from './pages/RescheduleAppointment';
import Calendar from './pages/Calendar';
import Services from './pages/Services';
import Users from './pages/Users';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route 
                path="/appointments" 
                element={
                  <PrivateRoute>
                    <Appointments />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/calendar" 
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/appointments/book" 
                element={
                  <PrivateRoute requiredRole="client">
                    <BookAppointment />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/appointments/reschedule/:id" 
                element={
                  <PrivateRoute>
                    <RescheduleAppointment />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/appointments/:id" 
                element={
                  <PrivateRoute>
                    <AppointmentDetail />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/services" 
                element={
                  <PrivateRoute requiredRole="admin">
                    <Services />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/users" 
                element={
                  <PrivateRoute requiredRole="admin">
                    <Users />
                  </PrivateRoute>
                } 
              />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
