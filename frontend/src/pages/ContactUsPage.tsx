import React from 'react';

const ContactUsPage: React.FC = () => {
  // Handle form submission logic here (e.g., send data to an API)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Replace with actual submission logic
    alert('Form submitted! (This is a placeholder)');
    // Consider resetting form fields or showing a success message
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-128px)] selection:bg-indigo-500 selection:text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
            Have questions or need support? We're here to help. Reach out to us through the form below or using our direct contact information.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Form Section */}
          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  autoComplete="name" 
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-150 ease-in-out hover:shadow-md"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  autoComplete="email" 
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-150 ease-in-out hover:shadow-md"
                  placeholder="e.g., you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-150 ease-in-out hover:shadow-md"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-indigo-400/60"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-indigo-700 text-white p-8 sm:p-10 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-semibold mb-8">Contact Information</h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Alternatively, you can reach us directly through the following channels. We aim to respond to all queries within 24 business hours.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-indigo-300 mr-4 flex-shrink-0 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <div>
                  <h3 className="text-xl font-medium">Email Us</h3>
                  <a href="mailto:support@appointmentsys.com" className="text-indigo-200 hover:text-white hover:underline transition-colors">support@appointmentsys.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-indigo-300 mr-4 flex-shrink-0 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div>
                  <h3 className="text-xl font-medium">Call Us</h3>
                  <a href="tel:+1234567890" className="text-indigo-200 hover:text-white hover:underline transition-colors">+1 (234) 567-890 (Mon-Fri, 9am-5pm)</a>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-indigo-300 mr-4 flex-shrink-0 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <h3 className="text-xl font-medium">Our Office</h3>
                  <p className="text-indigo-200">123 Innovation Drive<br/>Tech City, CA 90210, USA</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
