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

    return (
        <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">Appointment System</h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        {role === 'admin' ? (
                            <>
                                <Link
                                    to="/adminform"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Admin Form
                                </Link>
                                <Link
                                    to="/admincalender"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Admin Calendar
                                </Link>
                            </>
                        ) : (
                            <>

                                <Link
                                    to="/"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Home
                                </Link>

                            </>
                        )}
                        {isAuthenticated && (

                            <>
                                <Link
                                    to="/book"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Book
                                </Link>
                                <Link
                                    to="/bookedcalender"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Calendar
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                            >
                                login
                            </Link>
                        )}

                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition duration-150"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {role === 'admin' ? (
                            <>
                                <Link
                                    to="/adminform"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50"
                                >
                                    Admin Form
                                </Link>
                                <Link
                                    to="/admincalender"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                                >
                                    Admin Calendar
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50"
                                >
                                    Home
                                </Link>

                            </>
                        )}
                        {!isAuthenticated && (
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                            >
                                login
                            </Link>
                        )}

                        {isAuthenticated && (
                            <>
                                <Link
                                    to="/book"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                                >
                                    Book
                                </Link>
                                <Link
                                    to="/bookedcalender"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                                >
                                    Calendar
                                </Link>

                                <button
                                    onClick={(e) => {
                                        handleLogout(e);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;