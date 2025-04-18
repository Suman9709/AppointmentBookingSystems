import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppointmentList from './Features/appointments/appointmentList'
import NavBar from './Components/NavBar'
import BookedCalenderView from './Features/appointments/BookedCalenderView'
import AdminslotForm from './Features/appointments/AdminslotForm'
import AdmincalendarView from './Features/appointments/AdmincalenderView'
import LoginPage from './Features/appointments/LoginPage'
import SignUp from './Features/appointments/SignUp'
import AppointmentForm from './Features/appointments/AppointmentForm'

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />

          {/* All Admin Routes */}
          <Route path='/adminform' element={<AdminslotForm />} />
          <Route path='/admincalender' element={<AdmincalendarView />} />

          {/* All User Routes */}
          <Route path='/book' element={<AppointmentForm />} />
          <Route path='/appointments' element={<AppointmentList />} />
          <Route path='/bookedcalender' element={<BookedCalenderView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
