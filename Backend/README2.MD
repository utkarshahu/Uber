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








Geoapify Distance-Time Backend (Express) — Flow, Explanation, Tests[1][2]

### What you’ll build
- Ek clean 3-layer backend (Route → Controller → Service) jo origin/destination se driving distance aur travel time nikaal ke JSON me return karta hai, Geoapify Geocoding + Routing APIs ka use karke banega.[2][1]
- Input me addresses aayenge, service unhe coordinates me convert karegi, phir routing call se meters/seconds aayenge jise km/mi aur minutes me convert karke user ko diya jaayega.[3][1]

### Architecture overview
- Route ka kaam URL define karna, query params validate/sanitize karna, aur controller tak request pohchaana hota hai, taki galat input ko entry pe hi roka ja sake.[4]
- Controller HTTP logic sambhalta hai: validationResult check, try/catch, right status codes aur service ko call karke final JSON response bhejna iski zimmedaari hoti hai.[4]
- Service business logic aur external API integration rakhta hai: geocoding ke liye Geoapify se lat/lon, aur routing ke liye distance/time, phir unit conversion ke baad structured result return hota hai.[1][2]

### High-level request flow
- Client GET /distance-time par origin/destination ke saath hit karta hai aur express-validator params ko verify karta hai, jisme missing/galat value pe 400 Bad Request diya jaata hai.[4]
- Controller clean params pick karke service.getDistanceTime call karta hai aur result ko standard JSON schema me 200 ke saath return karta hai, warna error aane par 500 deta hai.[4]
- Service pehle dono addresses ko forward geocoding karke lat/lon nikaalta hai, fir routing API ko waypoints, mode, units, type ke saath call karta hai aur distance (meters) + time (seconds) lekar human-readable km/mi + mins me convert karta hai.[2][1]

```
Client
  |
  |  GET /api/maps/distance-time?origin=...&destination=...&units=metric
  v
Express Router ──> Validators (origin, destination, units)
  |
  v
Controller (getDistanceTime)
  |
  v
Service.getDistanceTime
  |-- Geocoding(origin)  --> { lat, lon }
  |-- Geocoding(dest)    --> { lat, lon }
  |-- Routing(waypoints) --> { distance(m), time(s) }
  |
  v
Convert: meters→km/mi, seconds→mins
  |
  v
Controller returns JSON 200
```

- Diagram above shows step-by-step data flow from HTTP request to final JSON response with Geoapify lookups and conversions in the service layer.[1]

### Routes: what each line does
- router.get('/get-coordinates', query('address').isString().isLength({min:3}), authMiddleware.authUser, mapController.getCoordinates): yeh endpoint user se address leta hai, validate karta hai, auth check karta hai, aur phir controller ko forward karta hai, jo service se lat/lng dila kar return karta hai.[5][4]
- router.get('/distance-time', query('origin').trim().isString().isLength({min:3}), query('destination').trim().isString().isLength({min:3}), query('units').optional().trim().isIn(['metric','imperial']), mapController.getDistanceTime): yeh main route mandatory origin/destination aur optional units validate karta hai, takki service ko hamesha clean input mile.[4]
- Ek hi module.exports = router rakho; duplicate export hata do to avoid confusion aur accidental override issues, jo maintainability ko better karta hai.[6]

### Controller: simple traffic police
- getCoordinates: validationResult(req) pehle errors check karta hai, agar sab sahi to req.query.address service.getAddressCoordinate ko deta hai aur service se aaya {lat,lng} 200 ke saath response me bhej deta hai, warna 404 “Coordinates not found” deta hai.[5][4]
- getDistanceTime: params read karta hai (origin, destination, mode, units, type), validation fail hua to 400 deta hai, warna service.getDistanceTime call karke standardized success JSON return karta hai, aur error pe 500 deta hai.[1][4]

### Service (Geocoding): address → coordinates
- getAddressCoordinate(address): Geoapify ke /v1/geocode/search ko text param ke saath hit karta hai, features.geometry.coordinates se [lng, lat] leta hai aur {lat, lng} return karta hai, empty results pe error throw karta hai.[5]
- getCoordinates(text): wahi geocoding endpoint format=json ke saath use karta hai taaki data.results.lat/lon direct mil jaye, aur yeh function routing ke liye from/to points banane me use hota hai.[2]

### Service (Routing): coordinates → distance & time
- Defaults: mode='drive', units='metric', type='balanced' rakhe gaye hain jo Geoapify routing me common/documented hain aur general driving ke liye appropriate defaults hain.[3][1]
- Parallel geocoding: Promise.all se origin/destination ko ek saath geocode karke latency kam ki jaati hai, jisse overall response faster hota hai aur user experience better hota hai.[2]
- Routing request: /v1/routing par params waypoints, mode, units, type, format=geojson ke saath axios.get karta hai; response.features.properties.distance (meters) aur time (seconds) milte hain jise aage convert kiya jaata hai.[3][1]
- Humanization: meters → km (÷1000) ya miles (÷1609.344) aur seconds → minutes (÷60) karke distanceHuman/durationHuman strings banai jaati hain, aur raw numeric values bhi response me diya jaata hai for accuracy.[3][1]

### Important coordinate order note
- GeoJSON coordinates pattern [lon, lat] hota hai, isliye jab Geoapify se geometry.coordinates aata hai to pehla value longitude hota hai aur dusra latitude hota hai, jise thik se map karna zaroori hai.[5]
- Routing waypoints ke examples docs me lat,lon order likhe jaate hain, to ensure karo ki waypoints string docs pattern ke according ho; galat order se route गलत jagah chala jaayega, isliye mismatch pe sanity test karna helpful hota hai.[1]

### Request/Response contracts
- Input (GET /distance-time): origin, destination required strings; units optional ('metric'|'imperial'); mode/type optional agar advanced routing chahiye ho, warna defaults kaam karte hain aur balanced type implicit rehta hai [4][1].  
- Output JSON: { origin:{lat,lon,...}, destination:{lat,lon,...}, distance:{raw, human, units}, duration:{raw, human}, mode, type, units }—raw values automation ke liye helpful hote hain, aur human strings UI me directly dikh sakte hain.[3][1]

### Full working examples (local)
- Health check: GET http://localhost:4000/health → { ok: true } to ensure server chal raha hai aur network sahi hai, jo debugging me pehla step hota hai.
- Coordinates: GET http://localhost:4000/api/maps/get-coordinates?address=Hazratganj%2C%20Lucknow → 200 with {lat,lng} agar Geoapify resolve kar paaya, warna 404 aayega jise controller handle karta hai.[5]
- Distance-Time basic: GET http://localhost:4000/api/maps/distance-time?origin=Gomti%20Nagar%2C%20Lucknow&destination=Hazratganj%2C%20Lucknow&units=metric → 200 with km + mins in data, jo city-level test ke liye perfect hai.[2][1]
- Distance-Time with imperial: units=imperial bhejne par human distance miles me aayegi aur raw meters same rahenge, jo US audience ke liye relevant hota hai.[1]

### Postman/cURL cheats
- Postman me Params tab use karo aur origin/destination ko plain text me daalo; Postman automatic URL-encoding karega jo special characters ko safe banata hai aur server-side parsing sahi hoti hai.[2]
- cURL example:  
  ```
  curl -G "http://localhost:4000/api/maps/distance-time" \
    --data-urlencode "origin=Gomti Nagar, Lucknow" \
    --data-urlencode "destination=Hazratganj, Lucknow" \
    --data-urlencode "units=metric"
  ```
  - Ye pattern -G ke saath query params encode karke GET request banata hai, jo spaces/commas ko sahi tarah se handle karta hai aur debugging simpler banata hai.[2]

### Validation and sanitization tips
- express-validator ka isIn exact match karta hai; agar "balanced." jaise trailing dot aayega to reject hoga, isliye trim/toLowerCase/customSanitizer ka use karke punctuation hatao phir isIn run karo.[4]
- origin/destination pe minimum length checks rakho taaki blank ya teen se chhote random strings se geocoding waste na ho aur unnecessary API calls bach sakein.[4]

### Error handling and resilience
- Validation fail pe 400 return karna sahi hai; geocoding no-result pe 404 de sakte ho aur routing failure pe 500, saath me uniform error JSON shape rakho taaki client-side handling predictable rahe.[6]
- Geo services me rate limits hote hain; 429 ayega to retry with exponential backoff/caching consider karo aur repeated geocoding results ko cache karke cost aur latency dono kamao.[7]

### Security and config
- GEOAPIFY_API key ko .env me rakho aur process.env se read karo, codebase me hardcode mat karo, kyunki keys secret hoti hain aur rotate/override karna env-based setups me easy hota hai.[1]
- Public endpoints pe excessive data exposure avoid karo; sirf necessary fields return karo aur internal debug logs ko console me rakho, response me nahi, to reduce information leakage risk.[6]

### Extend features (optional)
- Mode/type expose karke driving vs walking vs cycling routes allow kar sakte ho; iske liye validator me allowed values add karo aur service params forward karo jisse route calculation accurately tune ho.[1]
- Instruction details chahiye to routing params me details=instruction_details pass karke step-by-step maneuvers bhi le sakte ho, lekin response size/cost badh sakta hai isliye only-when-needed use karo.[1]

### Quick recap for beginners (super simple)
- Route gatekeeper hai: entry pe form-check karta hai aur sahi request ko andar bhejta hai, galat ko waapis kar deta hai clear message ke saath.[4]
- Controller traffic police hai: sahi request ko service tak pahunchata hai aur jo result milta hai use seedha user ko de deta hai with status codes.[4]
- Service scientist hai: address ko numbers (lat/lon) me badal ke route ka distance/time calculate karta hai aur clean JSON bana deta hai jo asaani se app me dikh sakta hai.[2][1]

### Appendix: Docs pointers used
- Geoapify Routing API fields distance (meters) aur time (seconds) return karta hai, jo unit conversion ke liye predictable hote hain aur format=geojson me properties me milte hain.[1]
- Geoapify Geocoding API forward search se results.lat/lon (format=json) ya geometry.coordinates [lon,lat] (GeoJSON) deta hai, jise sahi order me parse karna crucial hai.[5][2]

[1](https://apidocs.geoapify.com/docs/routing/)
[2](https://apidocs.geoapify.com/docs/geocoding/forward-geocoding/)
[3](https://www.geoapify.com/tutorial/how-to-use-route-directions-api/)
[4](https://express-validator.github.io/docs/6.7.0/sanitization-chain-api/)
[5](https://apidocs.geoapify.com/docs/geocoding/api/)
[6](https://dev.to/apidna/api-error-handling-techniques-and-best-practices-20c5)
[7](https://www.geoapify.com/how-to-avoid-429-too-many-requests-with-api-rate-limiting/)



Ah, perfect! 😄 Let’s make this **super simple**, jaise 2nd class ke bacche ko samjha rahe ho, Utkarsh.

---

### Imagine a **magic map robot** 🗺️🤖

1. **You ask it a question:**
   “Hey robot, kitna door hai **home** se **school** aur kitna time lagega car me?”

2. **Robot has 3 helpers inside it:**

   * **Gatekeeper (Route):**
     Ye helper pehla check karta hai:

     * Tumne origin (home) aur destination (school) diya hai ya nahi?
     * Tumne galat spelling to nahi likhi?
       Agar sab sahi hai, ye request aage bhejta hai. Agar galat hai, robot turant “Error! Please fix” bol deta hai.

   * **Traffic Police (Controller):**
     Ye helper request ko samajhta hai aur phir **Service helper** ko deta hai.

     * Agar service ne sahi answer diya → Controller aapko JSON me batata hai: “Distance 5 km, Time 15 mins”
     * Agar kuch gadbad hua → Controller aapko 500 ya error ka message deta hai.

   * **Scientist (Service):**
     Ye sabse intelligent helper hai 🧠. Kaam ye karta hai:

     1. Pehle **home aur school ke addresses ko numbers me convert** karta hai (latitude & longitude).
     2. Fir **magic route formula** se distance (meters) aur time (seconds) calculate karta hai.
     3. Phir numbers ko baccho ke samajhne layak **km aur mins** me convert karta hai.

---

### Step-by-step flow (simple version)

```
You (client)
   |
   |  "Home se School kitna door?" 
   v
Gatekeeper (Route)
   |
   |  Check kar liya names sahi hain ya nahi
   v
Traffic Police (Controller)
   |
   |  Forward karta hai Service ko
   v
Scientist (Service)
   |-- Home aur School ka address → lat/lon
   |-- Calculate karta hai distance aur time
   |-- Convert karta hai km aur mins me
   v
Traffic Police (Controller)
   |
   |  Returns: "Distance = 5 km, Time = 15 mins"
   v
You (Client)
```

---

### Example in real life

* Origin = **Home**
* Destination = **School**
* Units = **metric** (km)

Robot will tell you:

```json
{
  "distance": "5 km",
  "time": "15 mins"
}
```

* Agar tum `imperial` bolo → miles me distance milega.
* Agar address galat bolo → robot turant “Error! Fix it!” bol dega.

---

### Bacche ko yaad rakhne ke liye shortcut

* **Route = Gatekeeper → entry check**
* **Controller = Traffic Police → handle request & response**
* **Service = Scientist → do magic calculations**

---

Agar chaho, main isko **ek chhota cartoon diagram** bhi bana doon jo 2nd class ke bacche ko **visual way me** samajh aaye.

Kya mai bana doon?
