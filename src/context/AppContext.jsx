import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const AppContext = createContext()
import { toast } from 'react-toastify'

const AppContextProvider = (props) => {
  //whatever we  create in the value object we can access it in any component
  const currencySymbol = '₹'
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState([])
  const [accessToken, setAccessToken] = useState(localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : false)
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('userRefreshToken') ? localStorage.getItem('userRefreshToken') : false)
  const [userData, setUserData] = useState(false)
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/v1/doctor/list');

      if (data.success && Array.isArray(data.data?.doctors)) {
        setDoctors(data.data.doctors);
      } else {
        console.log(" Unexpected response format");
      }

    } catch (error) {
      console.log("Error:", error);

    }
  };
  const loadUserProfileData = async() => {
    console.log("Access token before getting user API: ",accessToken)
    if(!accessToken) return ;
    try {
      const {data} = await axios.get(backendUrl + '/api/v1/user/getuser', {headers: {
        Authorization: `Bearer ${accessToken}`
      }})
      if(data.success){
        setUserData(data.data)
      } else{
        console.log("Error")
        toast.error(data.data.message)
      }
    } catch (error) {
      console.log("Error is: ",error)
    }
  }
  useEffect(() => {
    getDoctorsData()
  }, [])
  useEffect(() => {
    if(accessToken){
      loadUserProfileData()
    } else{
      setUserData(false)
    }
  }, [accessToken])
  const value = {
    doctors, currencySymbol, getDoctorsData, accessToken, setAccessToken, refreshToken, setRefreshToken, backendUrl, userData, setUserData, loadUserProfileData
  }



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider