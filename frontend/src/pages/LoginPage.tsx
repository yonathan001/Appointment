import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, fetchUserProfile } from '../services/api';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const role = localStorage.getItem('userRole');
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'staff') navigate('/staff/dashboard');
      else navigate('/client/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    console.log('Attempting to log in with:', { username, password }); // Added for debugging
    try {
      const loginResponse = await loginUser({ username, password });
      localStorage.setItem('accessToken', loginResponse.data.access);
      localStorage.setItem('refreshToken', loginResponse.data.refresh);

      // After successful login, fetch user profile to get the role
      // This assumes your /api/token/ response doesn't include the role directly
      // or you prefer a separate endpoint for user details.
      try {
        const profileResponse = await fetchUserProfile();
        const userRole = profileResponse.data.role || 'client'; // Default to client if role not present
        localStorage.setItem('userRole', userRole);
        
        // Dispatch a custom event to notify Navbar and other components about auth change
        window.dispatchEvent(new Event('authChange'));

        // Redirect based on role
        if (userRole === 'admin') navigate('/admin/dashboard');
        else if (userRole === 'staff') navigate('/staff/dashboard');
        else navigate('/client/dashboard');

      } catch (profileError: any) {
        console.error('Failed to fetch user profile:', profileError);
        setError('Login successful, but failed to retrieve user details. Please try refreshing.');
        // Still dispatch authChange as token is set
        window.dispatchEvent(new Event('authChange'));
        // Potentially navigate to a generic page or show error prominently
      }

    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
