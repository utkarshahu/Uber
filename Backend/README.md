Got it, Utkarsh 🙌  
You’ve already written the **`/users/register`** route documentation in detail, and now you want to **add the `/users/login` route** in the same format — so that both APIs (registration + login) look consistent and clean.  

I’ll rewrite your API documentation as a **complete set**, teacher-style with easy-to-read formatting.  

***

## **User Authentication API**

### 1. **POST /users/register**
**Description:** Registers a new user, validates inputs, hashes the password securely, stores user data, and returns a **JWT token**.

***

#### **Request Body**
```jsonc
{
  "fullname": {
    "firstname": "string", // Required, min 3 chars
    "lastname": "string"   // Optional, min 3 chars if given
  },
  "email": "string",       // Required, must be valid & unique
  "password": "string"     // Required, min 6 chars
}
```

#### **Validation Rules**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `fullname.firstname` | string | ✅ | Min 3 characters |
| `fullname.lastname`  | string | ❌ | Min 3 characters (if given) |
| `email`              | string | ✅ | Valid email & unique |
| `password`           | string | ✅ | Min 6 characters |

***

#### **Responses**
**✅ 201 Created – Success**
```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**⚠ 400 Bad Request – Validation Error**
```json
{
  "errors": [
    { "msg": "First name must be at least 3 characters long.", "param": "fullname.firstname" },
    { "msg": "Invalid Email", "param": "email" }
  ]
}
```

**❌ 500 Internal Server Error**
```json
{
  "message": "An unexpected error occurred. Please try again later."
}
```

***

#### **Example Request**
```javascript
fetch('/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullname: { firstname: "John", lastname: "Doe" },
    email: "john@example.com",
    password: "password123"
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

***

### 2. **POST /users/login**
**Description:** Authenticates an existing user using email and password. If credentials are valid, returns **JWT token**.

***

#### **Request Body**
```jsonc
{
  "email": "string",       // Required, valid email format
  "password": "string"     // Required, min 6 characters
}
```

#### **Validation Rules**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `email`    | string | ✅ | Must be valid email format |
| `password` | string | ✅ | Min 6 characters |

***

#### **Responses**
**✅ 200 OK – Success**
```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**⚠ 400 Bad Request – Validation Error**
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email" },
    { "msg": "Password must be at least 6 characters long.", "param": "password" }
  ]
}
```

**❌ 401 Unauthorized – Invalid Credentials**
```json
{
  "message": "Invalid email or password"
}
```

**❌ 500 Internal Server Error**
```json
{
  "message": "An unexpected error occurred. Please try again later."
}
```

***

#### **Example Request**
```javascript
fetch('/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "john@example.com",
    password: "password123"
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

***

### **Security Notes**
- **Password Hashing:** Always hash passwords using a secure algorithm like `bcrypt`.
- **JWT Authentication:** Store the token client-side (preferably in HTTP-only cookies or secure storage) and use it for subsequent requests.
- **Error Handling:** Check for validation errors before proceeding with DB operations.
// ...existing code...

### 3. GET /rides/fare
**Description:** Estimates fare between a pickup and destination without creating a ride. The endpoint returns per-vehicle fares plus distance and duration (raw + human-readable).

#### Query Parameters
- pickup (string, required) — pickup address (min 3 chars)
- destination (string, required) — destination address (min 3 chars)
- vehicleType (string, optional) — one of `auto`, `car`, `bike`

#### Validation Rules
- `pickup` and `destination` must be non-empty strings (min length 3)
- `vehicleType` if provided must be one of `auto`, `car`, `bike`

#### Example Response (200 OK)
```json
{
  "fare": {
    "fares": { "auto": 70, "car": 193, "bike": 50 },
    "distance": { "raw": 2200, "display": "2.2 km" },
    "duration": { "raw": 420, "display": "7 mins" }
  }
}
```

#### Errors
- 400 Bad Request — validation errors:
```json
{ "errors": [ { "msg": "Pickup is required", "param": "pickup" } ] }
```
- 500 Internal Server Error — unexpected failures:
```json
{ "message": "An unexpected error occurred. Please try again later." }
```

#### Example cURL
```
curl -G "http://localhost:3000/rides/fare" \
  --data-urlencode "pickup=Gomti Nagar, Lucknow" \
  --data-urlencode "destination=Hazratganj, Lucknow" \
  --data-urlencode "vehicleType=auto"
```

#### Notes
- Implementation entry: [`ride.controller.getFare`](backend/controllers/ride.controller.js) — it validates input and calls the service.
- Calculation logic: [`ride.service.getFare`](backend/services/ride.service.js) — uses map service to compute distance/duration and returns formatted fare data.
- If you haven't added the route yet, add a GET route in [backend/routes/ride.routes.js](backend/routes/ride.routes.js) (validate query params as above).