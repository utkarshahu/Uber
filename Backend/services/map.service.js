// services/map.service.js
const axios = require('axios');


const GEOAPIFY_API_KEY =
process.env.GEOAPIFY_API

async function getCoordinates(text) {
  const url = 'https://api.geoapify.com/v1/geocode/search';
  const { data } = await axios.get(url, {
    params: {
      text,
      format: 'json', // JSON returns data.results[0].lat/lon
      apiKey: GEOAPIFY_API_KEY,
    },
  });

  if (!data || !data.results || data.results.length === 0) {
    throw new Error(`Location not found for: ${text}`);
  }

  const { lat, lon, formatted } = data.results[0];
  return { lat, lon, formatted };
}


module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GEOAPIFY_API;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    

    if (response.data.features && response.data.features.length > 0) {
        console.log("🛰️ Geoapify API Response:", response.data);
      const location = response.data.features[0].geometry.coordinates;
      // Geoapify returns [lng, lat] format
      return {
        lat: location[1],
        lng: location[0],
      };
    } else {
      console.error("⚠️ Geoapify Error: No results found");
      throw new Error('Unable to fetch coordinates');
    }

  } catch (error) {
    console.error("⚠️ Geoapify Request Error:", error.message);
    throw error;
  }
};



module.exports.getDistanceTime = async (origin, destination, options = {}) => {
  if (!origin || !destination) {
    throw new Error('Origin and Destination are required.');
  }

  const mode = options.mode || 'drive'; // default drive
  const units = options.units || 'metric'; // metric or imperial
  const type = options.type || 'balanced'; // balanced, short, less_maneuvers

  // 1) Geocode both ends
  const [from, to] = await Promise.all([
    getCoordinates(origin),
    getCoordinates(destination),
  ]);

  // 2) Routing
  const routingUrl = 'https://api.geoapify.com/v1/routing';
  const params = {
    waypoints: `${from.lat},${from.lon}|${to.lat},${to.lon}`, // waypoints are lat,lon
    mode,
    units, // metric/imperial
    type, // balanced/short/less_maneuvers
    format: 'geojson', // GeoJSON returns features[0].properties.{distance,time}
    apiKey: GEOAPIFY_API_KEY,
  };

  const { data } = await axios.get(routingUrl, { params });

  let distanceMeters, timeSeconds, distanceUnits;

  if (data && data.features && data.features.length > 0) {
    const props = data.features[0].properties;
    distanceMeters = props.distance;
    timeSeconds = props.time;
    distanceUnits = props.distance_units || (units === 'imperial' ? 'Miles' : 'Meters');
  } else if (data && data.results && data.results.length > 0) {
    // in case format=json is used
    const route = data.results[0];
    distanceMeters = route.distance;
    timeSeconds = route.time;
    distanceUnits = route.distance_units || (units === 'imperial' ? 'Miles' : 'Meters');
  } else {
    throw new Error('No route found.');
  }
// Dynamic Distance Formatting
let distanceHuman;
if (distanceMeters < 1000) {
  distanceHuman = `${distanceMeters.toFixed(0)} m`;
} else {
  distanceHuman = `${(distanceMeters / 1000).toFixed(2)} km`;
}

// Dynamic Duration Formatting
let durationHuman;
if (timeSeconds < 3600) {
  durationHuman = `${(timeSeconds / 60).toFixed(0)} mins`;
} else {
  durationHuman = `${(timeSeconds / 3600).toFixed(2)} hrs`;
}

  return {
    origin: from,
    destination: to,
    distance: { raw: distanceMeters, human: distanceHuman, units: distanceUnits },
    duration: { raw: timeSeconds, human: durationHuman },
    mode,
    type,
    units,
  };
};

module.exports.getSuggestions = async (input, offset = 0, limit = 10) => {
  if (!input) {
    throw new Error("Query is required for suggestions");
  }

  const apiKey = process.env.GEOAPIFY_API;

  const url = `https://api.geoapify.com/v1/geocode/autocomplete
  ?text=${encodeURIComponent(input)}
  &limit=${limit}
  &offset=${offset}
  &lang=en
  &apiKey=${apiKey}`.replace(/\s+/g, ""); // remove spaces

  try {
    const response = await axios.get(url);

    if (response.data.features?.length > 0) {
      return response.data.features.map(f => ({
        formatted: f.properties.formatted,
        landmark: f.properties.name || null,
        road: f.properties.street || null,
        city: f.properties.city || f.properties.town || f.properties.village,
        district: f.properties.district || null,
        state: f.properties.state || null,
        postcode: f.properties.postcode || null,
        country: f.properties.country || null,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      }));
    } else {
      throw new Error("No suggestions found");
    }
  } catch (error) {
    console.error("Geoapify API Request Failed:", error.message);
    throw error;
  }
};
