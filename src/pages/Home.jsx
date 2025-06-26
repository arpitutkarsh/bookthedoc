import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import AboutHome from '../components/AboutHome'
import Whychooseus from '../components/Whychooseus'

function Home() {
  return (
    <div>
      <Header />
      <AboutHome />
      <SpecialityMenu />
      <Whychooseus />
    </div>
  )
}

export default Home