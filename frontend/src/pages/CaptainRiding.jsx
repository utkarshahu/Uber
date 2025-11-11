import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    
    // ✅ Get ride data from navigation state
    const location = useLocation()
    const { ride } = location.state || {}

    console.log("🚗 Ride data in CaptainRiding:", ride)

    useGSAP(() => {
        gsap.to(finishRidePanelRef.current, {
            transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
            duration: 0.5,
            ease: "power2.out"
        });
    }, [finishRidePanel]);

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between p-6 top-0 fixed h-14 w-screen z-20'>
                <img className='w-20' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png" alt="Uber Logo" />
                <Link to='/captains/home' className='fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className="text-2xl font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map - Full Screen */}
            <div className='h-full w-full'>
              <div 
        className="absolute inset-0 w-full h-3/4"
        style={{ zIndex: 1 }}
      >
        <LiveTracking />
      </div>
            </div>

            {/* Bottom Card - Like Image 1 (Simple & Clean) */}
            <div className='fixed bottom-0 w-full bg-white rounded-t-3xl px-6 py-4 shadow-2xl z-10'>
                
                {/* Up Arrow */}
                <div 
                    onClick={() => setFinishRidePanel(true)}
                    className="flex justify-center mb-2 cursor-pointer"
                >
                    <i className="ri-arrow-up-wide-fill text-2xl text-gray-400"></i>
                </div>

                {/* User Info */}
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                        <img 
                            className='h-16 w-16 rounded-full object-cover' 
                            src="https://media.licdn.com/dms/image/v2/D4E03AQFtgtb63oSzhw/profile-displayphoto-crop_800_800/B4EZnDFpobIIAM-/0/1759914670397?e=1762992000&v=beta&t=7deXJkkV3adj2jC0xiJcPZwrPQsZUeoE9fcB6o9sY_g" 
                            alt="User" 
                        />
                        <div>
                            <h2 className='font-[F3] text-xl font-semibold'>
                                {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
                            </h2>
                            <p className='font-[F3] text-lg  text-gray-600'>
                                {ride?.distance ? (ride.distance / 1000).toFixed(1) : '2.878'} KM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Complete Ride Button */}
                <button 
                    onClick={() => setFinishRidePanel(true)}
                    className="bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 rounded-full w-full "
                >
                    Complete Ride
                </button>
            </div>

            {/* Finish Ride Panel */}
            <div 
                ref={finishRidePanelRef} 
                className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-t-3xl shadow-2xl'
            >
                <FinishRide 
                    ride={ride} 
                    setFinishRidePanel={setFinishRidePanel} 
                />
            </div>
        </div>
    )
}

export default CaptainRiding
