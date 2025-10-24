const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');


router.get('/get-coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);


router.get(
  '/distance-time',
  // authMiddleware.authUser, // optional, testing ke liye hata sakte ho
   query('origin').trim().isString().isLength({ min: 3 }),
  query('destination').trim().isString().isLength({ min: 3 }),
  query('units').optional().trim().isIn(['metric', 'imperial']),
  mapController.getDistanceTime,authMiddleware.authUser
);

module.exports = router;


module.exports = router;


