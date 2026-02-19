// Task 2: Authentication & Authorization 
// You are developing a Dashboard API where only authorized users can access sensitive routes.
// Requirements
// 1. Create a login route:
// POST /login
// Accepts email & password
// Match from a predefined users list
// 2. On successful login:
// Generate a dummy token (no JWT required)
// Send it in response
// 3. Create a custom authentication middleware:
// Read token from request headers
// Allow access only if token is valid
// 4. Protected routes:
// GET /dashboard
// GET /profile
// 5. If token is missing or invalid → return 401 Unauthorized

const express = require("express");
const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application middleware
app.use((req, res, next) => {
    console.log("request url:", req.url);
    console.log("request method:", req.method);
    next();
});

// 1. Predefined Users List

const users = [
    { id: 1, email: "admin@gmail.com", password: "1234" },
    { id: 2, email: "user@gmail.com", password: "abcd" }
];

// Store generated tokens (dummy storage)
const validTokens = [];

// 2. LOGIN ROUTE: POST /login

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate dummy token
    const token = "token_" + user.id + "_" + Date.now();

    // Store token
    validTokens.push(token);

    res.json({
        message: "Login successful",
        token: token
    });
});

//3. AUTHENTICATION MIDDLEWARE

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token required" });
    }

    if (!validTokens.includes(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }

    next();
};

//4. PROTECTED ROUTES

app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to Dashboard" });
});

app.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Profile data" });
});

//ERROR HANDLING 

app.use((err, req, res, next) => {
    console.log("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
