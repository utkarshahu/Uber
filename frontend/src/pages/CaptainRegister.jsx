import React, { useState, useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'


const CaptainRegister = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState({})

  const { captain, setcaptain } = useContext(CaptainDataContext)

  // vehicle fields
  const [vehiclecolor, setvehicleColor] = useState("")
  const [vehicleplate, setvehiclePlate] = useState("")
  const [vehiclecapacity, setvehicleCapacity] = useState("")
  const [vehicletype, setvehicleType] = useState("")

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehiclecolor,
        plate: vehicleplate,
        capacity: vehiclecapacity,
        vehicleType: vehicletype
      }
    }

    


      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
        if(response.status===200){
          const data = response.data
          setcaptain(data.captain)
          localStorage.setItem('token',data.token)
          navigate('/captains/home')
        }
      } catch (error) {
        console.log(error.response.data)
      }

    console.log(captainData) 
    // ✅✅✅

    // Reset fields
    setEmail("")
    setFirstname("")
    setLastname("")
    setPassword("")
    setvehicleColor("")
    setvehiclePlate("")
    setvehicleCapacity("")
    setvehicleType("")
  }

  return (
    <div className='p-7 h-screen font-[F1] flex flex-col justify-between'>
      <div>
        {/* Uber logo aligned left */}
        <div className="flex justify-start">
          <img
            className="w-20 mb-6"
            src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
            alt="Uber"
          />
        </div>

        <form onSubmit={submitHandler}>
          {/* Name */}
          <h3 className='text-lg mb-2 font-[F1]'>What's your name?</h3>
          <div className='flex flex-row gap-8 mb-6'>
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              className='bg-[#eee] px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='First Name'
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              className='bg-[#eee] px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='Last Name'
            />
          </div>

          {/* Email */}
          <h3 className='text-lg mb-2 font-[F1]'>What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className='bg-[#eee] mb-6 px-4 py-2 border text-lg placeholder:text-base rounded-xl w-full'
            placeholder='e.g captain@example.com'
          />

          {/* Password */}
          <h3 className='text-lg mb-2 font-[F1]'>Enter your password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className='bg-[#eee] px-4 text-lg placeholder:text-base py-2 mb-6 border rounded-xl w-full'
            placeholder='password'
          />

          {/* Vehicle Details */}
          <h3 className='text-lg mb-2 font-[F1]'>Vehicle Details</h3>
          <div className='flex flex-row gap-6 mb-6'>
            <input
              required
              value={vehiclecolor}
              onChange={(e) => setvehicleColor(e.target.value)}
              type="text"
              className='bg-[#eee] px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='Vehicle Color'
            />
            <input
              required
              value={vehicleplate}
              onChange={(e) => setvehiclePlate(e.target.value)}
              type="text"
              className='bg-[#eee] px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='Plate Number'
            />
          </div>

          <div className='flex flex-row gap-6 mb-6'>
            <input
              required
              value={vehiclecapacity}
              onChange={(e) => setvehicleCapacity(e.target.value)}
              type="number"
              className='bg-[#eee] px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='Capacity (e.g. 4)'
            />
            <select
              required
              value={vehicletype}
              onChange={(e) => setvehicleType(e.target.value)}
              className='bg-[#eee] px-4 py-2 border text-lg rounded-xl w-1/2'
            >
              <option value="">Select Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Submit */}
          <button className='bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 mb-3 rounded-full w-full'>
            Register as Captain
          </button>
          <p className='text-center'>
            Already have an account?{" "}
            <Link to='/captains/login' className='font-[F2] text-blue-700'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className="text-[10px] leading-tight font-[F1] text-gray-500">
          By proceeding, you consent to receive calls, WhatsApp, or SMS messages,
          including those sent by automated systems, from Uber and its affiliates at the number provided.
        </p>
      </div>
    </div>
  )
}

export default CaptainRegister
