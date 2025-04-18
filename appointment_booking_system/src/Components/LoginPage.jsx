import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/appointments/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import calender from '../Components/Images/cal.jpg'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('authUser'));
  // const role = storedUser?.role || '';
  const authUser = useSelector(state => state.auth.user);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));

  };

  useEffect(() => {
    if (authUser?.role === 'admin') {
      navigate('/adminform');
    } else if (authUser?.role === 'user') {
      navigate('/book');
    }
  }, [authUser, navigate]);


  return (
    <div className="min-h-screen flex md:flex-row justify-center items-center gap-12 px-4 py-8 md:px-8 lg:px-28">
      <div className='w-1/2 hidden md:block'>
        <img src={calender} alt="calender" />
      </div>
      <form
        onSubmit={handleLogin}
        className=" w-full md:w-1/3  bg-white bg-opacity-10 backdrop-blur-md shadow-lg p-8 rounded-2xl  flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center">Login to Book Your Appointment</h1>

        <div className="flex flex-col">
          <label htmlFor="username" className="mt-2 text-lg">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg bg-white bg-opacity-20  focus:outline-none focus:ring-2 focus:ring-purple-400 border-1"
            placeholder="Enter your username"
            autoFocus
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mt-2 text-lg">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400 border-1"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold py-2 rounded-lg shadow-lg"
        >
          Login
        </button>
        <p>Don't have account? <Link to={"/signUp"} className='hover:underline'>SignUp</Link> </p>
      </form>
    </div>
  );
};

export default LoginPage;
