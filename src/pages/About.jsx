import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { assets } from '../assets/assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

import { 
  FaCalendarCheck, 
  FaLaptopMedical, 
  FaMapMarkerAlt, 
  FaLock, 
  FaUserTie, 
  FaBaby, 
  FaUserClock 
} from 'react-icons/fa';

 // Replace with your actual image path
function About() {
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="bg-[#FAF9F6] px-6 md:px-20 py-16 text-gray-800">
      
      {/* IMAGE + TEXT SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20" data-aos="fade-up">
        <img src={assets.about_image} alt="About BookTheDoc" className="md:w-1/2 rounded-xl shadow-md" />
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-4xl font-bold text-amber-500 ">About BookTheDoc</h2>
          <p className="text-lg text-black">
            At <strong className='text-amber-400'><u>BookTheDoc</u></strong>, we’re building a world where <u>Healthcare</u> is seamless and stress-free.
            Whether you're booking a walk-in appointment or consulting a doctor virtually, we make it effortless.
          </p>
        </div>
      </div>

      {/* TAGLINE BOX */}
      <div 
        className="bg-amber-400 text-black text-center py-8 px-6 rounded-xl mb-20 shadow-lg"
        data-aos="zoom-in"
      >
        <h3 className="text-2xl md:text-3xl font-semibold mb-2">Connecting you to care, effortlessly</h3>
        <p className="text-lg italic">This isn’t just a tagline — it’s our promise.</p>
      </div>

      {/* WHAT MAKES US DIFFERENT */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-black text-center mb-10" data-aos="fade-up">What Makes Us Different</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: <FaCalendarCheck />, title: 'Instant Booking', desc: 'Real-time doctor availability, book in seconds.' },
            { icon: <FaLaptopMedical />, title: 'Virtual Consults', desc: 'See your doctor online through Google Meet.' },
            { icon: <FaMapMarkerAlt />, title: 'Nearby Clinics', desc: 'Location-based suggestions to help you faster.' },
            { icon: <FaLock />, title: 'Private & Secure', desc: 'Your data stays encrypted and confidential.' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-amber-400 p-6 rounded-xl shadow-md hover:scale-105 transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-green-700 text-3xl mb-3 mx-auto">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE SERVE */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-black text-center mb-10" data-aos="fade-up">Who We Serve</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <FaUserTie />, title: 'Busy Professionals', desc: 'Quick appointments and instant virtual consults.' },
            { icon: <FaBaby />, title: 'Parents', desc: 'Book pediatricians and family doctors with ease.' },
            { icon: <FaUserClock />, title: 'Senior Citizens', desc: 'Easier regular checkups and timely reminders.' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-amber-400 p-6 rounded-xl shadow-md text-center hover:scale-105 transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-black text-3xl mb-3 mx-auto">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST & CTA */}
      <div 
        className="bg-black p-10 rounded-xl shadow-lg text-center space-y-6 max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        <h4 className="text-xl font-bold text-amber-400 bg-ba">Trusted by Patients, Backed by Professionals</h4>
        <p className='text-white'>
          We’re proud to partner with verified doctors and clinics across regions — bringing both quality and
          convenience to your fingertips. Healthcare should be human, and we’re here to keep it that way.
        </p>

        <h4 className="text-xl font-bold text-amber-400">Ready to experience hassle-free healthcare?</h4>
        <p className='text-white'>
          Join thousands of users who trust <strong>BookTheDoc</strong> to take the stress out of staying healthy.
        </p>

        <button
  onClick={() => {
    navigate('/doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  className='bg-blue-600 text-white px-12 py-3 rounded-full mt-10 hover:bg-blue-700 transition'
>
  More
</button>
      </div>
    </div>
  );
}

export default About;
