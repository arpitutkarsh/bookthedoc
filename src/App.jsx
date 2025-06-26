import React  from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Doctors from './pages/doctors'
import Login from './pages/Login'
import Contact from './pages/contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'

function App() {
  return (
    <>

      <div className='mx-4 sm:mx-[10%]'></div>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/doctors' element = {<Doctors />} />
        <Route path='/doctors/:speciality' element = {<Doctors />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/about' element = {<About />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/my-profile' element = {<MyProfile />} />
        <Route path='/my-appointments' element = {<MyAppointments />} />
        <Route path='/appointment/:docId' element = {<Appointments />} />
      </Routes>
    </>
  )
}

export default App
