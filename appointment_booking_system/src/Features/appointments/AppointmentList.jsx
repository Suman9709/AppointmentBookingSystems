import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { removeAppointment } from './appointmentSlice';

const AppointmentList = () => {

    const appointments = useSelector(state => state.appointments.list)
    const dispatch = useDispatch();
    return (
        <div className='mt-20'>
            <div>
                <h1>Appointment list</h1>
            </div>
            <ul>
                {
                    appointments.map(appointment => (
                        <li key={appointment.id}>
                            {appointment.name} - {appointment.batch} - {appointment.date} - {appointment.time}
                            {/* <button onClick={() => dispatch(removeAppointment(appointment))}>remove</button> */}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AppointmentList