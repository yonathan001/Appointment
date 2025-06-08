import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const NotificationPage: React.FC = () => {
  // Placeholder notifications
  const notifications = [
    { id: 1, message: 'Your appointment on June 10 has been approved.' },
    { id: 2, message: 'Reminder: Appointment with Dr. Smith tomorrow at 10:00 AM.' },
    { id: 3, message: 'Your password was changed successfully.' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <BellIcon className="w-7 h-7 text-indigo-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>
      <div className="bg-white/60 backdrop-blur rounded-xl shadow p-6">
        {notifications.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            <BellIcon className="w-12 h-12 mx-auto mb-4" />
            No notifications yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map(n => (
              <li key={n.id} className="py-4 text-gray-700 text-sm flex items-center">
                <BellIcon className="w-5 h-5 text-indigo-400 mr-3" />
                {n.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
