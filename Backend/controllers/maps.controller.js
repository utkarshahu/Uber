const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: 'Coordinates not found' });
  }
};


module.exports.getDistanceTime = async (req, res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { origin, destination, units } = req.query;

    const result = await mapService.getDistanceTime(origin, destination, {units});

    return res.status(200).json({
      success: true,
      message: 'Distance & Duration fetched successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getSuggestions = async (req, res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const { input } = req.query;
    const suggestions = await mapService.getSuggestions(input);
    res.status(200).json(suggestions); 

  } catch (error) {
    console.log("Error fetching suggestions:", error);
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
}
