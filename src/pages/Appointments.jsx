import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'

function Appointments() {
  //in the url we have a doctor id so we have to use that doctor id and store that also
  const {docId} = useParams()
  const {doctors, currencySymbol} = useContext(AppContext)
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  //now we have to find the particular doctor using docID fr that lets create an arrow function
  const fetchDOcInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    //now we have to create an state variable in which we will save docInfo
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async() => {
    setDocSlots([])

    //getting current date
    let today = new Date()

    for(let i = 0; i < 7; i++){
      let currDate = new Date(today)
      currDate.setDate(today.getDate() + i)

      //setting end time
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      if(today.getDate() === currDate.getDate()){
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10)
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currDate.setHours(10)
        currDate.setMinutes(0)
      }
      let timeSlots = []
      while(currDate < endTime){
        let formattedTIme = currDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        //adding slots to timeSLots
        timeSlots.push({
          datetime: new Date(currDate),
          time: formattedTIme
        })
        //incrementing time by 30 minutes
        currDate.setMinutes(currDate.getMinutes()+30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }
  //so we have to run this function whenever our page gets loaded or reloaded
  useEffect(() => {
    fetchDOcInfo()
  }, [docId, doctors])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);

  }, [docSlots])
  return docInfo && (
    <div>
      {/* -------------DOCTOR DETAILS -------------------------- */}
      <div className='flex flex-col sm:flex-row gap-4 ml-5'> 
       <div>
        <img className='bg-amber-400 w-full sm:max-w-72 rounded-lg' src={docInfo.image} />
       </div>
       <div className='flex-1 border border-gray-700 rounded-lg p-8 py-7 mr-5 sm:mt-0'>
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} /></p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p >{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
        </div>
        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} /></p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>

       </div>
      </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full mt-4 overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 mb-3 rounded-full cursor-pointer ${slotIndex === index ? 'bg-amber-500 text-white' : 'border border-gray-800'}`} key={index}>
                <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 mb-6'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-amber-400 text-black font-semibold' : 'text-red-900 border border-amber-700 border-2px'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-amber-400 text-sm font-semibold px-14 py-3 rounded-full my-6'>Book an Appointment with {docInfo.name}</button>

      </div>
      <RelatedDoctors docId = {docId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointments