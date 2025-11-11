import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  // State variables
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  // Panel toggles
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  // Suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [fare, setFare] = useState({});
  const [ride, setRide] = useState(null);
  
  // Contexts
  const { socket, isConnected } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Refs for GSAP
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // Timers
  const pickupTimerRef = useRef(null);
  const destTimerRef = useRef(null);

  // ✅ Join socket room when user connects
  useEffect(() => {
    if (socket && isConnected && user && user._id) {
      console.log('👤 Joining socket with user:', user._id);
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [socket, isConnected, user]);

  // ✅ Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleRideConfirmedUser = (ride) => {
      console.log("✅ Ride confirmed for user:", ride);
      setRide(ride);
      setVehicleFound(false);
      setWaitingForDriver(true);
    };

    const handleRideStarted = (ride) => {
      console.log("🚗 Ride started, navigating to /riding");
      setRide(ride);
      setWaitingForDriver(false);
      navigate("/riding",{ state: { ride: ride } });
    };

    socket.on("ride-confirmed-user", handleRideConfirmedUser);
    socket.on("ride-started", handleRideStarted);

    return () => {
      socket.off("ride-confirmed-user", handleRideConfirmedUser);
      socket.off("ride-started", handleRideStarted);
    };
  }, [socket, navigate]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (pickupTimerRef.current) clearTimeout(pickupTimerRef.current);
      if (destTimerRef.current) clearTimeout(destTimerRef.current);
    };
  }, []);

  // Normalize API response
  const normalizeToArray = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.suggestions)) return res.suggestions;
    if (res.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  };

  // Input handlers
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    if (pickupTimerRef.current) clearTimeout(pickupTimerRef.current);
    if (value.length < 3) return setPickupSuggestions([]);

    pickupTimerRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`;
        const res = await axios.get(url, {
          params: { input: value },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setPickupSuggestions(normalizeToArray(res.data ?? res));
      } catch (err) {
        console.error("Pickup error:", err.message);
      }
    }, 300);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (destTimerRef.current) clearTimeout(destTimerRef.current);
    if (value.length < 3) return setDestinationSuggestions([]);

    destTimerRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`;
        const res = await axios.get(url, {
          params: { input: value },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setDestinationSuggestions(normalizeToArray(res.data ?? res));
      } catch (err) {
        console.error("Destination error:", err.message);
      }
    }, 300);
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: openPanel ? "70%" : "0%",
      opacity: openPanel ? 1 : 0,
      padding: openPanel ? 24 : 0,
      duration: 0.5,
    });
    gsap.to(panelCloseRef.current, {
      opacity: openPanel ? 1 : 0,
      duration: 0.4,
    });
  }, [openPanel]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [waitingForDriver]);

  // Navigation handlers
  const handleFindTrip = async () => {
    setVehiclePanel(true);
    setOpenPanel(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("📊 Fare data:", response.data);
      setFare(response.data);
    } catch (error) {
      console.error("❌ Error getting fare:", error);
      alert("Failed to get fare. Please try again.");
    }
  };

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("🚗 Ride created:", response.data);
    } catch (error) {
      console.error("❌ Error creating ride:", error);
      alert("Failed to create ride. Please try again.");
    }
  }

  // Render
  return (
    <div className="h-screen overflow-hidden relative">
      {/* ✅ FIXED: Background Map - Lower z-index, proper pointer events */}
      <div 
        className="absolute inset-0 w-full h-3/4"
        style={{ zIndex: 1 }}
      >
        <LiveTracking />
      </div>

      {/* ✅ Uber Logo - Higher z-index */}
      <img
        className="w-20 top-5 left-5 absolute"
        style={{ zIndex: 10 }}
        src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"
        alt="Uber"
      />

      {/* ✅ Main Input Panel - Even higher z-index, pointer-events auto */}
      <div 
        className="absolute flex flex-col justify-end h-screen top-0 w-full"
        style={{ 
          zIndex: 50,
          pointerEvents: 'none' // Allow map interaction
        }}
      >
        <div 
          className="h-[40%] bg-white relative p-6"
          style={{ pointerEvents: 'auto' }} // Re-enable for this panel
        >
          <h5
            ref={panelCloseRef}
            onClick={() => setOpenPanel(false)}
            className="absolute opacity-0 top-6 text-2xl font-extrabold right-6 cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h1 className="font-[F2] font-semibold text-2xl">Find a Trip</h1>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-15 w-1 left-12 top-[37%] bg-gray-900 rounded-3xl"></div>

            <input
              onClick={() => {
                setOpenPanel(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              type="text"
              placeholder="Add a pick-up location"
              className="p-3 rounded-xl bg-[#eee] bg-opacity-80 px-12 py-2 text-lg font-[F2] mt-5 w-full"
            />

            <input
              onClick={() => {
                setOpenPanel(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              type="text"
              placeholder="Enter your destination"
              className="p-3 rounded-xl mt-3 bg-[#eee] bg-opacity-80 px-12 py-2 text-lg font-[F2] w-full"
            />
          </form>

          <div className="flex items-center py-3 justify-center">
            <button
              onClick={handleFindTrip}
              className="bg-[#111] text-[#fff] font-[F3] px-4 text-lg py-2 rounded-full w-full"
            >
              Find Trip
            </button>
          </div>
        </div>

        {/* Location Search Panel */}
        <div 
          ref={panelRef} 
          className="h-0 bg-white overflow-auto"
          style={{ pointerEvents: 'auto' }}
        >
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activeField={activeField}
            setpickup={setPickup}
            setdestination={setDestination}
            setopenPanel={setOpenPanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* ✅ All panels with proper z-index and pointer-events */}
      <div
        ref={vehiclePanelRef}
        className="fixed bg-white w-full bottom-0 px-3 pt-14 py-10 shadow-2xl translate-y-full"
        style={{ zIndex: 200, pointerEvents: 'auto' }}
      >
        <VehiclePanel
          setconfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          selectVehicle={setVehicleType}
          fare={fare}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed bg-white w-full bottom-0 px-3 pt-12 py-6 shadow-2xl translate-y-full"
        style={{ zIndex: 200, pointerEvents: 'auto' }}
      >
        <ConfirmRide
          setconfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
        style={{ zIndex: 200, pointerEvents: 'auto' }}
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
        style={{ zIndex: 200, pointerEvents: 'auto' }}
      >
        <WaitingForDriver 
          ride={ride} 
          setVehicleFound={setVehicleFound}  
          setWaitingForDriver={setWaitingForDriver} 
          waitingForDriver={waitingForDriver} 
        />
      </div>
    </div>
  );
};

export default Home;
