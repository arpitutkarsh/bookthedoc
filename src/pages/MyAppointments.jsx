import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function MyAppointments() {

  const {doctors} = useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 ml-5 mr-5 font-medium text-zinc-600 border-b-4'>My Appointments</p>
      <div>
        {doctors.slice(0,3).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 ml-5 mr-5 mb-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-amber-500' src={item.image} />
            </div>
            <div className='flex-1 text-sm text-black'>
              <p className='font-bold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-l mt-2'><span className='font-semibold underline'>Date and Time</span><span>: </span><span className='italic'>25 July, 2025 | 8:30 PM</span></p>
            </div>
            <div>

            </div>
            <div className='flex flex-col gap-3 justify-end'>
              <button className='text-xs font-semibold text-gray-700 text-center py-2 border rounded-full hover:bg-green-400 duration-500'>Pay Online</button>
              <button className='text-xs text-gray-700 text-center p-2 border rounded-full hover:bg-red-500 font-semibold transition-all duration-500'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments