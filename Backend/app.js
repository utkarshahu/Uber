// 1️⃣ Express module ko import kar rahe hain
const express = require("express");
const userModel = require("./models/user")
const connection = require("./config/db")
const morgan = require("morgan")
const app = express();

app.use(express.json()); // for JSON payloads
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.static("public"))

// 2️⃣ Express application ka instance bana rahe hain

// 3️⃣ App ko bata rahe hain ki hum EJS templating engine use karenge
app.set('view engine', 'ejs');  // EJS = Embedded JavaScript templating

// 4️⃣ Ek middleware function use kar rahe hain jo har route pe chalega
// Middleware functions are functions that have access to the request and response objects
app.use((req, res, next) => {
    console.log("I am a middleware and I always run when any route runs.");
    next(); // next() call se control aage ke route handler ko pass hota hai
});

//morgam middleware-> 3rd paty middleware
app.use(morgan('dev'))
// 5️⃣ GET request ke liye "/" route banaya hai
// Jab user "/" URL pe aata hai, to index.ejs file render hoti hai
app.get("/",(req,res)=>{
    res.send("Form")
})
app.get("/register",(req,res,next)=>{
    const a= 55
    const b = 5
    console.log("Result of a + b")
    console.log(a+b);
    next()

}, (req, res) => {
    // index.ejs file ko render karte waqt name aur city data bhej rahe hain
    res.render('index', { name: "Utkarsh", city: "Tamil Naidu" });
});

app.post("/form-data", async (req,res)=>{
    
    console.log((req.body))
    const {username ,age,password} = req.body
    // console.log(username)
   const newUser = await userModel.create({
        username:username,
        age:age,
        password:password
    })
    res.send(newUser)
})

app.get("/get-users",(req,res)=>{
    userModel.find(
        {}
    ).then((users)=>{
        res.send(users)
    })
})

app.get("/update", async (req,res)=>{
    await userModel.findOneAndUpdate({
        username : "Soni Sahu"
    },{
        age:100,
    })

    res.send("Updated")
})

app.get("/delete",async (req,res)=>{
    await userModel.findOneAndDelete({
        username:"Soni Sahu",
        age:100,
    })

    res.send("User Deleted")
})

// 6️⃣ GET request ke liye "/about" route banaya hai
// Jab user "/about" URL pe aata hai, to about.ejs file render hoti hai
app.get("/about", (req, res) => {
    console.log(req.url); // current URL console pe print karega
    // about.ejs ko render karte waqt name aur profession pass kar rahe hain
    res.render('about', { name: "Aark", profession: "MD" });
});

// 7️⃣ Server ko port 3000 pe run kara rahe hain
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000"); // NOTE: http not https unless you setup SSL
});
