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

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="bg-[#f0fdfa] px-6 md:px-20 py-16 text-gray-800 font-[Inter]">
      
      {/* IMAGE + TEXT SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20" data-aos="fade-up">
        <img src={assets.about_image} alt="About BookTheDoc" className="md:w-1/2 rounded-2xl shadow-2xl" />
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-4xl font-bold text-teal-600">About <span className='text-amber-500'>BookTheDoc</span></h2>
          <p className="text-lg text-slate-700">
            At <strong className='text-teal-500'><u>BookTheDoc</u></strong>, we’re building a world where <u>healthcare</u> is seamless and stress-free.
            Whether you're booking a walk-in appointment or consulting a doctor virtually, we make it effortless.
          </p>
        </div>
      </div>

      {/* TAGLINE BOX */}
      <div 
        className="bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-center py-8 px-6 rounded-2xl mb-20 shadow-lg"
        data-aos="zoom-in"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-2">Connecting you to care, effortlessly</h3>
        <p className="text-lg italic text-gray-800">This isn’t just a tagline — it’s our promise.</p>
      </div>

      {/* WHAT MAKES US DIFFERENT */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center text-slate-800 mb-10" data-aos="fade-up">What Makes Us Different</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: <FaCalendarCheck />, title: 'Instant Booking', desc: 'Real-time doctor availability, book in seconds.' },
            { icon: <FaLaptopMedical />, title: 'Virtual Consults', desc: 'See your doctor online through Google Meet.' },
            { icon: <FaMapMarkerAlt />, title: 'Nearby Clinics', desc: 'Location-based suggestions to help you faster.' },
            { icon: <FaLock />, title: 'Private & Secure', desc: 'Your data stays encrypted and confidential.' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-teal-100 p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-teal-600 text-4xl mb-3 mx-auto">{item.icon}</div>
              <h4 className="font-semibold text-lg text-slate-700 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE SERVE */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-slate-800 text-center mb-10" data-aos="fade-up">Who We Serve</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <FaUserTie />, title: 'Busy Professionals', desc: 'Quick appointments and instant virtual consults.' },
            { icon: <FaBaby />, title: 'Parents', desc: 'Book pediatricians and family doctors with ease.' },
            { icon: <FaUserClock />, title: 'Senior Citizens', desc: 'Easier regular checkups and timely reminders.' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-yellow-100 p-6 rounded-xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="text-amber-500 text-4xl mb-3 mx-auto">{item.icon}</div>
              <h4 className="font-semibold text-lg text-slate-700 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST & CTA */}
      <div 
        className="bg-gradient-to-r from-teal-700 to-teal-900 p-10 rounded-2xl shadow-lg text-center space-y-6 max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        <h4 className="text-xl font-bold text-amber-300">Trusted by Patients, Backed by Professionals</h4>
        <p className='text-white'>
          We’re proud to partner with verified doctors and clinics across regions — bringing both quality and
          convenience to your fingertips. Healthcare should be human, and we’re here to keep it that way.
        </p>

        <h4 className="text-xl font-bold text-amber-300">Ready to experience hassle-free healthcare?</h4>
        <p className='text-white'>
          Join thousands of users who trust <strong>BookTheDoc</strong> to take the stress out of staying healthy.
        </p>

        <button
          onClick={() => {
            navigate('/doctors');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className='bg-amber-400 hover:bg-amber-500 text-black px-12 py-3 rounded-full mt-6 font-semibold transition shadow-md'
        >
          Explore Doctors
        </button>
      </div>
    </div>
  );
}

export default About;
