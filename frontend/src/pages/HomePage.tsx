import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth(); // Use AuthContext

  let dashboardPath = '/login'; // Default to login
  // isLoading will be true initially, during which isAuthenticated is false.
  // Once loading is false, isAuthenticated and user will have their true values.
  if (!isLoading && isAuthenticated && user) {
    switch (user.role) {
      case 'admin':
        dashboardPath = '/admin/dashboard';
        break;
      case 'staff':
        dashboardPath = '/staff/dashboard';
        break;
      case 'client':
        dashboardPath = '/client/dashboard';
        break;
      default:
        // This case should ideally not be reached if roles are well-defined
        // and user object is guaranteed when isAuthenticated is true.
        dashboardPath = '/'; // Fallback to home or a generic authenticated page
    }
  } else if (isLoading) {
    // Optionally, handle the loading state for dashboardPath or button display
    // For now, if loading, isAuthenticated is false, so login/register buttons will show.
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 text-gray-800 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      {/* The min-h calculation might need adjustment based on actual Navbar and Footer height combined */}
      <div className="text-center max-w-3xl py-16 sm:py-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
          Schedule Smarter, <br className="hidden sm:block" />Not Harder, with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">AppointmentSys</span>.
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 mb-12 max-w-xl mx-auto">
          Streamline your bookings, manage your calendar effortlessly, and connect with your clients like never before. Welcome to the future of scheduling.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          {isAuthenticated ? (
            <Link
              to={dashboardPath}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border-2 border-indigo-500 text-lg font-semibold rounded-lg text-indigo-600 bg-transparent hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
        {/* Optional: Add a small note or feature highlight below CTAs */}
        <p className="mt-12 text-sm text-slate-500">
          Trusted by professionals for seamless appointment management.
        </p>
      </div>

      {/* Features Section */}
      <section className="py-20 sm:py-28 w-full bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-gray-900">
              Why Choose <span className="text-indigo-600">AppointmentSys</span>?
            </h2>
            <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Our platform is designed to simplify your scheduling, enhance client interactions, and boost your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mb-5">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intuitive Scheduling</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Effortlessly book, manage, and track appointments with our user-friendly calendar.</p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mb-5">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Reminders</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Reduce no-shows with customizable email and SMS notifications for clients and staff.</p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mb-5">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Manage schedules for multiple staff members and assign appointments seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 sm:py-28 w-full bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900">
              Trusted by Professionals Worldwide
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Join the growing community of businesses thriving with AppointmentSys.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 sm:gap-x-16 lg:gap-x-20 opacity-75">
            {/* Placeholder Logos - Replace with actual <img> tags or SVG components */}
            <span className="text-4xl font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-default">ClientCo</span>
            <span className="text-4xl font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-default">YourLogoHere</span>
            <span className="text-4xl font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-default">Partner Inc.</span>
            <span className="text-4xl font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-default">BizName</span>
            <span className="text-4xl font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-default">ServicePro</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
