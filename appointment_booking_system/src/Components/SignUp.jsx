import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../Features/appointments/AuthSlice';
import calender from '../Components/Images/cal.jpg'

const SignUp = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const handleSignup = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('all fields are required')
            return
        }
        dispatch(signUp({ name, username, password, role }));
        setName('')
        setUsername('')
        setPassword('')
        setRole('')

    }
    return (
        <div className='min-h-screen flex md:flex-row justify-center items-center gap-12 px-4 py-8 md:px-8 lg:px-28'>
            <div className='w-1/2 hidden md:block'>
                <img src={calender} alt="calender" />
            </div>
            <form onSubmit={handleSignup} className='bg-white bg-opacity-10 w-[90%] max-w-md backdrop-blur-xl rounded-2xl p-8 shadow-xl gap-6'>
                <h1 className='text-2xl font-bold text-center'>SignUp to continue Login!!</h1>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='mt-2 text-lg'>Name</label>
                    <input type="text"
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        className='border-1 p-3 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400 '
                        autoFocus
                    />
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="username" className='mt-2 text-lg'>Username</label>
                    <input type="text"
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your username'
                        className='border-1 p-3 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className=' mt-2 text-lg'>Password</label>
                    <input type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        className='border-1 p-3 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="role">Role</label>
                    <select
                        id='role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='border-1 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400 p-3'
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                </div>
                <button
                    type="submit"
                    className=" w-full mt-4 bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold p-2 rounded-lg shadow-lg"
                >
                    SignUp
                </button>
                <p className='text-center mt-4 '>Already have account  <Link to={'/'} className='hover:underline'>Login </Link> </p>
            </form>

        </div>
    )
}

export default SignUp