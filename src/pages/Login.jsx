import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AiOutlineInfoCircle, AiOutlineClose } from 'react-icons/ai'

function Login() {
  const { accessToken, refreshToken, setAccessToken, setRefreshToken, backendUrl } = useContext(AppContext)
  const [state, setState] = useState('Sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showNotice, setShowNotice] = useState(true)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/v1/user/register', { name, password, email, phone })
        if (data.success) {
          const { accessToken, refreshToken } = data.data
          setRefreshToken(refreshToken)
          setAccessToken(accessToken)
          localStorage.setItem("userAccessToken", accessToken)
          localStorage.setItem("userRefreshToken", refreshToken)
        } else {
          toast.error(data.message || "Error Registering User")
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/v1/user/login', { email, password })
        if (data.success) {
          const { accessToken, refreshToken } = data.data
          setAccessToken(accessToken)
          setRefreshToken(refreshToken)
          localStorage.setItem("userAccessToken", accessToken)
          localStorage.setItem("userRefreshToken", refreshToken)
        } else {
          toast.error(data.message || "Trouble logging in")
        }
      }
    } catch (error) {
      console.log("Error", error)
      toast.error("Can't perform login or register")
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, refreshToken])

  useEffect(() => {
    setShowNotice(true)
  }, [state])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-blue-300 flex items-center justify-center p-4 mb-2">

      <form onSubmit={onSubmitHandler} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Notice Box */}
        {showNotice && (
          <div className="w-full bg-blue-50 border border-blue-300 text-blue-800 rounded-md p-4 relative mb-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                <AiOutlineInfoCircle className="mt-[2px]" size={18} />
                <div className="text-sm leading-relaxed space-y-1">
                  <p><strong>Note for Users ({state === 'Sign up' ? 'Signing In' : 'Logging In'}):</strong></p>
                  {state === 'Sign up' ? (
                    <ul className="list-disc list-inside text-xs text-left">
                      <li>Use a valid email address for verification.</li>
                      <li>Choose a strong password (min. 6 characters).</li>
                      <li>Phone number is optional but helps doctors reach you faster.</li>
                      <li>Your details will remain private and secure.</li>
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside text-xs text-left">
                      <li>Enter correct credentials to log in successfully.</li>
                      <li><strong>Your account will be blocked after 3 failed attempts.</strong></li>
                      <li>If you forgot your password, contact our support.</li>
                      <li>Login tokens are encrypted and stored securely.</li>
                    </ul>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="text-blue-500 hover:text-red-500 transition"
                aria-label="Dismiss notice"
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          {state === 'Sign up' ? "Create Account" : "Welcome Back! Login"}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Please {state === 'Sign up' ? "Sign Up" : "Login"} to book appointments with the best doctors.
        </p>

        {/* Inputs */}
        {state === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-blue-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-blue-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-blue-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
        {state === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-blue-400 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium">
          {state === 'Sign up' ? "Create Account" : "Log In"}
        </button>

        {/* Toggle Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {state === 'Sign up' ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setState(state === 'Sign up' ? 'Login' : 'Sign up')}
            className="ml-1 text-blue-600 font-medium cursor-pointer hover:underline">
            {state === 'Sign up' ? "Login here" : "Sign up"}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
