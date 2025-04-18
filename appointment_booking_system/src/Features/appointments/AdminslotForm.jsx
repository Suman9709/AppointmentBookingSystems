import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSlot } from './slotSlice'

const AdminslotForm = () => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const dispatch = useDispatch()
    const slots = useSelector(state => state.slots.list)

    const handleAdminForm = (e) => {
        e.preventDefault()
        if (!date || !time) {
            alert("Both date and time are required")
            return
        }

        const selectDateTime = new Date(`${date}T${time}`)
        const now = new Date()

        if (selectDateTime < now) {
            alert("You can not set slot for past date/time!")
            return
        }

        const duplicateSlot = (slots || []).some(slot => 
            slot.date === date && 
            slot.time === new Date(`${date}T${time}`).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        );

        if (duplicateSlot) {
            alert("This slot already exists")
            return
        }

        // Format time to 12-hour format before saving
        const formattedTime = selectDateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })

        dispatch(addSlot({ date, time: formattedTime }))
        setDate('')
        setTime('')
        alert("Slot added successfully!")
    }

    return (
        <div className='mt-20 flex flex-col items-center'>
            <h1 className='text-3xl font-semibold mb-6'>Admin Slot Form</h1>

            <form
                onSubmit={handleAdminForm}
                className='flex flex-col gap-4 w-full max-w-md  p-6 border rounded bg-white/10 backdrop-blur-lg shadow-lg'
            >
                <div className='flex flex-col'>
                    <label htmlFor="date" className='font-medium'>Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='border rounded p-2'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="time" className='font-medium'>Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className='border rounded p-2'
                    />
                </div>

                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold'
                >
                    Add Slot
                </button>
            </form>

            {/* Display added slots */}
            <div className='mt-10 w-1/4'>
                <h2 className='text-xl font-bold mb-3'>Available Slots</h2>
                {!slots || slots.length === 0 ? (
                    <p>No slots added yet.</p>
                ) : (
                    <ul className='list-disc pl-5'>
                        {slots.map((slot) => (
                            <li key={slot.id} className='mb-1'>
                                {slot.date} - {slot.time}{" "}
                                {slot.isBooked && (
                                    <span className='text-red-600 font-semibold'>(Booked)</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default AdminslotForm
