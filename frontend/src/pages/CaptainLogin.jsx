import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios  from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState({})

  const navigate = useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = {
      email: email,
      password: password
    }

   console.log("Base URL:", import.meta.env.VITE_BASE_URL);

    
    try {
      const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/captains/login`,
  captain,
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
  
);
console.log(response)

      if(response.status===200){
        const data = response.data
        console.log(data)
        setCaptainData(data.captain)
        localStorage.setItem('token',data.token)
        navigate("/captains/home")

      }
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally show error to user
    }
    setEmail('')
    setPassword('')
  }

   
  useEffect(() => {
    console.log('Captain data updated:', captainData)
  }, [captainData])  // run every time captainData changes


  return (
    <div className='p-7 h-screen font-[F1] flex flex-col justify-between'>
      <div>
        {/* Uber logo aligned left */}
        <div className="flex justify-start">
          <img
            className="w-20  mb-7"
            src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" 
            alt="Uber"
          />
        </div>

        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2 font-[F1]'>Captain Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className='bg-[#eee] mb-7 px-4 py-2 border text-lg placeholder:text-base rounded-xl w-full'
            placeholder='e.g captain@example.com'
          />

          <h3 className='text-lg mb-2 font-[F1]'>Captain Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className='bg-[#eee] px-4 text-lg placeholder:text-base py-2 mb-7 border rounded-xl w-full'
            placeholder='password'
          />

          <button className='bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 mb-7 rounded-full w-full'>Login</button>
          <p className='text-center'>New Captain? <Link to='/captains/register' className='font-[F2] text-blue-700'>Create Captain Account</Link></p>
        </form>
      </div>

      <div>
        <Link to='/users/login' className='bg-[#111] text-[#fff] flex justify-center items-center mb-5 font-[F3] px-4 text-lg py-2 rounded-full w-full'>Register as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
