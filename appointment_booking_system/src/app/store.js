import { configureStore } from "@reduxjs/toolkit";
import appointmentSReducer from '../Features/appointments/appointmentSlice'
import slotReducer from '../Features/appointments/slotSlice'
import authReducer from '../Features/appointments/AuthSlice'

export const store = configureStore({
    reducer: {
        appointments: appointmentSReducer,
        slots:slotReducer,
        auth:authReducer,
    },
})