import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CaptainDetail from '../components/CaptainDetail';
import RidePopup from '../components/RidePopup';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from '../context/SocketContext';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { socket, isConnected } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);
  
  const [locationStatus, setLocationStatus] = useState('Waiting...');
  const [currentLocation, setCurrentLocation] = useState(null);

  // Join socket room when captain connects
  useEffect(() => {
    if (socket && isConnected && captain && captain._id) {
      console.log('👮 Joining socket with captain:', captain._id);
      socket.emit("join", {
        userType: "captain",
        userId: captain._id
      });
    }
  }, [socket, isConnected, captain]);

 useEffect(() => {
  if (!socket || !isConnected) {
    console.warn("⚠️ Socket not connected");
    return;
  }

  const handleNewRide = (data) => {
    console.log("🚗 NEW RIDE RECEIVED:", data);
    setRide(data);
    setRidePopupPanel(true);
  };

  const handleRideConfirmedCaptain = (data) => {
    console.log("✅ RIDE CONFIRMED:", data);
    setRide(data);
    setConfirmRidePopupPanel(true);
    setRidePopupPanel(false);
  };

  console.log("👂 Registering socket listeners...");
  socket.on("new-ride", handleNewRide);
  socket.on("ride-confirmed-captain", handleRideConfirmedCaptain);

  return () => {
    console.log("🧹 Cleaning up socket listeners");
    socket.off("new-ride", handleNewRide);
    socket.off("ride-confirmed-captain", handleRideConfirmedCaptain);
  };
}, [socket, isConnected]);


useEffect(() => {
  if (socket && isConnected && captain && captain._id) {
    console.log('👮 Joining socket with captain:', captain._id);
    socket.emit("join", {
      userType: "captain",
      userId: captain._id
    });

    // ✅ Verify join
    socket.once("joined", (data) => {
      console.log("✅ Captain joined successfully:", data);
    });
  }
}, [socket, isConnected, captain]);


  async function confirmRide() {
    try {
      if (!ride || !captain) {
        console.error("❌ Ride or captain not found");
        return;
      }

      console.log("🔄 Confirming ride:", ride._id);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("✅ Ride confirmed:", response.data);
      
    } catch (error) {
      console.error("❌ Error confirming ride:", error);
      alert("Something went wrong while confirming ride.");
    }
  }

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out"
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out"
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className='h-screen'>
      <div className='flex items-center justify-between p-6 top-0 fixed h-14 w-screen'>
        <img 
          className='w-20 z-2' 
          src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png" 
          alt="Uber Logo" 
        />
        <Link 
          to='/captain-home' 
          className='fixed right-2 top-2 bg-white h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'
        >
          <i className="text-2xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img 
          className="w-full h-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt="map" 
        />
      </div>

      <div className='h-2/5 p-4'>
        <CaptainDetail /> 
      </div>

      <div 
        ref={ridePopupPanelRef} 
        className="fixed z-10 translate-y-full bg-white w-full bottom-0 px-3 pt-14 py-10 shadow-2xl"
      >
        <RidePopup 
          confirmRide={confirmRide} 
          ride={ride} 
          setRidePopupPanel={setRidePopupPanel} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div 
        ref={confirmRidePopupPanelRef} 
        className="fixed h-screen z-10 translate-y-full bg-white w-full bottom-0 px-3 py-6 shadow-2xl"
      >
        <ConfirmRidePopup 
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
          setRidePopupPanel={setRidePopupPanel} 
        />
      </div>
    </div>
  );
};

export default CaptainHome;
