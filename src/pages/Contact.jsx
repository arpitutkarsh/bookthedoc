import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>Contact <span className='text-gray-700 font-semibold'>Us</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg '>Our Office</p>
          <p>Aurangabad, Bihar, 824101</p>
          <p>Tel: (+91)-1234567890 <br /> support@findthedoc.in</p>
          <p className='font-semibold'>Careers @findtheDoc</p>
          <p>Learn more  about our teams and job openings here</p>
          <button className='border border-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact