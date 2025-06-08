import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  let dashboardPath = '/login';
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
        dashboardPath = '/';
    }
  }

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)' },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-50 text-gray-900 min-h-screen px-4 sm:px-6 lg:px-8 selection:bg-indigo-400 selection:text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl py-20 sm:py-32"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Simplify Scheduling with{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            AppointmentSys
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Effortlessly manage appointments, connect with clients, and optimize your workflow with our intuitive platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isAuthenticated ? (
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to={dashboardPath}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 backdrop-blur-sm bg-opacity-90"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 backdrop-blur-sm bg-opacity-90"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-indigo-600 bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300 backdrop-blur-sm border border-indigo-200"
                >
                  Sign In
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Why <span className="text-indigo-600">AppointmentSys</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Designed to streamline your scheduling and enhance productivity.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
              <div className="p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
                <p className="text-gray-600 text-sm">Book and manage appointments with ease using our intuitive interface.</p>
              </div>
            </motion.div>
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <div className="p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Notifications</h3>
                <p className="text-gray-600 text-sm">Keep clients and staff informed with timely email and SMS reminders.</p>
              </div>
            </motion.div>
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <div className="p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Sync</h3>
                <p className="text-gray-600 text-sm">Coordinate schedules across your team for seamless collaboration.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 w-full bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Trusted by Leading Businesses
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join the companies streamlining their scheduling with AppointmentSys.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
          >
            {/* Placeholder logos - replace with actual <img> tags or SVGs */}
            <span className="text-2xl font-medium text-gray-400 hover:text-gray-600 transition-colors filter grayscale hover:grayscale-0">
              ClientCo
            </span>
            <span className="text-2xl font-medium text-gray-400 hover:text-gray-600 transition-colors filter grayscale hover:grayscale-0">
              YourLogoHere
            </span>
            <span className="text-2xl font-medium text-gray-400 hover:text-gray-600 transition-colors filter grayscale hover:grayscale-0">
              Partner Inc.
            </span>
            <span className="text-2xl font-medium text-gray-400 hover:text-gray-600 transition-colors filter grayscale hover:grayscale-0">
              BizName
            </span>
            <span className="text-2xl font-medium text-gray-400 hover:text-gray-600 transition-colors filter grayscale hover:grayscale-0">
              ServicePro
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;