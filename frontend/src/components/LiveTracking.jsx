import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'remixicon/fonts/remixicon.css';

// ✅ Location Pin Icon
const locationPinIcon = new L.DivIcon({
  className: 'location-pin-marker',
  html: `
    <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
      <i class="ri-map-pin-3-fill" style="
        font-size: 40px; 
        color: #000000;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      "></i>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ✅ Map Controller
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.flyTo(center, zoom || 15, {
        duration: 1.2,
        easeLinearity: 0.5
      });
    }
  }, [center, map, zoom]);

  return null;
}

const LiveTracking = () => {
  const [livePosition, setLivePosition] = useState(null);
  const [mapCenter, setMapCenter] = useState([26.8467, 80.9462]); // Lucknow default
  const [zoom, setZoom] = useState(15);
  const watchIdRef = useRef(null);

  // ✅ Start Location Tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = [latitude, longitude];
        
        setLivePosition(newPos);
        
        // Auto-center on first location
        if (!livePosition) {
          setMapCenter(newPos);
        }
      },
      (error) => {
        console.error("❌ Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ✅ Recenter Handler
  const handleRecenter = () => {
    if (livePosition) {
      setMapCenter([...livePosition]);
      setZoom(16);
    }
  };

  if (!import.meta.env.VITE_GEOAPIFY_API_KEY) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f3f4f6',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div>
          <h3>⚠️ GeoApify API Key Missing</h3>
          <p>Please add VITE_GEOAPIFY_API_KEY to your .env file</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      
      {/* ✅ Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`}
          maxZoom={20}
        />

        <MapController center={mapCenter} zoom={zoom} />

        {/* ✅ Radius Circle */}
        {livePosition && (
          <Circle
            center={livePosition}
            radius={300}
            pathOptions={{
              color: '#000000',
              fillColor: '#000000',
              fillOpacity: 0.08,
              weight: 2,
              opacity: 0.6
            }}
          />
        )}

        {/* ✅ Your Location Marker */}
        {livePosition && (
          <Marker position={livePosition} icon={locationPinIcon} />
        )}
      </MapContainer>

      {/* ✅ TOP RIGHT CONTROLS */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        
        {/* Zoom Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }}>
          <button
            onClick={() => setZoom(prev => Math.min(prev + 1, 20))}
            style={{
              background: 'white',
              width: '40px',
              height: '40px',
              border: 'none',
              borderBottom: '1px solid #e0e0e0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            <i className="ri-add-large-line" style={{ fontSize: '20px', color: '#000000', fontWeight: 'bold' }}></i>
          </button>

          <button
            onClick={() => setZoom(prev => Math.max(prev - 1, 1))}
            style={{
              background: 'white',
              width: '40px',
              height: '40px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            <i className="ri-subtract-line" style={{ fontSize: '20px', color: '#000000', fontWeight: 'bold' }}></i>
          </button>
        </div>

        {/* Recenter Button */}
        <button
          onClick={handleRecenter}
          disabled={!livePosition}
          style={{
            background: livePosition ? 'white' : '#f5f5f5',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            cursor: livePosition ? 'pointer' : 'not-allowed',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            opacity: livePosition ? 1 : 0.5
          }}
          onMouseEnter={(e) => livePosition && (e.target.style.background = '#f5f5f5')}
          onMouseLeave={(e) => e.target.style.background = livePosition ? 'white' : '#f5f5f5'}
        >
          <i className="ri-focus-3-line" style={{ 
            fontSize: '22px', 
            color: livePosition ? '#000000' : '#999999'
          }}></i>
        </button>
      </div>

      {/* ✅ CSS */}
      <style>{`
        .location-pin-marker {
          background: transparent !important;
          border: none !important;
        }

        .leaflet-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default LiveTracking;
