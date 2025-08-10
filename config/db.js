const mongoose = require("mongoose")

const connectToDB = mongoose.connect("mongodb://0.0.0.0/userdata").then(()=>{
    console.log("Connected to Database....")
}).catch(err => console.log(err))

module.exports = connectToDB