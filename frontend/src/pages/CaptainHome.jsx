import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import RidePopup from '../components/RidePopup'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";



const CaptainHome = () => {
const [ridePopupPanel, setRidePopupPanel] = useState(true)
const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
const ridePopupPanelRef = useRef(null)
const confirmRidePopupPanelRef = useRef(null)


 useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [ridePopupPanel]);
 useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [confirmRidePopupPanel]);


    return (
        <div className='h-screen'>

            <div className='flex items-center justify-between p-6 top-0 fixed h-14 w-screen '>
                <img className='w-20 z-2' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png" alt="" />
                <Link to='/home' className='  fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
                    <i className=" text-2xl font-medium ri-logout-box-r-line "></i>
                </Link>
            </div>

            <div className='h-3/5 '>
                <img className=" w-full h-full object-cover"
                    src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
                    alt="map" />
            </div>



            <div className='h-2/5  p-4'><CaptainDetail /> </div>

            <div ref={ridePopupPanelRef} className="fixed z-10 translate-y-full bg-white w-full bottom-0 px-3 pt-14 py-10 shadow-2xl">
                <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
            </div>
            <div ref={confirmRidePopupPanelRef} className="fixed h-screen z-10 translate-y-full bg-white w-full bottom-0 px-3 py-6 shadow-2xl">
                <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>


        </div>
    )
}

export default CaptainHome