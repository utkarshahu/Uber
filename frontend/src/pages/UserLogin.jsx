import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [userData, setuserData] = useState({})


  const submitHandler = (e)=>{
    e.preventDefault()
    // console.log(email,password)
    setuserData({
      email:email,
      password:password
    })
    
    console.log(userData)
    setemail('')
    setpassword('')
  }





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

      <form  onSubmit={(e)=>{submitHandler(e)}} >
        <h3 className='text-lg mb-2 font-[F1]'>What's your email?</h3>
        <input 
          required 
          value={email}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
          type="email" 
          className='bg-[#eee] mb-7 px-4 py-2 border text-lg placeholder:text-base rounded-xl w-full' 
          placeholder='e.g utkarshsahu180@gmail.com' 
        />
        
        <h3 className='text-lg mb-2 font-[F1]'>Enter your password</h3>
        <input 
          required 
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
          type="password" 
          className='bg-[#eee] px-4 text-lg placeholder:text-base py-2 mb-7 border rounded-xl w-full' 
          placeholder='password' 
        />
        
        <button className='bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 mb-7 rounded-full w-full'>Login</button>
        <p className='text-center' >Join a fleet? <Link to='/users/register' className='font-[F2] text-blue-700' >Create new Account</Link></p>
      </form >
      </div>

      <div>
        <Link to='/captains/login' className='bg-[#111] text-[#fff] flex justify-center items-center mb-5 font-[F3] px-4 text-lg py-2  rounded-full w-full'>Register as a Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
