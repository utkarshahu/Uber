const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userModel = require("./models/user");
const connectToDB = require("./config/db");

const app = express();
connectToDB(); // ✅ Connect to DB first

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`↪ ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Form");
});

app.get("/register", 
    (req, res, next) => {
        console.log("Sum:", 55 + 5);
        next();
    }, 
    (req, res) => {
        res.render("index", { name: "Utkarsh", city: "Tamil Nadu" });
    }
);

app.post("/form-data", async (req, res) => {
    try {
        const { username, age, password } = req.body;
        const newUser = await userModel.create({ username, age, password });
        res.status(201).send(newUser);
    } catch (e) {
        res.status(500).send("Error creating user");
    }
});

app.get("/get-users", async (req, res) => {
    const users = await userModel.find({});
    res.send(users);
});

app.get("/update", async (req, res) => {
    await userModel.findOneAndUpdate({ username: "Soni Sahu" }, { age: 100 });
    res.send("✅ User Updated");
});

app.get("/delete", async (req, res) => {
    await userModel.findOneAndDelete({ username: "Soni Sahu", age: 100 });
    res.send("🗑️ User Deleted");
});

app.get("/about", (req, res) => {
    res.render("about", { name: "Aark", profession: "MD" });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
