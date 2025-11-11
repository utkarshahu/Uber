import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { useContext,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking';



const Riding = () => {
  // ✅ Get ride data from navigation state
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket, isConnected } = useContext(SocketContext);
  const navigate = useNavigate()


  socket.on("ride-ended", () => {
    
    navigate('/home');
  });



  console.log("🚗 Ride data in Riding:", ride)

  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
        <i className="text-2xl font-medium ri-home-5-fill"></i>
      </Link>

     <div style={{ zIndex: 1 }} className='h-1/2'>
  <LiveTracking />
</div>


      <div className='h-1/2 p-4'>
        {/* Captain Info */}
        <div className='flex items-center justify-between'>
          {/* Vehicle Image */}
          <img
            className="h-12 object-contain mb-6"
            src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
            alt="Uber Vehicle"
          />
          <div className='text-right'>
            <h2 className='font-[F3] font-bold text-xl'>
              {ride?.captain?.fullname?.firstname} {ride?.captain?.fullname?.lastname}
            </h2>
            <h4 className='font-[F3] font-semibold -mt-1 -mb-1 text-lg text-gray-600'>
              {ride?.captain?.vehicle?.plate }
            </h4>
            <p className='font-[F2] capitalize  text-base text-gray-600'>
              {ride?.captain?.vehicle?.vehicleType } • {ride?.captain?.vehicle?.color }
            </p>
          </div>
        </div>

        <div className="flex flex-col pt-3 items-center">
          {/* Ride Details */}
          <div className="w-full space-y-4">
            
            {/* Destination */}
            <div className="flex items-center border-b-2 border-gray-300 pb-2">
              <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-2-fill text-2xl"></i>
              </div>
              <div className="flex flex-col ml-4 w-full">
                <h1 className="text-xl font-[F3]">Destination</h1>
                <h1 className="text-sm font-[F1] leading-5 text-gray-600">
                  {ride?.destination || 'Destination address'}
                </h1>
              </div>
            </div>

            {/* Payment */}
            <div className="flex items-center pb-2">
              <div className="bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-money-rupee-circle-fill text-2xl"></i>
              </div>
              <div className="flex flex-col ml-4 w-full">
                <h1 className="text-xl font-[F3]">&#8377; {ride?.fare}</h1>
                <p className="text-sm font-[F1] leading-5 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center pt-1'>
          <button className='bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 mb-7 rounded-full w-1/2'>
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Riding
