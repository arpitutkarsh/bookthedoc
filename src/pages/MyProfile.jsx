import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets/assets_frontend/assets.js';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyProfile() {
  const { userData, setUserData, accessToken, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/v1/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error('Cannot update profile');
      }
    } catch (error) {
      toast.error('Error updating the profile');
    }
  };

  return userData && (
    <div className="min-h-screen bg-amber-50 py-16 px-4 sm:px-10">
      <div className="relative bg-white rounded-2xl shadow-xl border border-amber-200 max-w-4xl mx-auto pt-20 pb-10 px-6 sm:px-10 text-[15px]">
        {/* Hanging Profile Image */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          {
            isEdit ? (
              <label htmlFor="image" className="relative cursor-pointer block">
                <img className="w-32 h-32 object-cover rounded-full border-4 border-amber-300 shadow-lg opacity-90" src={image ? URL.createObjectURL(image) : userData.image} />
                <img className="w-10 absolute bottom-0 right-0" src={assets.upload_icon} />
                <input type="file" hidden id="image" onChange={(e) => setImage(e.target.files[0])} />
              </label>
            ) : (
              <img className="w-32 h-32 object-cover rounded-full border-4 border-amber-300 shadow-lg" src={userData.image} />
            )
          }
        </div>

        {/* Name */}
        <div className="text-center mt-4">
          {
            isEdit ? (
              <input type="text" className="text-3xl font-bold border-b-2 border-amber-300 focus:outline-none focus:border-amber-600 bg-transparent text-center" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
            ) : (
              <h2 className="text-3xl font-bold text-amber-800">{userData.name}</h2>
            )
          }
        </div>

        <hr className="my-6 border-amber-300" />

        {/* Contact Info */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">📞 Contact Information</h3>
          <div className="grid grid-cols-[130px_1fr] gap-y-4 gap-x-4">
            <p className="font-medium">Email:</p>
            <p>{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {
              isEdit
                ? <input type="text" className="p-2 rounded bg-amber-50 border border-amber-300" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                : <p>{userData.phone}</p>
            }

            <p className="font-medium">Address:</p>
            {
              isEdit
                ? (
                  <div className="flex flex-col gap-2">
                    <input className="p-2 rounded bg-amber-50 border border-amber-300" value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                    <input className="p-2 rounded bg-amber-50 border border-amber-300" value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                  </div>
                )
                : <p>{userData.address.line1}<br />{userData.address.line2}</p>
            }
          </div>
        </div>

        {/* Basic Info */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">🧬 Basic Information</h3>
          <div className="grid grid-cols-[130px_1fr] gap-y-4 gap-x-4">
            <p className="font-medium">Gender:</p>
            {
              isEdit
                ? (
                  <select className="p-2 rounded bg-amber-50 border border-amber-300" value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                )
                : <p>{userData.gender}</p>
            }

            <p className="font-medium">Blood Group:</p>
            {
              isEdit
                ? (
                  <select className="p-2 rounded bg-amber-50 border border-amber-300" value={userData.bloodGroup} onChange={(e) => setUserData(prev => ({ ...prev, bloodGroup: e.target.value }))}>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                )
                : <p>{userData.bloodGroup}</p>
            }

            <p className="font-medium">Birth Date:</p>
            {
              isEdit
                ? <input type="date" className="p-2 rounded bg-amber-50 border border-amber-300" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                : <p>{userData.dob}</p>
            }
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          {
            isEdit
              ? <button onClick={updateUserProfileData} className="bg-amber-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300">Save Information</button>
              : <button onClick={() => setIsEdit(true)} className="bg-green-500 hover:bg-amber-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300">Edit Information</button>
          }
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
