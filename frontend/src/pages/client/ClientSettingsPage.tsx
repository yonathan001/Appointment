import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ClientSettingsPage: React.FC = () => {
  const { user } = useAuth();
  // Optionally, redirect or show unauthorized if not client
  if (user?.role !== 'client') {
    return <div className="text-center text-red-500 py-20">Unauthorized: Only clients can access this page.</div>;
  }

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // TODO: Replace with actual API integration
  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Personal info updated (demo only)');
  };
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password updated (demo only)');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Settings</h1>

      {/* Personal Info */}
      <section className="mb-10 bg-white/60 backdrop-blur rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
        <form className="space-y-4" onSubmit={handlePersonalSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <button type="submit" className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">Update Info</button>
        </form>
      </section>

      {/* Security */}
      <section className="bg-white/60 backdrop-blur rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Security</h2>
        <form className="space-y-4" onSubmit={handleSecuritySubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <button type="submit" className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">Change Password</button>
        </form>
      </section>
    </div>
  );
};

export default ClientSettingsPage;
