import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adminDeleteAppointment, confirmAppointment, rejectAppointment } from '../Features/appointments/appointmentSlice';

const AdmincalendarView = () => {
    const appointments = useSelector((state) => state.appointments.list);
    const dispatch = useDispatch();

    const groupedByDate = appointments.reduce((acc, appointment) => {
        const { date } = appointment;
        if (!acc[date]) acc[date] = [];
        acc[date].push(appointment);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedByDate).sort();

    return (
        <div className="p-6 mt-20">
            <h2 className="text-3xl font-semibold text-center text-cyan-700 mb-8">
                Admin: View & Manage Bookings
            </h2>

            {sortedDates.length === 0 ? (
                <p className="text-center text-gray-600">No appointments have been booked yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedDates.map((date) => (
                        <div
                            key={date}
                            className="bg-white/20 border border-gray-200 shadow-md rounded-lg p-4"
                        >
                            <h3 className="text-xl font-bold text-blue-700 mb-3">{date}</h3>
                            <ul className="space-y-3">
                                {groupedByDate[date].map((slot) => {
                                    const isFinalized = slot.status === 'confirmed' || slot.status === 'rejected';

                                    return (
                                        <li
                                            key={slot.id}
                                            className="p-3 border rounded bg-white/40 shadow-sm"
                                        >
                                            <p className="font-semibold">{slot.name}</p>
                                            <p className="text-sm">Time: {slot.time}</p>
                                            <p className="text-sm">Batch: {slot.batch}</p>

                                            <p className="text-sm font-medium">
                                                Status:{" "}
                                                <span
                                                    className={`font-semibold ${slot.status === 'confirmed'
                                                            ? 'text-green-600'
                                                            : slot.status === 'rejected'
                                                                ? 'text-red-600'
                                                                : 'text-yellow-600'
                                                        }`}
                                                >
                                                    {slot.status || 'pending'}
                                                </span>
                                            </p>

                                            <div className="mt-2 flex gap-2">
                                                <button
                                                    disabled={isFinalized}
                                                    onClick={() => dispatch(confirmAppointment(slot.id))}
                                                    className={`text-sm px-3 py-1 rounded ${isFinalized
                                                            ? 'bg-green-200 cursor-not-allowed'
                                                            : 'bg-green-500 text-white hover:bg-green-600'
                                                        }`}
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    disabled={isFinalized}
                                                    onClick={() => dispatch(rejectAppointment(slot.id))}
                                                    className={`text-sm px-3 py-1 rounded ${isFinalized
                                                            ? 'bg-red-200 cursor-not-allowed'
                                                            : 'bg-red-500 text-white hover:bg-red-600'
                                                        }`}
                                                >
                                                    Reject
                                                </button>
                                                <button onClick={() => dispatch(adminDeleteAppointment(slot.id))}
                                                    className='border-1 bg-red-500 rounded-lg p-2 text-white hover:bg-red-600'
                                                >


                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdmincalendarView;
