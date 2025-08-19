import React, { useContext } from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import UserLogin from './pages/userLogin.jsx'
import UserRegister from './pages/userRegister.jsx'
import CaptainRegister from './pages/CaptainRegister.jsx'
import CaptainLogin from './pages/captainLogin.jsx'
// import { UserDataContext } from './context/UserContext.jsx'


const App = () => {



  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/users/login' element={<UserLogin/>}/>
        <Route path='/users/register' element={<UserRegister/>}/>
        <Route path='/captains/register' element={<CaptainRegister/>}/>
        <Route path='/captains/login' element={<CaptainLogin/>}/>
      </Routes>

    </div>
  )
}

export default App