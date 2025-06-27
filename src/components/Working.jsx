import React from 'react'
import { FaSearch, FaUserMd, FaClock, FaVideo } from 'react-icons/fa';
function Working() {
    const steps = [
    {
      icon: <FaSearch className="text-white text-2xl" />,
      title: '1. Search',
      desc: 'Find a doctor by specialty, name, or location.',
    },
    {
      icon: <FaUserMd className="text-white text-2xl" />,
      title: '2. Choose Consultation Type',
      desc: 'Select walk-in or secure online consultation.',
    },
    {
      icon: <FaClock className="text-white text-2xl" />,
      title: '3. Select Time Slot',
      desc: 'Pick a convenient time and confirm your booking.',
    },
    {
      icon: <FaVideo className="text-white text-2xl" />,
      title: '4. Connect & Consult',
      desc: 'Meet your doctor at the clinic or on Google Meet.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0096C7] mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-amber-300 duration-300"
            >
              <div className="w-16 h-16 bg-[#0096C7] rounded-full flex items-center justify-center mb-4 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#0096C7] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Working