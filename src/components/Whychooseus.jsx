import React from 'react';
import { FaCalendarCheck, FaUserMd, FaVideo, FaBell } from 'react-icons/fa';

function Whychooseus() {
  const features = [
    {
      icon: <FaCalendarCheck className="text-white text-2xl" />,
      title: 'Easy Booking',
      desc: 'Book appointments in just a few clicks.',
    },
    {
      icon: <FaUserMd className="text-white text-2xl" />,
      title: 'Verified Doctors',
      desc: 'All doctors are certified and trusted.',
    },
    {
      icon: <FaVideo className="text-white text-2xl" />,
      title: 'Virtual Consults',
      desc: 'Consult online via secure Google Meet.',
    },
    {
      icon: <FaBell className="text-white text-2xl" />,
      title: 'Reminders & History',
      desc: 'Get appointment reminders and access records.',
    },
  ];

  return (
    <div className="bg-white py-16 px-6 md:px-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0096C7] mb-10">
        Why Choose Us?
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-64 p-6 bg-[#FAF9F6] rounded-2xl shadow-md hover:shadow-lg hover:bg-amber-200  transition-all duration-500"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-[#0096C7] flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#0096C7] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Whychooseus;
