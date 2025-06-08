import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isFirst?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isFirst = false }) => {
  const [isOpen, setIsOpen] = useState(isFirst);

  return (
    <div className={`border-b border-gray-200 last:border-b-0 ${isOpen ? 'pb-4' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start text-left py-6 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-6 h-7 flex items-center text-gray-400">
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pr-12">
          <p className="text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-medium text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about our service.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-lg">
          <dl className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                isFirst={index === 0} 
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;