# Express.js + MongoDB Project Structure - Complete Beginner GuideHey Utkarsh! Main tumhare liye pura project structure explain kar raha hun with diagrams and line-by-line code explanation. Let's start! 🚀

## Project File Structure OverviewYe diagram tumhare project ka complete structure dikhata hai. Ab main har file ko detail me explain karta hun:

## Step 1: `server.js` - Server Ko Start Karne Wali File```javascript
const http = require('http');
const app = require('./app');

// Port configuration
const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

**Line-by-line explanation:**
- `const http = require('http');` → Node.js ka built-in HTTP module import kar rahe hain
- `const app = require('./app');` → Humara Express app import kar rahe hain
- `const port = process.env.PORT || 3000;` → Port number environment variable se lenge, agar nahi mila toh 3000 use karenge
- `const server = http.createServer(app);` → HTTP server create kar rahe hain jo humara Express app use karega
- `server.listen(port, callback)` → Server ko specified port pe start kar rahe hain

**Kaam**: Ye file sirf server ko start karne ka kaam karti hai. Main logic `app.js` me hai.

## Step 2: `app.js` - Main Application Brain```javascript
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

// Create Express app instance
const app = express();

// Connect to database
connectToDB();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic test route
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Mount routes
app.use('/users', userRoutes);

// Export app
module.exports = app;
```

**Line-by-line explanation:**
- `const express = require('express');` → Express framework import kar rahe hain
- `const cors = require('cors');` → Cross-Origin Resource Sharing ke liye (frontend-backend communication)
- `const cookieParser = require('cookie-parser');` → Cookies parse karne ke liye
- `const connectToDB = require('./config/db');` → Database connection function import
- `const app = express();` → Express app ka instance create kar rahe hain
- `connectToDB();` → Database se connect ho rahe hain
- `app.use(cors());` → CORS middleware enable kar rahe hain
- `app.use(express.json());` → JSON data parse karne ke liye
- `app.use(express.urlencoded({ extended: true }));` → URL encoded data parse karne ke liye
- `app.use(cookieParser());` → Cookie parsing middleware
- `app.get('/', callback)` → Root route (testing ke liye)
- `app.use('/users', userRoutes);` → User routes mount kar rahe hain `/users` prefix ke saath

**Kaam**: Ye file Express app setup karti hai with all middleware and routes.

## Step 3: `config/db.js` - Database Connection```javascript
const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log('Database connection error:', err);
    });
}

module.exports = connectToDB;
```

**Line-by-line explanation:**
- `const mongoose = require('mongoose');` → Mongoose ODM import kar rahe hain
- `function connectToDB()` → Database connection function define kar rahe hain
- `mongoose.connect(process.env.DB_CONNECT, options)` → MongoDB se connect kar rahe hain
- `useNewUrlParser: true` → New URL string parser use karne ke liye
- `useUnifiedTopology: true` → New Server Discover and Monitoring engine use karne ke liye
- `.then()` → Successful connection pe message print karenge
- `.catch()` → Error handling

**Kaam**: MongoDB se connection establish karna.

## Step 4: `models/user.model.js` - Database Schema```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Schema Definition
const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

// Generate Auth Token Method
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

// Compare Password Method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Hash Password Static Method
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('user', userSchema);

module.exports = User;
```

**Line-by-line explanation:**
- `const userSchema = new mongoose.Schema({})` → User ka structure define kar rahe hain
- `fullName: { firstName: {}, lastName: {} }` → Nested object for full name
- `type: String, required: true` → Field type and validation
- `minlength: [3, 'error message']` → Minimum length validation
- `unique: true` → Email unique hona chahiye
- `select: false` → Password by default select nahi hoga queries me
- `userSchema.methods.generateAuthToken` → Instance method (specific user ke liye)
- `jwt.sign({ _id: this._id }, secret, options)` → JWT token generate karna
- `userSchema.methods.comparePassword` → Password compare karna
- `bcrypt.compare(plainPassword, hashedPassword)` → Password verification
- `userSchema.statics.hashPassword` → Static method (Model level function)
- `bcrypt.hash(password, saltRounds)` → Password ko hash karna

**Kaam**: Database me user ka structure define karna and password-related functions.

## Step 5: `services/user.service.js` - Database Operations```javascript
const User = require('../models/user.model');

module.exports.createUser = async ({
    firstName, lastName, email, password
}) => {
    if (!firstName || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}
```

**Line-by-line explanation:**
- `const User = require('../models/user.model');` → User model import kar rahe hain
- `module.exports.createUser = async (data) => {}` → Export kar rahe hain createUser function
- `if (!firstName || !email || !password)` → Required fields check kar rahe hain
- `throw new Error('message')` → Error throw kar rahe hain agar fields missing hain
- `await User.create(userData)` → Database me user create kar rahe hain
- `return user;` → Created user return kar rahe hain

**Kaam**: Database CRUD operations ko handle karna (Controller se separate).

## Step 6: `controllers/user.controller.js` - Request Handling```javascript
const User = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await User```shPassword(password);

    const user = await userService.create```r({
        firstName: fullName.firstName,
        lastName: fullName.lastName,```      email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}
```

**Register Function Line-by-line:**
- `const errors = validationResult(req);` → Validation errors check kar rahe hain
- `if (!errors.isEmpty())` → Agar errors hain toh 400 status return karenge
- `const { fullName, email, password } = req.body;` → Request body se data extract kar rahe hain
- `const isUserAlreadyExist = await User.findOne({ email });` → Email already exist check kar rahe hain
- `if (isUserAlreadyExist)` → Agar user already exist hai toh error return karenge
- `const hashedPassword = await User.hashPassword(password);` → Password hash kar rahe hain
- `await userService.createUser(userData)` → Service layer se user create kar rahe hain
- `const token = user.generateAuthToken();` → JWT token generate kar rahe hain
- `res.status(201).json({ token, user });` → Success response bhej rahe hain

**Login Function Line-by-line:**
- `const user = await User.findOne({ email }).select('+password');` → User find kar rahe hain password ke saath
- `if (!user)` → Agar user nahi mila toh error return karenge
- `const isMatch = await user.comparePassword(password);` → Password compare kar rahe hain
- `if (!isMatch)` → Agar password match nahi kiya toh error return karenge
- `res.cookie('token', token);` → Token ko cookie me set kar rahe hain
- `res.status(200).json({ token, user });` → Success response bhej rahe hain

## Step 7: `routes/user.routes.js` - API Endpoints```javascript
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser);

module.exports = router;
```

**Line-by-line explanation:**
- `const express = require('express');` → Express import kar rahe hain
- `const router = express.Router();` → Router instance create kar rahe hain
- `const { body } = require('express-validator');` → Validation middleware import kar rahe hain
- `router.post('/register', [validationArray], controller)` → POST route define kar rahe hain
- `body('email').isEmail()` → Email validation
- `body('fullName.firstName').isLength({ min: 3 })` → First name length validation
- `body('password').isLength({ min: 6 })` → Password length validation
- `withMessage('error message')` → Custom error message
- `userController.registerUser` → Controller function call kar rahe hain

**Kaam**: API endpoints define karna with validation rules.

## Registration Flow Diagram**Registration Process Step-by-Step:**

1. **Client Request** → User `/users/register` pe POST request bhejta hai
2. **Route Validation** → Express-validator email, name, password check karta hai
3. **Controller Processing** → Validation errors check, existing user check
4. **Password Hashing** → Bcrypt se password hash karta hai
5. **Database Save** → Service layer se user create karta hai
6. **Token Generation** → JWT token generate karta hai
7. **Response** → Success response with token bhejta hai

## Login Flow Diagram**Login Process Step-by-Step:**

1. **Client Request** → User `/users/login` pe POST request bhejta hai
2. **Route Validation** → Email aur password format check karta hai
3. **User Finding** → Database me email se user find karta hai
4. **Password Comparison** → Bcrypt se password compare karta hai
5. **Token Generation** → JWT token generate karta hai
6. **Cookie Set** → Token ko cookie me set karta hai
7. **Response** → Success response with token bhejta hai

## Environment Variables (.env file)```
PORT=3000
DB_CONNECT=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret_key_here
```

**Explanation:**
- `PORT` → Server ka port number
- `DB_CONNECT` → MongoDB connection string
- `JWT_SECRET` → JWT token signing ke liye secret key

## Package.json Dependencies```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^6.10.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "express-validator": "^6.15.0",
    "cors": "^2.8.5",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.3"
  }
}
```

## Key Concepts Summary**MVC Pattern:**
- **Model** (`user.model.js`) → Database structure
- **Controller** (`user.controller.js`) → Business logic
- **Routes** (`user.routes.js`) → API endpoints

**Security:**
- **Password Hashing** → Bcrypt se plain text password ko hash karte hain
- **JWT Tokens** → User authentication ke liye
- **Validation** → Express-validator se input validation

**Database:**
- **Mongoose** → MongoDB ke saath interact karne ke liye
- **Schema** → Data structure define karne ke liye
- **Models** → Database operations ke liye

Utkarsh, ab tumhe complete picture clear hai! Har file ka exact role pata hai aur kaise sab connected hai. Practice karte raho, questions aaye toh poochna! 🚀