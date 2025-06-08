import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-10 pb-6 shadow-inner mt-auto">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Use max-width for large screens, but allow flexibility */} 
        {/* Adjusted to use a more standard max-width approach that is responsive but caps at a certain point, similar to 80% on very large screens but better for typical ones. Or, for a strict 80%: <div className="w-4/5 mx-auto px-4"> */}
        <div className="w-full lg:w-9/10 mx-auto px-2 sm:px-4"> {/* This div will control the 80% width and centering for the grid below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">About Us</h5>
            <p className="text-sm text-gray-400">
              AppointmentSys provides a seamless way to book and manage your appointments online. Our mission is to simplify scheduling for everyone.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li> {/* Example link */}
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Socials</h5>
            <div className="flex space-x-4">
              {/* Replace # with actual social media links */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* Placeholder for Facebook Icon - Consider using an icon library like react-icons */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* Placeholder for Twitter Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* Placeholder for Instagram Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 016.343 4.668a4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C11.532 2.013 11.886 2 12.315 2zm0 .987c-2.307 0-2.622.01-3.545.057-.96.046-1.503.206-1.957.388-.474.19-.824.426-1.15.752a3.902 3.902 0 00-.752 1.15c-.182.454-.342.997-.388 1.957-.047.923-.057 1.238-.057 3.545s.01 2.622.057 3.545c.046.96.206 1.503.388 1.957.19.474.426.824.752 1.15a3.902 3.902 0 001.15.752c.454.182.997.342 1.957.388.923.047 1.238.057 3.545.057s2.622-.01 3.545-.057c.96-.046 1.503-.206 1.957-.388.474-.19.824-.426 1.15-.752a3.902 3.902 0 00.752-1.15c.182-.454.342-.997-.388-1.957.047-.923.057-1.238.057-3.545s-.01-2.622-.057-3.545c-.046-.96-.206-1.503-.388-1.957a3.902 3.902 0 00-.752-1.15 3.902 3.902 0 00-1.15-.752c-.454-.182-.997-.342-1.957-.388-.923-.047-1.238-.057-3.545-.057zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.28a3.145 3.145 0 110-6.29 3.145 3.145 0 010 6.29zm5.665-9.655a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="text-center">
          <p className="text-sm text-gray-400">
           Copyright &copy; {new Date().getFullYear()} All rights Reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Powered by 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;