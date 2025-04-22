// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addSlot } from '../Features/appointments/slotSlice';


// const AdminslotForm = () => {
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const dispatch = useDispatch();
//     const slots = useSelector(state => state.slots.list);

//     const handleAdminForm = (e) => {
//         e.preventDefault();
//         if (!date || !time) {
//             alert("Both date and time are required");
//             return;
//         }

//         const selectDateTime = new Date(`${date}T${time}`);
//         const now = new Date();

//         if (selectDateTime < now) {
//             alert("You cannot set slot for past date/time!");
//             return;
//         }

//         const duplicateSlot = (slots || []).some(slot => 
//             slot.date === date && 
//             slot.time === new Date(`${date}T${time}`).toLocaleTimeString([], {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true
//             })
//         );

//         if (duplicateSlot) {
//             alert("This slot already exists");
//             return;
//         }

//         const formattedTime = selectDateTime.toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//         });

//         dispatch(addSlot({ date, time: formattedTime }));
//         setDate('');
//         setTime('');
//         alert("Slot added successfully!");
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 mt-14">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

//                 <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
//                     <h1 className="text-2xl font-bold">Schedule New Appointment Slot</h1>
//                     <p className="text-blue-100 mt-1">Select date and time for availability</p>
//                 </div>


//                 <div className="p-6">
//                     <form onSubmit={handleAdminForm} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                             <div className="relative">
//                                 <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Select Date
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="date"
//                                         id="date"
//                                         value={date}
//                                         onChange={(e) => setDate(e.target.value)}
//                                         className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 appearance-none"
//                                     />
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                                 {date && (
//                                     <div className="mt-2 text-sm text-blue-600 font-medium">
//                                         Selected: {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="relative">
//                                 <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Select Time
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="time"
//                                         id="time"
//                                         value={time}
//                                         onChange={(e) => setTime(e.target.value)}
//                                         className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 appearance-none"
//                                     />
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                                 {time && (
//                                     <div className="mt-2 text-sm text-blue-600 font-medium">
//                                         Selected: {new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
//                             >
//                                 <div className="flex items-center">
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                     Add Time Slot
//                                 </div>
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* Slots List */}
//             <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//                 <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-800">Scheduled Availability</h2>
//                 </div>

//                 <div className="p-6">
//                     {!slots || slots.length === 0 ? (
//                         <div className="text-center py-8">
//                             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             <h3 className="mt-2 text-sm font-medium text-gray-900">No time slots</h3>
//                             <p className="mt-1 text-sm text-gray-500">Get started by adding a new time slot above.</p>
//                         </div>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Date
//                                         </th>
//                                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Time
//                                         </th>
//                                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Status
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {slots.map((slot) => (
//                                         <tr key={slot.id} className="hover:bg-gray-50">
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="text-sm font-medium text-gray-900">
//                                                     {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//                                                 </div>
//                                                 <div className="text-xs text-gray-500">
//                                                     {new Date(slot.date).toLocaleDateString('en-US', { year: 'numeric' })}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                 {slot.time}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {slot.isBooked ? (
//                                                     <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                                         Booked
//                                                     </span>
//                                                 ) : (
//                                                     <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                         Available
//                                                     </span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminslotForm;

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

