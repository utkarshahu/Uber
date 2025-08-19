const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

const blackListTokenModel = require("../models/blacklistToken.model")
const captainModel = require("../models/captain.model");


module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from Authorization header or cookies
        const token = 
            ( req.headers.authorization?.split(' ')[1]) || 
            req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await blackListTokenModel.findOne({token:token})
        if(isBlacklisted){
            return res.status(400).json({message:"Unauthorized"})
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID in token
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Move to next middleware or route handler
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}