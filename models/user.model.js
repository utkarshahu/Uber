const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
            minlength: [3, "First name must be at least 3 charecters long."]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 charecters long."]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
        },
        password: {
            type: String,
            require: true,
            select:false, 
        },
        socketId: {
            type: String,

        }
    }
})

userSchema.method.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id} ,process.env.JWT_SECRET);
    return token
}

userSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('user', userSchema)

module.exports = userModel;