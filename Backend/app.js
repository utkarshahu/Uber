const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDB = require("./config/db")
const userRoutes = require('./routes/user.routes');
const captainRoutes = require("./routes/captain.routes")
const mapsRoutes = require("./routes/maps.routes")
const rideRoutes = require("./routes/ride.routes");

const chalk = require("chalk");

connectToDB()  .then(() => console.log(chalk.cyanBright("Database connected successfully")))
  .catch(err => console.log(chalk.redBright("Database connection failed: "), err));;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/users",userRoutes)
app.use("/captains",captainRoutes)
app.use("/maps",mapsRoutes)
app.use("/rides",rideRoutes) 


module.exports = app;
