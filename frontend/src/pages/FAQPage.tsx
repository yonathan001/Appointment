import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl border border-slate-200/80">
      <dt>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-left w-full flex justify-between items-center p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 rounded-lg"
          aria-expanded={isOpen}
        >
          <span className="text-lg font-semibold text-indigo-700 hover:text-indigo-800 transition-colors">{question}</span>
          <span className="ml-6 h-7 flex items-center text-indigo-500">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            )}
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="p-6 pt-0">
          <p className="text-slate-600 leading-relaxed">
            {answer}
          </p>
        </dd>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  // Initialize first FAQ item as open by default, if desired
  // For this, you'd need to manage open states in the parent or pass an initialOpen prop.
  // For simplicity, keeping all closed by default here.
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Register" or "Get Started Free" button on our homepage. Fill in the required details, choose your role (client or staff), and you\'ll be all set! If you are an admin, please contact support for setup.',
    },
    {
      question: 'What types of appointments can I schedule?',
      answer: 'AppointmentSys is versatile! You can schedule various types of appointments, from client consultations and service bookings to team meetings and resource allocations. Our system is customizable to fit your specific needs.',
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Currently, AppointmentSys is a web-based platform, fully responsive and accessible on all devices including desktops, tablets, and smartphones. We are exploring options for dedicated mobile apps in the future.',
    },
    {
      question: 'How does the automated reminder system work?',
      answer: 'Our system can send automated email and SMS reminders to both clients and staff members before their scheduled appointments. You can customize the timing and content of these reminders to minimize no-shows.',
    },
    {
      question: 'Can I integrate AppointmentSys with other tools?',
      answer: 'We are continuously working on expanding our integration capabilities. Please check our "Services" page or contact our support team for the latest list of supported integrations.',
    },
    {
      question: 'What are the pricing plans?',
      answer: 'We offer various pricing plans tailored to different needs, including a free tier for basic use. For detailed information on our plans and features, please visit our (soon-to-be-created) Pricing page or contact sales.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-128px)] selection:bg-indigo-500 selection:text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-600 text-white py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto">
            Have questions? We've got answers. Explore our FAQ to find solutions to common inquiries about AppointmentSys.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <dl className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQPage;
