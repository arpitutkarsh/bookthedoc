import React, { useContext } from 'react'
import {assets} from "../assets/assets/assets_frontend/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
function Navbar() {
    const navigate = useNavigate()
    //when the user gets logged in we will display the profile picture of the user and also display a drop down
    const [showMenu, setShowMenu] = useState(false)

    const {accessToken, setAccessToken, refreshToken, setRefreshToken, userData} = useContext(AppContext)
    const logout = () => {
        setAccessToken(false)
        setRefreshToken(false)
        localStorage.removeItem('userAccessToken')
        localStorage.removeItem('userRefreshToken')

    }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 ml-1 mr-1 border-b bg-[#FAF9F6] border-b-gray-600'>
        
        <img onClick={() => navigate('/')} className='w-20 ml-10 h-20 cursor-pointer' src={assets.logo} alt='Logo'/>
        
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to = '/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to='/doctors'>
                <li className='py-1'>Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to='/about'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
            </NavLink>

            <NavLink to='/contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center'>
            {
                accessToken && userData ? <div className='flex items-center gap-2 group relative cursor-pointer'> 
                    <img className='w-2.5 ' src={assets.dropdown_icon} />
                    <img className='w-8 rounded-full mr-5' src= {userData.image} />
                    
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='mt-5 min-w-48 bg-gray-200 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> : <button onClick={() => navigate('/login')} className='bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            }
            
        </div>
    </div>
  )
}

export default Navbar