const rideService = require("../services/ride.service");
const { validationResult } = require('express-validator');
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

// ✅ CREATE RIDE
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType
    });

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("📍 Pickup coordinates:", pickupCoordinates);

    const getCaptainInTheRadius = await mapService.getCaptainInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      20
    );

    // Hide OTP from captain view
    ride.otp = "";

    // Populate user data before sending
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate('user');

   getCaptainInTheRadius.forEach(captain => {
  console.log(`📤 Sending ride to captain: ${captain._id} with socketId: ${captain.socketId}`);
  
  const sent = sendMessageToSocketId(captain.socketId, {
    event: "new-ride",
    data: rideWithUser
  });

  if (sent) {
    console.log(`✅ Ride sent successfully to ${captain.socketId}`);
  } else {
    console.error(`❌ Failed to send ride to ${captain.socketId}`);
  }
});


    console.log(`✅ Ride sent to ${getCaptainInTheRadius.length} captains`);
    return res.status(201).json(ride);

  } catch (error) {
    console.error("❌ Error creating ride:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ GET FARE
module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fareData = await rideService.getFare(pickup, destination);
    return res.status(200).json(fareData);
  } catch (error) {
    console.error("❌ Error getting fare:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ CONFIRM RIDE
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  console.log("🔄 Confirming ride:", rideId);

  try {
    const ride = await rideService.confirmRide({
      captainId: req.captain._id,
      rideId
    });

    // Send confirmation to user
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed-user",
      data: ride
    });

    // Send confirmation to captain
    sendMessageToSocketId(ride.captain.socketId, {
      event: "ride-confirmed-captain",
      data: ride
    });

    console.log("✅ Ride confirmed and notifications sent");
    return res.status(200).json(ride);

  } catch (error) {
    console.error("❌ Error confirming ride:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({ captainId: req.captain._id, rideId, otp });
    return res.status(200).json(ride);
  } catch (error) {
    console.error("❌ Error starting ride:", error.message);
    return res.status(500).json({ message: error.message });
  } 
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {  
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({ captainId: req.captain._id, rideId });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended-user",
      data: ride
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.error("❌ Error ending ride:", error.message);
    return res.status(500).json({ message: error.message });
  }
};  
