import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserRegister = () => {
  const [firstname, setfirstname] = useState("")
  const [lasttname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [userData, setuserData] = useState({})

  const submitHandler = (e)=>{
    e.preventDefault()
    setuserData({
      firstname:firstname,
      lasttname:lasttname,
      email:email,
      password:password
    })


    setemail("")
    setfirstname("")
    setlastname("")
    setpassword("")
    
  }



  return (
    <div className='p-7 h-screen font-[F1] flex flex-col justify-between'>
      <div>
        {/* Uber logo aligned left */}
        <div className="flex justify-start">
          <img
            className="w-20  mb-6"
            src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
            alt="Uber"
          />
        </div>

        <form onSubmit={(e)=>{submitHandler(e)}} >
          <h3 className='text-lg mb-2  font-[F1]'>What's your name?</h3>
          <div className='flex flex-row gap-8 mb-6'>
            <input
              required
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              type="text"
              className='bg-[#eee]  px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='First Name'
            />
            <input
              required
               value={lasttname}
              onChange={(e) => setlastname(e.target.value)}
              type="text"
              className='bg-[#eee]  px-4 py-2 border text-lg placeholder:text-base rounded-xl w-1/2'
              placeholder='Last Name'
            />


          </div>
          <h3 className='text-lg mb-2 font-[F1]'>What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className='bg-[#eee] mb-6 px-4 py-2 border text-lg placeholder:text-base rounded-xl w-full'
            placeholder='e.g utkarshsahu180@gmail.com'
          />

          <h3 className='text-lg mb-2 font-[F1]'>Enter your password</h3>
          <input
            required
             value={password}
              onChange={(e) => setpassword(e.target.value)}
            type="password"
            className='bg-[#eee] px-4 text-lg placeholder:text-base py-2 mb-6 border rounded-xl w-full'
            placeholder='password'
          />

          <button className='bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 mb-3 rounded-full w-full'>Register</button>
          <p className='text-center' >Already have a account? <Link to='/users/login' className='font-[F2] text-blue-700' >Login here</Link></p>
        </form >
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

export default UserRegister
