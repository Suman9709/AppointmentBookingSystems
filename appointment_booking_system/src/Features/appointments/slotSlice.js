import { createSlice, nanoid } from "@reduxjs/toolkit";


const availabelSlot = JSON.parse(localStorage.getItem('availableSlots')) || []
const initialState = {
    list: availabelSlot
}
const slotSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {
        addSlot: (state, action) => {

            const newSlots = {
                
                    id: nanoid(), // Generate a unique ID
                    name: action.payload.name || '', // Name of the admin/user (optional)
                    date: action.payload.date, // Date of the slot
                    time: action.payload.time, // Human-readable time (e.g., 10:30 AM)
                    time24: action.payload.time24, // 24-hour format time (e.g., 10:30)
                    duration: action.payload.duration, // Duration of the slot
                    from: action.payload.from, // Start time as ISO string
                    to: action.payload.to, // End time as ISO string
                    isBooked: false, // Initially the slot is not booked
            };
            state.list.push(newSlots)
            localStorage.setItem('availableSlots', JSON.stringify(state.list)) 
        },
        markSlotBooked: (state, action) => {
            // const slot = state.list.find(slot => slot.id === action.payload)

            // if (slot) {
            //     slot.isBooked = true
            //     localStorage.setItem('availableSlots', JSON.stringify(state.list))
            // }
             // Remove the slot from the list
             state.list = state.list.filter(slot => slot.id !== action.payload);
             localStorage.setItem('availableSlots', JSON.stringify(state.list));
        },
        unmarkSlotBooked: (state, action) => {
            const slot = state.list.find(slot => slot.id === action.payload);
            if (slot) {
                slot.isBooked = false;
                localStorage.setItem('availableSlots', JSON.stringify(state.list));
            }
        },
        removeSlot: (state, action) => {
            state.list.splice(action.payload, 1);
        },
    },
});

export const { markSlotBooked, addSlot, unmarkSlotBooked, removeSlot } = slotSlice.actions;
export default slotSlice.reducer;