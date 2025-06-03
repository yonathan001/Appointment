import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, 
         isSameDay, addMonths, subMonths, parseISO, isToday } from 'date-fns';
import { Appointment } from '../types';
import AppointmentService from '../services/appointment.service';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';

const Calendar: React.FC = () => {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await AppointmentService.getAppointments();
        setAppointments(response.results || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center py-2 font-semibold text-sm text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = (): JSX.Element => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const dateFormat = 'd';
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Group days into weeks
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    
    allDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return (
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-1">
            {week.map((day) => {
              const formattedDate = format(day, dateFormat);
              
              // Get appointments for this day
              const dayAppointments = appointments.filter(appointment => 
                isSameDay(parseISO(appointment.date), day)
              );
              
              return (
                <div
                  key={day.toString()}
                  className={`min-h-[100px] p-2 border border-gray-200 ${
                    !isSameMonth(day, monthStart)
                      ? 'bg-gray-100 text-gray-400'
                      : isToday(day)
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-semibold ${
                      isToday(day) ? 'text-blue-600' : ''
                    }`}>
                      {formattedDate}
                    </span>
                    {isSameMonth(day, monthStart) && user?.role === 'client' && (
                      <Link 
                        to="/appointments/book" 
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-1.5 py-0.5 rounded"
                      >
                        +
                      </Link>
                    )}
                  </div>
                  
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
                    {dayAppointments.map(appointment => (
                      <Link
                        key={appointment.id}
                        to={`/appointments/${appointment.id}`}
                        className={`block text-xs p-1 rounded truncate ${
                          appointment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : appointment.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {appointment.time} - {appointment.service_details?.name || 'Appointment'}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <Loading message="Loading calendar..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointment Calendar</h1>
          <div className="mt-2 flex space-x-4">
            <Link to="/appointments" className="text-gray-600 hover:text-blue-600">List View</Link>
            <span className="text-blue-600 font-semibold">Calendar View</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link to="/appointments">
            <Button variant="secondary" size="small">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List View
            </Button>
          </Link>
          
          {user?.role === 'client' && (
            <Link to="/appointments/book">
              <Button variant="primary" size="small">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Book New Appointment
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      
      <div className="mt-6">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-800 rounded-full mr-1"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 border border-green-800 rounded-full mr-1"></div>
            <span>Approved</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 border border-blue-800 rounded-full mr-1"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 border border-red-800 rounded-full mr-1"></div>
            <span>Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
