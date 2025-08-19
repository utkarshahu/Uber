const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    try {
        const captain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        return captain;

    } catch (error) {
        console.error("Error creating captain:", error.message);
        throw new Error("Failed to create captain. Please try again.");
    }
};
 