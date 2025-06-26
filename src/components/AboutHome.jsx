import React from 'react'

function AboutHome() {
  return (
    <div className='bg-[#dbc788] px-6 md:px-16 lg:px-32 py-12 md:py-20'>
        <div className='max-w-6xl mx-auto text-center'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#0096C7] mb-2'>
                About Us
            </h2>
            <p className="text-lg text-gray-700 mt-0 mb-8">
                <span className="font-medium text-[#0096C7]">Connecting you to care, Effortlessly!</span>
            </p>
            <p className="text-base  text-gray-600 leading-relaxed mb-6">
                BookTheDoc is your one-stop platform for booking doctor appointments — online or offline.
                Whether you're looking for a walk-in consultation or a virtual visit, we make it easy, secure,
                and fast. Our platform is built to eliminate the hassle of finding doctors, managing schedules,
                and waiting in lines.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
                With a growing network of verified and trusted healthcare professionals, BookTheDoc empowers
                you to take control of your health. We believe care should be accessible, timely, and stress-free — and
                that's what we deliver.
            </p>
        </div>
    </div>
  )
}

export default AboutHome