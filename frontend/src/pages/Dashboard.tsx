import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppointmentService from '../services/appointment.service';
import ServiceService from '../services/service.service';
import { Appointment, Service } from '../types';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointments
        const appointmentsResponse = await AppointmentService.getAppointments();
        const appointmentsList = appointmentsResponse.results || [];
        setAppointments(appointmentsList.slice(0, 5)); // Get only the first 5 for the dashboard
        
        // Calculate stats
        const total = appointmentsList.length;
        const pending = appointmentsList.filter(a => a.status === 'pending').length;
        const completed = appointmentsList.filter(a => a.status === 'completed').length;
        const cancelled = appointmentsList.filter(a => a.status === 'cancelled').length;
        
        setStats({
          totalAppointments: total,
          pendingAppointments: pending,
          completedAppointments: completed,
          cancelledAppointments: cancelled
        });
        
        // If admin or client, also fetch services
        if (user && (user.role === 'admin' || user.role === 'client')) {
          const servicesResponse = await ServiceService.getServices();
          setServices((servicesResponse.results || []).slice(0, 5)); // Get only the first 5 for the dashboard
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user ? user.username : 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          {user && user.role === 'admin' 
            ? 'Manage your appointment system from this dashboard.' 
            : user && user.role === 'staff' 
              ? 'View and manage your assigned appointments.' 
              : 'Book and manage your appointments.'}
        </p>
      </div>
      
      {error && <ErrorMessage message={error} />}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Total Appointments</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Pending</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.pendingAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Completed</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.completedAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">Cancelled</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.cancelledAppointments}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
          <Link to="/appointments" className="text-blue-600 hover:text-blue-800">
            View All
          </Link>
        </div>
        
        <div className="p-6">
          {appointments.length === 0 ? (
            <p className="text-gray-600">No appointments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    {user && user.role !== 'client' && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.service.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(appointment.date).toLocaleDateString()}, {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      {user && user.role !== 'client' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.client.username}</div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Services Section - Only for Admin and Client */}
      {user && (user.role === 'admin' || user.role === 'client') && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Available Services</h2>
            {user.role === 'admin' ? (
              <Link to="/services" className="text-blue-600 hover:text-blue-800">
                Manage Services
              </Link>
            ) : (
              <Link to="/appointments/book" className="text-blue-600 hover:text-blue-800">
                Book Appointment
              </Link>
            )}
          </div>
          
          <div className="p-6">
            {services.length === 0 ? (
              <p className="text-gray-600">No services found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-700">${service.price.toFixed(2)}</span>
                      <span className="text-gray-700">{service.duration_minutes} mins</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {user && user.role === 'admin' && (
            <>
              <Link to="/users" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">Manage Users</span>
                </div>
              </Link>
              
              <Link to="/services" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">Manage Services</span>
                </div>
              </Link>
            </>
          )}
          
          <Link to="/appointments" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="ml-3 text-gray-700">View Appointments</span>
            </div>
          </Link>
          
          {user && user.role === 'client' && (
            <Link to="/appointments/book" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-3 text-gray-700">Book Appointment</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
