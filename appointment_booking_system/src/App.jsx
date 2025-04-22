import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppointmentList from './Components/AppointmentList'
import NavBar from './Components/NavBar'

import AdmincalendarView from './Components/AdmincalenderView'

import AppointmentForm from './Components/AppointmentForm'
import LoginPage from './Components/LoginPage'
import SignUp from './Components/SignUp'
import AdminslotForm from './Components/AdminslotForm'
import BookedCalenderView from './Components/BookedCalenderView'

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
          {/* <Route path='/bookedcalender' element={<BookedCalenderView />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
