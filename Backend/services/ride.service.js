const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

// ✅ OTP Generator
function generateOTP(num) {
  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num) - 1;
  return crypto.randomInt(min, max);
}

// ✅ Format Duration
function formatDuration(durationInSeconds) {
  const minutes = Math.round(durationInSeconds / 60);
  if (minutes < 60) return `${minutes} min`;

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
}

// ✅ Format Distance
function formatDistance(distanceInMeters) {
  if (distanceInMeters < 1000) return `${distanceInMeters.toFixed(0)} m`;
  if (distanceInMeters < 100000) return `${(distanceInMeters / 1000).toFixed(1)} km`;
  return `${Math.round(distanceInMeters / 1000)} km`;
}

// ✅ GET FARE - MUST BE EXPORTED!
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required to calculate fare");
  }

  const distanceMap = await mapService.getDistanceTime(pickup, destination);
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

// ✅ CREATE RIDE
async function createRide({ userId, pickup, destination, vehicleType }) {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error('All ride details are required to create a ride.');
  }

  const fareData = await getFare(pickup, destination);

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

  return ride;
}

// ✅ CONFIRM RIDE
async function confirmRide({ captainId, rideId }) {
  if (!captainId || !rideId) {
    throw new Error('Captain ID and Ride ID are required to confirm a ride.');
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: 'accepted',
      captain: captainId,
    }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate('user')
    .populate('captain').select('+otp');

  if (!ride) {
    throw new Error('Ride not found.');
  }

  return ride;
}


 async function startRide ({ rideId, otp, captain }){
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, { 
        event: 'ride-started',
        data: ride
    });   
    
    

    return ride;
}


async function endRide ({ rideId, captainId }){
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captainId
    }).populate('user').populate('captain').select('+otp');  
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }   
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })    
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride
    });    
    return ride;
} 















// ✅✅✅ CRITICAL: EXPORT ALL FUNCTIONS!
module.exports = {
  getFare,
  createRide,
  confirmRide,
  generateOTP,
  formatDuration,
  formatDistance,
  startRide,
  endRide
};
