// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'; // Keep if you have global app styles here, or remove if not needed

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-sky-600 text-white p-4 shadow-md">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link to="/" className="hover:bg-sky-700 px-3 py-2 rounded-md">Home</Link>
          </li>
          <li>
            <Link to="/login" className="hover:bg-sky-700 px-3 py-2 rounded-md">Login</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:bg-sky-700 px-3 py-2 rounded-md">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <main className="container mx-auto mt-6 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Add a catch-all route for 404 Not Found if desired */}
          {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
