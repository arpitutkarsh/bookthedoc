import React from 'react';
import { assets } from '../assets/assets/assets_frontend/assets';

function Header() {
  return (
    <div className='flex flex-col md:flex-row bg-blue-700 rounded-lg px-6 md:px-10 lg:px-20'>
      
      {/* Left Side */}
      <div className='md:w-1/2 flex flex-col justify-center gap-6 py-10 md:py-[8vw]'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
          Connecting you to Care, <br /> Effortlessly
        </h1>

        <div className='flex flex-col md:flex-row items-center font-light gap-3'>
          <img src={assets.group_profiles} alt='Group' className='w-28 h-12 rounded-full' />
          <p className='text-white text-base'>
            Book appointments with trusted doctors — anytime, anywhere.
          </p>
        </div>

        <p className='text-white text-sm leading-relaxed'>
          Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
        </p>

        <a
          href='#speciality'
          
          className='flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2 w-fit rounded-md hover:bg-gray-100 hover:text-orange-500 transition-all duration-200'
        >
          Book Appointment
          <img src={assets.arrow_icon} alt='Arrow' className='w-4 h-4' />
        </a>
      </div>

      {/* Right Side */}
      <div className='md:w-1/2 flex items-center justify-center'>
        <img
          src={assets.header_img}
          alt='Header Visual'
          className='w-full h-auto rounded-lg object-contain'
        />
      </div>
    </div>
  );
}

export default Header;
