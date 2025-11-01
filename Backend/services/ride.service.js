const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');

function generateOTP(num) {
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num) - 1;
  return crypto.randomInt(min, max);
}

// Examples
console.log(generateOTP(4));  // Output: 1234 (4-digit OTP)
console.log(generateOTP(6));  // Output: 567890 (6-digit OTP)
console.log(generateOTP(8));  // Output: 12345678 (8-digit OTP)



/**
 * Formats duration from seconds → "X hr Y min" or "X min"
 */
function formatDuration(durationInSeconds) {
    const minutes = Math.round(durationInSeconds / 60);
    if (minutes < 60) return `${minutes} min`;

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
}

/**
 * Formats distance from meters → "X m" or "X km"
 */
function formatDistance(distanceInMeters) {
    if (distanceInMeters < 1000) return `${distanceInMeters.toFixed(0)} m`;
    if (distanceInMeters < 100000) return `${(distanceInMeters / 1000).toFixed(1)} km`;
    return `${Math.round(distanceInMeters / 1000)} km`;
}

/**
 * Calculates estimated fare based on pickup & destination
 */
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required to calculate fare");
    }

    console.log("🚗 Calculating fare between:", pickup, "→", destination);

    // Call external service (e.g., Google Distance Matrix)
    const distanceMap = await mapService.getDistanceTime(pickup, destination);

    console.log("🗺️ Distance-Time API Result:", distanceMap);

    const distanceInMeters = distanceMap.distance.raw;
    const durationInSeconds = distanceMap.duration.raw;

    const baseFares = { auto: 25, car: 40, bike: 20 };
    const perKmRates = { auto: 12, car: 15, bike: 8 };
    const perMinuteRates = { auto: 1.5, car: 2, bike: 1 };

    const distanceInKm = distanceInMeters / 1000;
    const timeInMinutes = durationInSeconds / 60;

    const fares = {};
    for (const type of Object.keys(baseFares)) {
        fares[type] = Math.round(
            baseFares[type] +
            (distanceInKm * perKmRates[type]) +
            (timeInMinutes * perMinuteRates[type])
        );
    }

    // Log the fare breakdown clearly
    console.log("\n💰 Estimated Fare Breakdown:");
    console.log("--------------------------------------");
    console.log(`🛵 Auto: ₹${fares.auto}`);
    console.log(`🚗 Car : ₹${fares.car}`);
    console.log(`🏍️  Bike: ₹${fares.bike}`);
    console.log("--------------------------------------");
    console.log("📏 Distance:", formatDistance(distanceInMeters), "| ⏱️ Duration:", formatDuration(durationInSeconds), "\n");

    // Return formatted + raw data both
    return {
        fares,
        distance: {
            raw: distanceInMeters,
            display: formatDistance(distanceInMeters)
        },
        duration: {
            raw: durationInSeconds,
            display: formatDuration(durationInSeconds)
        }
    };
}

/**
 * Creates a new ride record in DB
 */
async function createRide({ userId, pickup, destination, vehicleType }) {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error('All ride details are required to create a ride.');
    }

    console.log("🧾 Creating new ride for user:", userId);
    console.log("📍 Pickup:", pickup);
    console.log("🏁 Destination:", destination);
    console.log("🚘 Vehicle Type:", vehicleType);

    const fareData = await getFare(pickup, destination);

    console.log("📦 Fare Data Received:", fareData);

    const ride = await rideModel.create({
        user: userId,
        pickup,
        destination,
        otp: generateOTP(6),
        vehicleType,
        fare: fareData.fares[vehicleType],
        distance: fareData.distance.raw,
        duration: fareData.duration.raw,
        distanceText: fareData.distance.display,
        durationText: fareData.duration.display
    });

    console.log("✅ Ride created successfully:", {
        _id: ride._id,
        pickup: ride.pickup,
        destination: ride.destination,
        fare: ride.fare,
        distance: ride.distance,
        duration: ride.duration
    });

    return ride;
}

module.exports = {
    getFare,
    createRide
};
