import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/userLogin.jsx'
import UserRegister from './pages/UserRegister.jsx'
import CaptainRegister from './pages/CaptainRegister.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import Home from './pages/Home.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'
import Riding from './pages/Riding.jsx'
import LookingForDriver from './components/LookingForDriver.jsx'

// import { UserDataContext } from './context/UserContext.jsx'


const App = () => {



  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/captains/home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path='/users/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path='/users/login' element={<UserLogin />} />
        <Route path='/users/riding' element={<Riding/>} />
        <Route path='/users/register' element={<UserRegister />} />
        <Route path='/captains/register' element={<CaptainRegister />} />
        <Route path='/captains/login' element={<CaptainLogin />} />
        
      </Routes>

    </div>
  )
}

export default App