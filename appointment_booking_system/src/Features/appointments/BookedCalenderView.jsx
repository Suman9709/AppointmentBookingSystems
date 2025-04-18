import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDeleteAppointment } from './appointmentSlice';

const BookedCalenderView = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.list);

  const groupByDate = appointments.reduce((acc, appointment) => {
    const { date } = appointment;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupByDate).sort();

  return (
    <div className='mt-20 px-6 md:px-12'>
      <h1 className='text-3xl font-bold text-center mb-10'>📅 Booked Slot Calendar</h1>

      {sortedDates.length === 0 ? (
        <p className="text-center text-gray-400">No appointments booked yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {sortedDates.map((date) => (
            <div key={date} className='border rounded-xl shadow-md p-4 bg-white/10 backdrop-blur-md'>
              <h3 className='text-lg font-semibold text-cyan-700 mb-3 text-center'>{date}</h3>
              <ul className='space-y-2'>
                {groupByDate[date].map((slot) => (
                  <li
                    key={slot.id}
                    className='flex flex-col bg-white/20 rounded p-2 text-sm  shadow-sm'
                  >
                    <span className='font-medium'>{slot.name}</span>
                    <span className='text-gray-300 capitalize'>{slot.batch}</span>
                    <span className='text-gray-300'>{slot.time}</span>
                    <button
                      onClick={() => dispatch(userDeleteAppointment(slot.id))}
                      className='bg-red-600 hover:bg-red-700 border border-red-500 px-3 py-1 text-white rounded'>
                      Delete
                    </button>
                
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedCalenderView;
