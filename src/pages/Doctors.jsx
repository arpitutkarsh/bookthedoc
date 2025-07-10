import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

function Doctors() {
  const { speciality } = useParams();
  const specialityList = [
    'General physician', 'Gynecologist', 'Dermatologist', 'Pediatrician',
    'Neurologist', 'Gastroenterologist', 'Cardiologist', 'Dentist',
    'Ophthalmologist', 'ENT Specialist', 'Nephrologist', 'Radiologist',
    'Psychiatrist', 'Oncologist', 'Orthopedic Surgeon', 'General Surgeon',
    'Family Medicine', 'Urologist', 'Endocrinologist', 'Immunologist'
  ];

  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600 ml-5'>Browse through the doctor's specialty</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 ml-5 mb-2'>
        {/* Sidebar for Speciality Filter */}
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          {specialityList.map((item) => (
            <p
              key={item}
              onClick={() =>
                speciality === item
                  ? navigate('/doctors')
                  : navigate(`/doctors/${encodeURIComponent(item)}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === item ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className='grid [grid-template-columns:repeat(5,_minmax(0,_1fr))] m-5 grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-700 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={index}
            >
              <img className='bg-amber-400 w-full object-cover' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 mb-1 text-sm'>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <p className={`${item.available ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {item.available ? 'Available' : 'Not Available'}
                  </p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
