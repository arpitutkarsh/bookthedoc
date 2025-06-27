import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {
    const navigate = useNavigate()
  return (
    <div className='flex bg-blue-700 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 md:mx-10 mb-2'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-21 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Connecting you to care, Effortlessly</p>
                <p className='mt-5' >Book Appointment with 100% Trusted Doctors</p>
                
            </div>
            <button onClick={() => {navigate('/login'); scrollTo(0,0)}} className='flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2 w-fit rounded-full mt-10 hover:bg-gray-100 hover:text-orange-500 transition-all duration-200 hover:translate-y-[-2px]'>Create Account</button>

        </div>
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute border-0 right-0 max-w-md' src={assets.appointment_img}/>
        </div>
    </div>
  )
}

export default Banner