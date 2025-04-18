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
        <nav className='w-full h-16 bg-cyan-500 flex justify-between px-4 md:px-8 items-center fixed top-0 z-50'>
            <h1 className='text-xl md:text-2xl text-white font-bold'>Book Your Appointment</h1>

            {/* Hamburger for mobile */}
            <button
                className='md:hidden text-white focus:outline-none'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Desktop menu */}
            <ul className='hidden md:flex space-x-4 lg:space-x-6 text-white font-medium items-center'>
                {role === 'admin' ? (
                    <>
                        <li><Link to="/adminform" className="hover:underline px-2 py-1">Admin Form</Link></li>
                        <li><Link to="/admincalender" className="hover:underline px-2 py-1">Admin Calendar</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" className="hover:underline px-2 py-1">Home</Link></li>
                        <li><Link to="/book" className="hover:underline px-2 py-1">Book</Link></li>
                        <li><Link to="/bookedcalender" className="hover:underline px-2 py-1">Calendar</Link></li>
                    </>

                )}
                {isAuthenticated && (
                    <li>
                        <button
                            onClick={handleLogout}
                            type="button"
                            className="hover:underline px-2 py-1 text-white"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className='md:hidden absolute top-16 left-0 right-0 bg-cyan-600 shadow-lg'>
                    <ul className='flex flex-col space-y-2 p-4 text-white font-medium items-center '>
                        {role === 'admin' ? (

                            <>
                                <li><Link to="/adminform" className="block hover:bg-cyan-500 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Admin Form</Link></li>
                                <li><Link to="/admincalender" className="block hover:bg-cyan-500 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Admin Calendar</Link></li>
                            </>

                        ) : (
                            <>
                                <li><Link to="/" className="block hover:bg-cyan-500 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                                <li><Link to="/book" className="block hover:bg-cyan-500 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Book</Link></li>
                                <li><Link to="/bookedcalender" className="block hover:bg-cyan-500 px-4 py-2 rounded" onClick={() => setIsMenuOpen(false)}>Calendar</Link></li>
                            </>
                        )}
                        {isAuthenticated && (
                            <li>
                                <button
                                    onClick={(e) => {
                                        handleLogout(e);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block hover:bg-cyan-500 px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
