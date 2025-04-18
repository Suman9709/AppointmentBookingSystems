import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedAppointment = JSON.parse(localStorage.getItem('bookedAppointments'))|| []
const initialState = {
    list: savedAppointment,
};


const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        bookAppointment: (state, action) => {
            const alreadyBooked = state.list.some(
                (appoint) =>
                    appoint.name === action.payload.name &&
                    appoint.date === action.payload.date &&
                    appoint.batch === action.payload.batch
            );
        
            if (alreadyBooked) {
                alert("You have already booked an appointment for this date.");
                return;
            }
        
            const newAppointment = {
                id: action.payload.id || nanoid(),
                name: action.payload.name,
                batch: action.payload.batch,
                date: action.payload.date,
                time: action.payload.time,
                slotId: action.payload.slotId,
                status: 'pending',
            };
        
            state.list.push(newAppointment);
            localStorage.setItem('bookedAppointments', JSON.stringify(state.list));
        },
        
          
        confirmAppointment: (state, action) => {
            const appointment = state.list.find(appoint => appoint.id === action.payload);
            if (appointment) {
                appointment.status = "confirmed"
                localStorage.setItem('bookedAppointments', JSON.stringify(state.list))
            }
           
        },
        rejectAppointment: (state, action) => {
            const appointment = state.list.find(appt => appt.id === action.payload);
            if (appointment) {
                appointment.status = "rejected"
                localStorage.setItem('bookedAppointments', JSON.stringify(state.list))
            }
        },

        userDeleteAppointment :(state, action)=>{
            state.list = state.list.filter(appoint=> appoint.id !== action.payload);
            localStorage.setItem('bookedAppointments', JSON.stringify(state.list))
        }
    },
});

export const { bookAppointment, confirmAppointment, rejectAppointment,userDeleteAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;