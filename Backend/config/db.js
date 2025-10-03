const mongoose = require("mongoose");
const chalk = require("chalk");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.blueBright("Connected to Database..."));
  } catch (err) {
    console.error(chalk.red("Database connection failed:"), err);
  }
};

module.exports = connectToDB;
