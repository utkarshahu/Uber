const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        // Get token from Authorization header or cookies
        const token = 
            ( req.headers.authorization?.split(' ')[1]) || 
            req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await userModel.findOne({token:token})
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

