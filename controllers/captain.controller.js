const captainModel = require('../models/captain.model');
const captainServices = require('../services/captain.services');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
  console.log("Request received at /captains/register");

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // check existing captain
    const isCaptainAlready = await captainModel.findOne({ email });
    if (isCaptainAlready) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // hash password
    const hashedPassword = await captainModel.hashPassword(password);

    // create captain (with try-catch in service)
    const captain = await captainServices.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      capacity: vehicle.capacity,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType
    });

    // generate token
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

  } catch (err) {
    console.error("Register Captain Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
