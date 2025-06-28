import React, { useState } from 'react'
import {assets} from '../assets/assets/assets_frontend/assets'
function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Edward Vincinet",
    image: assets.profile_pic,
    email: "a@gmail.com",
    phone: "1234567890",
    address :{
      line1: 'asdfgh',
      line2: 'xcvb'
    },
    gender: 'Male',
    dob: '12-12-12',
    bloodGroup: 'A+',

    emergencyContact: {
      personName: 'ZXCVB',
      personContact: '1234567',
    }
  })
  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded ml-5' src={userData.image} />
      {
        isEdit ? <input className='text-3xl ml-5 font-bold max-w-60 mt-4'  type='text' value={userData.name} onChange={(e) => setUserData(prev => ({...prev, name:e.target.value}))}/> : <p className='text-3xl ml-5 font-bold max-w-60 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none ml-5' />
      <div>
        <p className='text-black-500 underline text-2xl ml-5 mt-3 font-semibold'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ml-7'>
          <p className='font-semibold'>Email Id:</p>
          <p>{userData.email}</p>
          <p className='font-semibold'>Phone:</p>
          {
            isEdit ? <input className='max-w-50 border-red-500 border p-1 rounded bg-gray-200' type='text' value={userData.phone} onChange={(e) => setUserData(prev => ({...prev, phone:e.target.value}))}/> : <p>{userData.phone}</p>
          }
          <p className='font-semibold'>Address:</p>
          {
            isEdit ? <p>
              <input className='max-w-50 border-red-500 border p-1 rounded bg-gray-200' onChange={(e) => setUserData(prev => ({...prev, address:{...prev.address, line1: e.target.value}}))} value={userData.address.line1} type='text' />
              <br />
              <input className='max-w-50 border-red-500 border p-1 rounded bg-gray-200 mt-1.5' onChange={(e) => setUserData(prev => ({...prev, address:{...prev.address, line2: e.target.value}}))} value={userData.address.line2} type='text' />

            </p> : <p>{userData.address.line1} <br /> {userData.address.line2}</p>

          }
        </div>
      </div>
      <div>
        <p className='text-black-500 underline text-2xl ml-5 mt-3 font-semibold'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ml-5'>
          <p>Gender:</p>
          {
            isEdit ? <select className='border-red-500 border p-1 rounded bg-gray-200 max-w-50' onChange={(e) => setUserData(prev => ({...prev, gender:e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select> : <p>{userData.gender}</p>
          }
          <p>Blood Group:</p>
          {
              isEdit ? <select className='border-red-500 border p-1 rounded bg-gray-200 max-w-50' onChange={(e) => setUserData(prev => ({...prev, bloodGroup:e.target.value}))} value={userData.bloodGroup}>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select> : <p>{userData.bloodGroup}</p>
          }
          <p>Birth Date:</p>
          {
            isEdit ? <input className='border-red-500 border p-1 rounded bg-gray-200 max-w-50' onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob} type='date' /> : <p>{userData.dob}</p>
          }
        </div>
      </div>
      <div>
        <p className='text-black-500 underline text-2xl ml-5 mt-3 font-semibold'>Emergency Contact Information</p>
        
        <div className='grid grid-cols-[1fr_1fr] gap-y-2.5 mt-3 ml-5'>
          <p className='font-semibold'>Emergency Contact Person Name:</p>
          {
            isEdit ? <input className='max-w-50 border-red-500 border p-1 rounded bg-gray-200' type='text' onChange={(e) => setUserData(prev => ({...prev, emergencyContact:{...prev.emergencyContact, personName: e.target.value}}))} value={userData.emergencyContact.personName} /> : <p>{userData.emergencyContact.personName}</p>
          }
          <p className='font-semibold'>Emergency Contact Person Phone Number:</p>
          {
            isEdit ? <input className='max-w-50 border-red-500 border p-1 rounded bg-gray-200' onChange={(e) => setUserData(prev => ({...prev, emergencyContact:{...prev.emergencyContact, personContact: e.target.value}}))} type='text' value={userData.emergencyContact.personContact} /> : <p>{userData.emergencyContact.personContact}</p>
          }
        </div>
      </div>
      <div>
        {
          isEdit ? <button className='border-[2px] border-amber-400 p-3 rounded-full mb-3 font-bold bg-amber-400 hover:bg-green-500 transition-all duration-800 hover:border-green-500 ml-8' onClick={() => setIsEdit(false)}>Save Information</button> : <button className='border-[2px] border-green-500  p-3 rounded-l-full rounded-r-full mb-3 font-bold bg-green-500 hover:bg-amber-500 transition-all duration-800 hover:border-amber-500 ml-8' onClick={() => setIsEdit(true)}>Edit Information</button>
        }
      </div>
    </div>
  )
}

export default MyProfile