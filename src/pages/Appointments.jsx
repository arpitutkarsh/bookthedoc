import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointments() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, accessToken } = useContext(AppContext);
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const bookAppointment = async () => {
    if (!accessToken) {
      toast.warn('Please Login to Book Appointment! Redirecting you to Login Page');
      setTimeout(() => {
        return navigate('/login');
      }, 3000);
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + '_' + month + '_' + year;

      const { data } = await axios.post(
        backendUrl + '/api/v1/user/appointment',
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        toast.success('Appointment Booked');
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error('Oops! Try Again Later');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error booking Appointment');
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 30; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currDate.getDate();
        let month = currDate.getMonth() + 1;
        let year = currDate.getFullYear();
        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currDate), time: formattedTime });
        }

        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        setDocSlots(prev => [...prev, timeSlots]);
      }
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className='p-4'>
        {/* Doctor Details */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <img className='bg-amber-400 w-full sm:max-w-72 rounded-lg' src={docInfo.image} />
          <div className='flex-1 border border-gray-700 rounded-lg p-8'>
            <p className='text-2xl font-medium text-gray-900 flex items-center gap-2'>
              {docInfo.name}
              <span className='relative group inline-block'>
                <img className='w-5 cursor-pointer' src={assets.verified_icon} alt='Verified' />
                <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10'>
                  Verified by BookTheDoc
                </div>
              </span>
            </p>
            <p className='text-sm text-gray-600 mt-1'>{docInfo.degree} - {docInfo.speciality}</p>
            <p className='text-sm text-gray-600 mt-2'>{docInfo.about}</p>
            <p className='text-gray-500 font-medium mt-4'>Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fee}</span></p>
          </div>
        </div>

        {/* Slot Calendar */}
        <h3 className='text-lg font-semibold text-gray-800 mt-10 mb-3 underline italic'>Choose an Appointment Date and Time</h3>
        <div className='grid grid-cols-7 gap-4'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 rounded-lg cursor-pointer shadow-sm ${
                slotIndex === index ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300'
              }`}
              key={index}
            >
              <p className='text-sm font-semibold'>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
              <p className='text-lg'>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
          
        {/* Time Slots */}
        <div className='flex flex-wrap gap-2 mt-6 mb-6'>
          
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer border transition-all ${
                item.time === slotTime ? 'bg-amber-500 text-white border-amber-500' : 'border-gray-400 text-gray-700'
              }`}
            >
              {item.time}
            </p>
          ))}
        </div>

        {/* Book Button */}
        <button onClick={bookAppointment} className='bg-amber-500 text-white font-semibold px-6 py-3 rounded-full'>
          Book Appointment with {docInfo.name}
        </button>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointments;
