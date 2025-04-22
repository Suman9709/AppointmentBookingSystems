import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Features/appointments/AuthSlice';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('authUser'));
    const role = user?.role || '';

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        alert("Logout successful");
        navigate("/");
    };

    const renderLinks = () => {
        if (isAuthenticated && role === 'admin') {
            return (
                <>
                    <Link to="/adminform" className="nav-link">Admin Form</Link>
                    <Link to="/admincalender" className="nav-link">Admin Calendar</Link>
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                </>
            );
        } else if (isAuthenticated && role === 'user') {
            return (
                <>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/book" className="nav-link">Appointment Form</Link>
                    {/* <Link to="/bookedcalender" className="nav-link">Calendar</Link> */}
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                </>
            );
        } else {
            return <Link to="/" className="nav-link">Login</Link>;
        }
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <h1 className="text-xl font-bold text-gray-800">Appointment System</h1>
                    <div className="hidden md:flex space-x-6 items-center">
                        {renderLinks()}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-800 focus:outline-none"
                        >
                            {isMenuOpen ? '✖' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
  <div className="md:hidden bg-white shadow-md rounded-b-lg px-6 py-4 space-y-3 transition-all duration-300 ease-in-out">
    {isAuthenticated && role === 'admin' ? (
      <>
        <Link
          to="/adminform"
          onClick={() => setIsMenuOpen(false)}
          className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
        >
          📝 Admin Form
        </Link>
        <Link
          to="/admincalender"
          onClick={() => setIsMenuOpen(false)}
          className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
        >
          📅 Admin Calendar
        </Link>
        <button
          onClick={(e) => {
            handleLogout(e);
            setIsMenuOpen(false);
          }}
          className="block w-full text-left text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition"
        >
          🚪 Logout
        </button>
      </>
    ) : isAuthenticated && role === 'user' ? (
      <>
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
        >
          🏠 Home
        </Link>
        <Link
          to="/book"
          onClick={() => setIsMenuOpen(false)}
          className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
        >
          🗓️ Appointment Form
        </Link>
        <Link
          to="/bookedcalender"
          onClick={() => setIsMenuOpen(false)}
          className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
        >
          📆 Calendar
        </Link>
        <button
          onClick={(e) => {
            handleLogout(e);
            setIsMenuOpen(false);
          }}
          className="block w-full text-left text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition"
        >
          🚪 Logout
        </button>
      </>
    ) : (
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className="block text-gray-800 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition"
      >
        🔑 Login
      </Link>
    )}
  </div>
)}

        </nav>
    );
};

export default NavBar;
