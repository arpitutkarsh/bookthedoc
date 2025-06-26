import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import AboutHome from '../components/AboutHome'
import Whychooseus from '../components/Whychooseus'
import TopDoctors from '../components/TopDoctors'

function Home() {
  return (
    <div>
      <Header />
      <AboutHome />
      <SpecialityMenu />
      <Whychooseus />
      <TopDoctors />
    </div>
  )
}

export default Home