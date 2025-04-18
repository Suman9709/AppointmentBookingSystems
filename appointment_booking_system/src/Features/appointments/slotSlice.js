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
                id: nanoid(),
                name: action.payload.name,
                date: action.payload.date,
                time: action.payload.time,
                isBooked: false,
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
             // Update localStorage with new list
             localStorage.setItem('availableSlots', JSON.stringify(state.list));
        },
    },
});

export const { markSlotBooked, addSlot } = slotSlice.actions;
export default slotSlice.reducer;