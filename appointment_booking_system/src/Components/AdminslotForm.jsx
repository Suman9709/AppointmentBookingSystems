import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSlot, removeSlot } from '../Features/appointments/slotSlice';

const AdminslotForm = () => {
    const [date, setDate] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const dispatch = useDispatch();
    const slots = useSelector(state => state.slots.list);

    const handleAdminForm = (e) => {
        e.preventDefault();
    
        if (!date || !fromTime || !toTime) {
            alert("All fields are required.");
            return;
        }
    
        const now = new Date();
        const startTime = new Date(`${date}T${fromTime}`);
        const endTime = new Date(`${date}T${toTime}`);
    
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            alert("Invalid date or time format.");
            return;
        }
    
        if (startTime >= endTime) {
            alert("End time must be after start time.");
            return;
        }
    
        if (startTime < now) {
            alert("You cannot set a slot in the past!");
            return;
        }
    
        const overlappingSlot = (slots || []).find(slot => {
            if (slot.date !== date) return false; 
        
            const existingStart = new Date(`${slot.date}T${slot.time24}`);
            const existingEnd = new Date(existingStart.getTime() + slot.duration * 60000);
        
            return (
                (startTime >= existingStart && startTime < existingEnd) || 
                (endTime > existingStart && endTime <= existingEnd) ||    
                (startTime <= existingStart && endTime >= existingEnd)     
            );
        });
        
        if (overlappingSlot) {
            const from = new Date(overlappingSlot.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const to = new Date(overlappingSlot.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            alert(`Cannot create a slot between ${from} and ${to}. Please choose a different time.`);
            return;
        }
        
        const isInvalidSlot = (slots || []).some(slot => {
            const existingTo = new Date(slot.to);
            return startTime >= existingTo;
        });
    
        if (isInvalidSlot) {
            alert("You cannot add a slot that starts after an existing slot ends.");
            return;
        }

        //duplicate time
        const isDuplicate = (slots || []).some(slot => {
            return slot.date === new Date(date).toISOString() && slot.time24 === fromTime;
        });
        
        if (isDuplicate) {
            alert("A slot with the same date and time already exists.");
            return;
        }

        const formattedTime = startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        const duration = Math.round((endTime - startTime) / 60000); 
        dispatch(addSlot({
            date: new Date(date).toISOString(),
            time: formattedTime,
            time24: fromTime,
            duration,
            from: startTime.toISOString(),
            to: endTime.toISOString(),
            isBooked: false
        }));
    
        setDate('');
        setFromTime('');
        setToTime('');
        alert("Slot added successfully!");
    };
    

    const handleDeleteSlot = (index) => {
        if (window.confirm("Are you sure you want to delete this slot?")) {
            dispatch(removeSlot(index));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-14">
            <div className="bg-white rounded-xl shadow-lg border">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                    <h1 className="text-2xl font-bold">Schedule New Appointment Slot</h1>
                    <p className="text-blue-100 mt-1">Select date, time, and duration</p>
                </div>
                <div className="p-6">
                    <form onSubmit={handleAdminForm} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">From Time</label>
                                <input
                                    type="time"
                                    value={fromTime}
                                    onChange={(e) => setFromTime(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To Time</label>
                                <input
                                    type="time"
                                    value={toTime}
                                    onChange={(e) => setToTime(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Add Time Slot
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg border">
                <div className="bg-gray-100 p-6 border-b">
                    <h2 className="text-lg font-semibold">Scheduled Availability</h2>
                </div>
                <div className="p-6 overflow-x-auto">
                    {!slots || slots.length === 0 ? (
                        <p className="text-gray-500 text-center">No time slots added yet.</p>
                    ) : (
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Time (From - To)</th>
                                    <th className="px-6 py-3">Duration</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot, index) => {
                                    const parsedDate = new Date(slot.date);
                                    const from = slot.from ? new Date(slot.from) : null;
                                    const to = slot.to ? new Date(slot.to) : null;

                                    const isDateValid = parsedDate instanceof Date && !isNaN(parsedDate);
                                    const isFromValid = from instanceof Date && !isNaN(from);
                                    const isToValid = to instanceof Date && !isNaN(to);

                                    return (
                                        <tr key={index} className="border-t">
                                            <td className="px-6 py-3">
                                                {isDateValid ? parsedDate.toLocaleDateString() : 'Invalid Date'}
                                            </td>
                                            <td className="px-6 py-3">
                                                {isFromValid && isToValid
                                                    ? `${from.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true
                                                    })} - ${to.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true
                                                    })}`
                                                    : 'Invalid Time'}
                                            </td>
                                            <td className="px-6 py-3">{slot.duration} min</td>
                                            <td className="px-6 py-3">
                                                {slot.isBooked ? (
                                                    <span className="text-red-600 font-medium">Booked</span>
                                                ) : (
                                                    <span className="text-green-600 font-medium">Available</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3">
                                                <button
                                                    onClick={() => handleDeleteSlot(index)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminslotForm;

