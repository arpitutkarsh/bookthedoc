import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import AboutHome from '../components/AboutHome'
import Whychooseus from '../components/Whychooseus'
import TopDoctors from '../components/TopDoctors'
import Working from '../components/Working'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Header />

      {/* 🎯 Virtual Appointment Banner 
      <div className="bg-[#1e3a8a] text-white py-10 px-6 text-center animate-pulse min-w-380 shadow-lg rounded-md ml-1 mr-1 mt-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Virtual Appointments Launching Soon!</h2>
        <p className="text-lg sm:text-xl font-medium">
          Consult your favorite doctors from the comfort of your home — anytime, anywhere.
        </p>
      </div>

      {/* 🏷️ SALE Banner 
      <div className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white py-12 px-6 text-center shadow-2xl rounded-lg mx-6 my-6 animate-pulse">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 uppercase">🩺 HealthBoost Mega Sale</h2>
        <p className="text-xl sm:text-2xl font-semibold">🔥 Flat 30% OFF on All Online Consultations</p>
        <p className="mt-2 text-lg sm:text-xl">Only on <span className="underline font-bold">1st August</span> – Book Your Doctor Now!</p>
      </div>
        */}
      <AboutHome />
      <SpecialityMenu />
      <Whychooseus />
      <TopDoctors />
      <Working />
      <Banner />
      
    </div>
  )
}

export default Home
