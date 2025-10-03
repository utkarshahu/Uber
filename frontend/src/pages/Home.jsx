import React, { useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel"
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [openPanel, setopenPanel] = useState(false);
  const vehiclePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null);
  const panelCloseref = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(function () {
    gsap.to(panelRef.current, {
      height: openPanel ? "70%" : "0%",
      opacity: openPanel ? 1 : 0,
      padding: openPanel ? 24 : 0,
      duration: 0.5
    });

    gsap.to(panelCloseref.current, {
      opacity: openPanel ? 1 : 0,
      duration: 0.5
    })

  }, [openPanel]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
      duration: 0.5, // smooth animation
      ease: "power2.out"
    });
  }, [waitingForDriver]);

  


  return (
    <div className="h-screen overflow-hidden relative">
      <img
        className="w-20 top-5 left-5 absolute z-2 "
        src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"
        alt="Uber"
      />
      
      <img
        className="absolute z-1 inset-0 w-full h-full object-cover"
        src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
        alt=""
      />
      <div className="absolute flex flex-col justify-end h-screen z-3 top-0 w-full">
        <div className='h-[30%] bg-white relative p-6'>
          <h5 ref={panelCloseref} onClick={() => {
            setopenPanel(false)
          }} className='absolute opacity-0 top-6 text-2xl font-extrabold right-6'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h1 className="font-[F2] font-semibold text-2xl">Find a Trip</h1>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-15 w-1 left-12 top-[46%] bg-gray-900 rounded-3xl'></div>
            <input
              onClick={() => setopenPanel(true)}
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              type="text"
              placeholder="Add a pick-up location"
              className="p-3 rounded-xl bg-[#eee] bg-opacity-80 px-12 py-2 text-lg font-[F2] mt-5 w-full"
            />
            <input
              onClick={() => setopenPanel(true)}
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
              className="p-3 rounded-xl mt-3 bg-[#eee] bg-opacity-80 px-12 py-2 text-lg font-[F2] w-full"
            />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel setopenPanel={setopenPanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed z-10 bg-white w-full bottom-0 px-3 pt-14 py-10 shadow-2xl">
          <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setVehiclePanel={setVehiclePanel}></VehiclePanel>
      </div>
      <div ref={confirmRidePanelRef} className="fixed z-10 bg-white w-full bottom-0 px-3 pt-12 py-6 shadow-2xl">
          <ConfirmRide setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound}></ConfirmRide>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}></LookingForDriver>
      </div>
      <div ref={waitingForDriverRef}  className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
        <WaitingForDriver waitingForDriver={waitingForDriver} ></WaitingForDriver>
      </div>

    </div>
  );
};

export default Home;
