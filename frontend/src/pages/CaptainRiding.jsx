import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

      useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [finishRidePanel]);


    return (
        <div className='h-screen relativ'>

            <div className='flex items-center justify-between p-6 top-0 fixed h-14 w-screen '>
                <img className='w-20 z-2' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png" alt="" />
                <Link to='/home' className='  fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className=" text-2xl font-medium ri-logout-box-r-line "></i>
                </Link>
            </div>

            <div className='h-4/5 '>
                <img className=" w-full h-full object-cover"
                    src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
                    alt="map" />
            </div>

            <div className='h-1/5  flex justify-around items-center   flex-col px-4  bg-gray-200 text-black' onClick={()=>{
                setFinishRidePanel(true)
            }}>
             {/* Close / Down Arrow */}
            <h5
                onClick={() => props.setRidePopupPanel(false)}
                className="  left-1/2  text-black  cursor-pointer"
            >
                <i className="ri-arrow-up-wide-fill text-2xl  font-semibold"></i>
            </h5>
                <h4 className='text-xl font-[F3]'>4KM away</h4>
                <button className="bg-black mb-6 text-white text-center active:bg-gray-600 transition-all duration-200 px-6 py-2 rounded-3xl text-lg mt-3 font-[F2] w-full shadow-sm border border-gray-500 active:scale-95">
                    Complete Ride</button>
            </div>

             <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <FinishRide setFinishRidePanel={setFinishRidePanel} ></FinishRide>
      </div>





        </div>
    )
}

export default CaptainRiding