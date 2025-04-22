// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { bookAppointment } from '../Features/appointments/appointmentSlice';
// import { nanoid } from '@reduxjs/toolkit';
// import { markSlotBooked } from '../Features/appointments/slotSlice';
// import girl from '../Components/Images/girl.jpg'


// const AppointmentForm = () => {
//     const [name, setName] = useState('');
//     const [batch, setBatch] = useState('');
//     const [selectedSlotId, setSelectedSlotId] = useState('');

//     const dispatch = useDispatch();

//     // const slots = useSelector(state =>
//     //     state.slots.list.filter(slot => {
//     //         if (slot.isBooked) return false;
//     //         const slotDateTime = new Date(`${slot.date}T${slot.time}`);
//     //         const now = new Date();
//     //         return slotDateTime > now;
//     //     })
//     // );

//     // const slots = (JSON.parse(localStorage.getItem("availableSlots")) || []).filter(slot => {
//     //     if (slot.isBooked) return false;
//     //     const slotDateTime = new Date(`${slot.date}T${slot.time}`);
//     //     return slotDateTime > new Date();
//     // });


//     // const slots = useSelector(state =>
//     //     state.slots.list.filter(slot => {
//     //         if (slot.isBooked) return false;

//     //         const slotDateTime = new Date(`${slot.date} ${slot.time}`);
//     //         return slotDateTime > new Date();
//     //     })
//     // );

//     const slots = useSelector(state => {
//         const allSlots = state.slots.list;
//         const appointments = state.appointments.list;

//         return allSlots.filter(slot => {
//             const slotDateTime = new Date(`${slot.date} ${slot.time}`);
//             if (slotDateTime <= new Date()) return false;

//             const isBooked = slot.isBooked;
//             const isBookedByCurrentUser = appointments.some(
//                 appt => appt.slotId === slot.id && appt.name === name
//             );

//             const hasActiveAppointment = appointments.some(
//                 appt => appt.slotId === slot.id
//             );
//             // Show slot if it's not booked or it's booked by this user
//             // return !isBooked || isBookedByCurrentUser;


//             return !isBooked || isBookedByCurrentUser || hasActiveAppointment;
//         });
//     });

//     const appointments = useSelector(state => state.appointments.list);

//     const handleSubmit = e => {
//         e.preventDefault();

//         if (!name || !batch || !selectedSlotId) {
//             alert('All fields are required');
//             return;
//         }

//         const selectedSlot = slots.find(slot => slot.id.toString() === selectedSlotId);
//         if (!selectedSlot) {
//             alert('Invalid slot selected');
//             return;
//         }


//         const alreadyBooked = appointments.some(
//             (appt) => appt.name === name && appt.date === selectedSlot.date
//         );

//         if (alreadyBooked) {
//             alert("You have already booked an appointment for this date.");
//             return;
//         }

//         const newAppointment = {
//             id: nanoid(),
//             name,
//             batch,
//             date: selectedSlot.date,
//             time: selectedSlot.time,
//             slotId: selectedSlot.id,
//         };

//         dispatch(bookAppointment(newAppointment));
//         dispatch(markSlotBooked(selectedSlot.id));

//         alert('Appointment booked successfully!');
//         setName('');
//         setBatch('');
//         setSelectedSlotId('');
//     };




//     // const handleSubmit = e => {
//     //     e.preventDefault();
//     //     if (!name || !batch || !selectedSlotId) {
//     //         alert('All fields are required');
//     //         return;
//     //     }

//     //     const selectedSlot = slots.find(slot => slot.id.toString() === selectedSlotId);
//     //     if (!selectedSlot) {
//     //         alert('Invalid slot selected');
//     //         return;
//     //     }

//     //     const newAppointment = {
//     //         id: nanoid(),
//     //         name,
//     //         batch,
//     //         date: selectedSlot.date,
//     //         time: selectedSlot.time,
//     //         slotId: selectedSlot.id,
//     //     };

//     //     dispatch(bookAppointment(newAppointment));
//     //     dispatch(markSlotBooked(selectedSlot.id));

//     //     alert('Appointment booked successfully!');
//     //     setName('');
//     //     setBatch('');
//     //     setSelectedSlotId('');
//     // };

//     return (
//         <div className="min-h-screen flex md:flex-row justify-center items-center gap-12 px-4 py-8 md:px-8 lg:px-28">
//             <form
//                 onSubmit={handleSubmit}
//                 className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-lg flex flex-col gap-4"
//             >
//                 <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-800">Appointment Form</h1>

//                 <div className="flex flex-col gap-1">
//                     <label htmlFor="name" className="font-semibold text-sm md:text-base text-purple-900">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         className="border rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
//                         placeholder="Enter your name"
//                         autoFocus
//                     />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <label htmlFor="batch" className="font-semibold text-sm md:text-base text-purple-900">Batch</label>
//                     <select
//                         id="batch"
//                         value={batch}
//                         onChange={e => setBatch(e.target.value)}
//                         className="border rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
//                     >
//                         <option value="">Select Batch</option>
//                         <option value="dsa">DSA</option>
//                         <option value="dev">Web Dev</option>
//                     </select>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <label className="font-semibold text-sm md:text-base text-purple-900">Select Slot</label>
//                     <select
//                         className="border rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
//                         value={selectedSlotId}
//                         onChange={e => setSelectedSlotId(e.target.value)}
//                     >
//                         <option value="">Select Date & Time</option>
//                         {slots.map(slot => (
//                             <option key={slot.id} value={slot.id}>
//                                 {slot.date} - {slot.time}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2 rounded-lg transition text-sm md:text-base"
//                 >
//                     Submit
//                 </button>
//             </form>

//             <div className="w-1/2 hidden md:block">
//                 <img
//                     src={girl}
//                     alt="girl"
//                     className="w-full max-w-sm md:max-w-md h-[500px] rounded-2xl"
//                 />
//             </div>
//         </div>
//     );
// };

// export default AppointmentForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment, userDeleteAppointment } from '../Features/appointments/appointmentSlice';
import { markSlotBooked } from '../Features/appointments/slotSlice';
import { nanoid } from '@reduxjs/toolkit';
import girl from '../Components/Images/girl.jpg';

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const dispatch = useDispatch();

  const appointments = useSelector((state) => state.appointments.list);
  const allSlots = useSelector((state) => state.slots.list);

  const slots = allSlots.filter((slot) => {
    const slotDateTime = new Date(`${slot.date} ${slot.time}`);
    if (slotDateTime <= new Date()) return false;

    const isBookedByCurrentUser = appointments.some(
      (appt) => appt.slotId === slot.id && appt.name === name
    );
    const hasActiveAppointment = appointments.some(
      (appt) => appt.slotId === slot.id
    );
    return !slot.isBooked || isBookedByCurrentUser || hasActiveAppointment;
  });

  const userAppointments = appointments.filter((appt) => appt.name === name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !batch || !selectedSlotId) {
      alert('All fields are required');
      return;
    }

    const selectedSlot = slots.find(slot => slot.id.toString() === selectedSlotId);
    if (!selectedSlot) {
      alert('Invalid slot selected');
      return;
    }

    const alreadyBooked = appointments.some(
      (appt) => appt.name === name && appt.date === selectedSlot.date
    );

    if (alreadyBooked) {
      alert("You have already booked an appointment for this date.");
      return;
    }

    const newAppointment = {
      id: nanoid(),
      name,
      batch,
      date: selectedSlot.date,
      time: selectedSlot.time,
      slotId: selectedSlot.id,
    };

    dispatch(bookAppointment(newAppointment));
    dispatch(markSlotBooked(selectedSlot.id));

    alert('Appointment booked successfully!');
    setSelectedSlotId('');
  };

  const handleDelete = (id) => {
    dispatch(userDeleteAppointment(id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-12 px-4 py-8 md:px-8 lg:px-28 mt-16">
      <div className="flex flex-col md:flex-row gap-12 w-full justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-lg flex flex-col gap-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-800">Appointment Form</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-sm md:text-base text-purple-900">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="batch" className="font-semibold text-sm md:text-base text-purple-900">Batch</label>
            <select
              id="batch"
              value={batch}
              onChange={e => setBatch(e.target.value)}
              className="border rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select Batch</option>
              <option value="dsa">DSA</option>
              <option value="dev">Web Dev</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm md:text-base text-purple-900">Select Slot</label>
            <select
              className="border rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={selectedSlotId}
              onChange={e => setSelectedSlotId(e.target.value)}
            >
              <option value="">Select Date & Time</option>
              {slots.map(slot => (
                <option key={slot.id} value={slot.id}>
                  {slot.date} - {slot.time}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold p-2 rounded-lg transition text-sm md:text-base"
          >
            Submit
          </button>
        </form>

        <div className="w-1/2 hidden md:block">
          <img
            src={girl}
            alt="girl"
            className="w-full max-w-sm md:max-w-md h-[500px] rounded-2xl"
          />
        </div>
      </div>

      {/* Booked Appointments Below Form */}
      {userAppointments.length > 0 && (
        <div className='w-full mt-10 px-6 md:px-12'>
          <h2 className='text-xl md:text-2xl font-bold text-center mb-6 text-purple-800'>Your Booked Appointments</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {userAppointments.map(appt => (
              <div key={appt.id} className='bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg text-white/10'>
                <p className='font-semibold'>{appt.date}</p>
                <p className='text-sm text-gray-300'>{appt.time}</p>
                <p className='text-sm text-gray-300 capitalize'>{appt.batch}</p>
                <button
                  onClick={() => handleDelete(appt.id)}
                  className='mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
