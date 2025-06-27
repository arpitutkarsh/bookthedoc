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