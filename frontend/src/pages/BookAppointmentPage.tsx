import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import apiClient from '../services/api'; // We'll need this for API calls
// import type { Service, UserData } from '../services/api'; // And types

const BookAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  // const [services, setServices] = useState<Service[]>([]);
  // const [staff, setStaff] = useState<UserData[]>([]); // If staff selection is needed
  // const [selectedService, setSelectedService] = useState<string>('');
  // const [selectedStaff, setSelectedStaff] = useState<string>(''); // If staff selection is needed
  // const [selectedDate, setSelectedDate] = useState<string>('');
  // const [selectedTime, setSelectedTime] = useState<string>('');
  // const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
    // Fetch services (and staff if needed)
    // const fetchInitialData = async () => {
    //   try {
    //     // const servicesRes = await apiClient.get('/services/');
    //     // setServices(servicesRes.data);
    //     // Optionally fetch staff
    //   } catch (err) {
    //     setError('Failed to load initial data.');
    //   }
    // };
    // fetchInitialData();
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // try {
      // const appointmentData = {
      //   service_id: parseInt(selectedService),
      //   // staff_id: parseInt(selectedStaff), // if applicable
      //   date: selectedDate,
      //   time: selectedTime,
      //   notes: notes,
      // };
      // await apiClient.post('/appointments/', appointmentData);
      // alert('Appointment booked successfully!');
      // navigate('/client/dashboard'); // Redirect to dashboard
    // } catch (err: any) {
    //   setError(err.response?.data?.detail || 'Failed to book appointment.');
    // }
    setLoading(false);
    alert('Booking functionality to be implemented.');
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Book New Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        {error && <div className="text-red-500 p-3 bg-red-100 rounded">{error}</div>}
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
          {/* Replace with actual select dropdown populated with services */}
          <select 
            id="service" 
            // value={selectedService}
            // onChange={(e) => setSelectedService(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a service (To be implemented)</option>
            {/* {services.map(service => (
              <option key={service.id} value={service.id}>{service.name} - ${service.price}</option>
            ))} */}
          </select>
        </div>

        {/* Add more fields for Date, Time, Notes, and optionally Staff */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            id="date" 
            // value={selectedDate}
            // onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input 
            type="time" 
            id="time" 
            // value={selectedTime}
            // onChange={(e) => setSelectedTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <textarea 
            id="notes" 
            // value={notes}
            // onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointmentPage;
