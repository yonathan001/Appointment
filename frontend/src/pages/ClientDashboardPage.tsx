import React, { useEffect, useState } from 'react';
import { fetchClientAppointments, cancelAppointment } from '../services/api';
import type { Appointment } from '../services/api';

const ClientDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchClientAppointments();
      setAppointments(res.data);
    } catch (err: any) {
      setError('Failed to load appointments.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id: number) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    setCancellingId(id);
    try {
      await cancelAppointment(id);
      fetchAppointments();
    } catch (err: any) {
      alert('Failed to cancel appointment.');
    }
    setCancellingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-10">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-10">No appointments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="py-2 px-4">Service</th>
                <th className="py-2 px-4">Staff</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-t">
                  <td className="py-2 px-4">{appt.service_details?.name || appt.service}</td>
                  <td className="py-2 px-4">{appt.staff_details?.username || appt.staff}</td>
                  <td className="py-2 px-4">{appt.date}</td>
                  <td className="py-2 px-4">{appt.time}</td>
                  <td className="py-2 px-4 capitalize">{appt.status}</td>
                  <td className="py-2 px-4">
                    {appt.status === 'pending' && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                        disabled={cancellingId === appt.id}
                        onClick={() => handleCancel(appt.id)}
                      >
                        {cancellingId === appt.id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <a
          href="/book-appointment"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 font-semibold transition"
        >
          Book New Appointment
        </a>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
