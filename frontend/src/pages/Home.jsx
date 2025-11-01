import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

// Minimal ErrorBoundary to avoid white screen
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("ErrorBoundary caught:", error, info); }
  render() {
    if (this.state.hasError) {
      const msg = (this.state.error && (this.state.error.message || String(this.state.error))) || "Unknown error";
      return (
        <div style={{ padding: 20 }}>
          <h3>Something went wrong</h3>
          <pre>{msg}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
  const [activeField, setActiveField] = useState(null); // 'pickup' | 'destination'

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  // refs for GSAP and panels
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // stable debounce timers
  const pickupTimerRef = useRef(null);
  const destTimerRef = useRef(null);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (pickupTimerRef.current) clearTimeout(pickupTimerRef.current);
      if (destTimerRef.current) clearTimeout(destTimerRef.current);
    };
  }, []);

  // normalize response helper
  const normalizeToArray = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.suggestions)) return res.suggestions;
    if (res.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  };

  // ---------- PICKUP handler (verbose logs) ----------
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    console.log("[handlePickupChange] fired. value:", value);

    // clear previous timer
    if (pickupTimerRef.current) clearTimeout(pickupTimerRef.current);

    // don't call API for too-short input
    if (value.length < 3) {
      console.log("[handlePickupChange] length < 3 — skipping API");
      setPickupSuggestions([]);
      return;
    }

    // debounce
    pickupTimerRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("[handlePickupChange] about to call API. token present? ", !!token, " token:", token ? token.slice(0, 10) + "..." : null);

        const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`;
        console.log("[handlePickupChange] GET", url, "params:", { input: value });

        const res = await axios.get(url, {
          params: { input: value },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          timeout: 8000
        });

        console.log("[handlePickupChange] API response status:", res.status);
        console.log("[handlePickupChange] API response data:", res.data);

        const list = normalizeToArray(res.data ?? res);
        console.log("[handlePickupChange] normalized list length:", list.length);

        setPickupSuggestions(list);
      } catch (err) {
        // show full error details
        console.error("[handlePickupChange] API error:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
        setPickupSuggestions([]);
      }
    }, 300);
  };

  // ---------- DESTINATION handler (verbose logs) ----------
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    console.log("[handleDestinationChange] fired. value:", value);

    if (destTimerRef.current) clearTimeout(destTimerRef.current);
    if (value.length < 3) {
      console.log("[handleDestinationChange] length < 3 — skipping API");
      setDestinationSuggestions([]);
      return;
    }

    destTimerRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`;
        console.log("[handleDestinationChange] GET", url, "params:", { input: value });

        const res = await axios.get(url, {
          params: { input: value },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          timeout: 8000
        });

        console.log("[handleDestinationChange] API response status:", res.status);
        console.log("[handleDestinationChange] API response data:", res.data);

        const list = normalizeToArray(res.data ?? res);
        console.log("[handleDestinationChange] normalized list length:", list.length);

        setDestinationSuggestions(list);
      } catch (err) {
        console.error("[handleDestinationChange] API error:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data
        });
        setDestinationSuggestions([]);
      }
    }, 300);
  };

  // ---------- GSAP (guard refs) ----------
  useGSAP(() => {
    if (!panelRef.current || !panelCloseRef.current) return;
    gsap.to(panelRef.current, {
      height: openPanel ? "70%" : "0%",
      opacity: openPanel ? 1 : 0,
      padding: openPanel ? 24 : 0,
      duration: 0.35
    });
    gsap.to(panelCloseRef.current, {
      opacity: openPanel ? 1 : 0,
      duration: 0.25
    });
  }, [openPanel]);

  useGSAP(() => {
    if (!vehiclePanelRef.current) return;
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(0)",
      duration: 0.35
    });
  }, [/* keep as needed */]);

  // ---------- render ----------
  return (
    <ErrorBoundary>
      <div className="h-screen overflow-hidden relative">
        <img className="w-20 top-5 left-5 absolute z-2" src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png" alt="Uber" />
        <img className="absolute z-1 inset-0 w-full h-full object-cover" src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" alt="" />

        <div className="absolute flex flex-col justify-end h-screen z-3 top-0 w-full">
          <div className="h-[30%] bg-white relative p-6">
            <h5 ref={panelCloseRef} onClick={() => setOpenPanel(false)} className="absolute opacity-0 top-6 text-2xl font-extrabold right-6 cursor-pointer">
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h1 className="font-[F2] font-semibold text-2xl">Find a Trip</h1>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="line absolute h-15 w-1 left-12 top-[46%] bg-gray-900 rounded-3xl"></div>

              <input
                onClick={() => { setOpenPanel(true); setActiveField("pickup"); }}
                value={pickup}
                onChange={handlePickupChange}
                type="text"
                placeholder="Add a pick-up location"
                className="p-3 rounded-xl bg-[#eee] bg-opacity-80 px-12 py-2 text-lg font-[F2] mt-5 w-full"
              />

              <input
                onClick={() => { setOpenPanel(true); setActiveField("destination"); }}
                value={destination}
                onChange={handleDestinationChange}
                type="text"
                placeholder="Enter your destination"
                className="p-3 rounded-xl mt-3 bg-[#eee] bg-opacity-80 px-12 py-2 text-lg font-[F2] w-full"
              />
            </form>
          </div>

          <div ref={panelRef} className="h-0 bg-white overflow-auto">
            <LocationSearchPanel
              suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
              activeField={activeField}
              setpickup={setPickup}
              setdestination={setDestination}
              setopenPanel={setOpenPanel}
              setVehiclePanel={() => {}}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
