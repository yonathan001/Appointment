import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted import path

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null); 
  const [formIsLoading, setFormIsLoading] = useState(false); 
  const navigate = useNavigate();
  const { login, isAuthenticated, user, isLoading: authIsLoading } = useAuth(); 

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
      else if (user.role === 'staff') navigate('/staff/dashboard', { replace: true });
      else navigate('/client/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormIsLoading(true);
    try {
      await login({ username, password });
    } catch (err: any) {
      setFormError(err.message || err.response?.data?.detail || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
    setFormIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-lg shadow-xl">
        <div className="text-center">
          {/* Optional: Add a logo here */}
          {/* <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="Workflow" /> */}
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to your account.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {formError && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
              {formError}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Optional: Add 'Forgot password?' link here */}
          {/* <div className="text-sm text-right">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div> */}

          <div>
            <button
              type="submit"
              disabled={formIsLoading || authIsLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {formIsLoading || authIsLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
