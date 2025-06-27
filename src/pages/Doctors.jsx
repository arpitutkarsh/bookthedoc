import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
function Doctors() {
  const {speciality} = useParams()
  console.log(speciality)
  const {doctors} = useContext(AppContext) 
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
 //here we are implementing a applyFilter function which filters out the doctor based on speciality
  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])
  
  return (
    <div>
      <p className='text-gray-600 ml-5'>Browse through the doctors specialty</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 ml-5'> 
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}  className={`w-[97vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}   className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}   className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p  onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroelogist' ? navigate('/doctors') : navigate('/doctors/Gastroelogist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 mb-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroelogist" ? "bg-indigo-100 text-black" : ""}`}>Gastroelogist</p>
        </div>
        <div className=' grid [grid-template-columns:repeat(5,_minmax(0,_1fr))] m-5  grid-cols-auto gap-4 gap-y-6 '>
          {
            filterDoc.map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-700 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='bg-blue-300' src={item.image} />
            <div className='p-4'>
              <div className='flex items-center gap-2text-sm text-center text-shadow-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors