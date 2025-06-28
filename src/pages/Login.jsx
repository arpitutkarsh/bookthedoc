import React, { useState } from 'react'
import Captcha from '../components/Captcha'

function Login() {
 
  const [state, setState] = useState('Sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
  }

  return (
    <div>
      <form className='min-h-[80vh] flex items-center ml-5 mb-5'>
        <div className='flex flex-col gap-3 m-auto  items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>
            {state === 'Sign up' ? "Create Account" : "Welcome Back! Login"}
          </p> 
          <p>Please {state === 'Sign up' ? "Sign Up" : "Login"} to book Appointment with the best Doctors</p>
          {state === 'Sign up' ?
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-blue-600 rounded w-full p-2  mt-1' type='text' onChange={(e) => setName(e.target.value)} value={name} />
          </div> : ""
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-blue-600 rounded w-full p-2  mt-1' type='text' onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-blue-600 rounded w-full p-2  mt-1' type='passwrd' onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          {state === 'Sign up' ? <div className='w-full'><p>Phone Number</p> <input className='border border-blue-600 rounded w-full p-2  mt-1' type='text' onChange={(e) => setPhone(e.target.value)} value={phone} />  </div>: ""
          }
          
          
          

          <button onClick={onSubmitHandler} className='bg-blue-600 text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign up' ? "Create Account" : "Log In"}

        </button>
        {
          state === 'Sign up' ? <p>Already have an Account? <span onClick={() => (setState('Login'))} className='text-blue-500 underline cursor-pointer font-bold'>Login here</span></p> : 
          <p>Create a new Account? <span onClick={() => (setState('Sign up'))} className='text-blue-500 underline cursor-pointer font-bold'>Click Here!</span></p>
        }
        
        </div>
        

      </form>
    </div>
  )
}

export default Login