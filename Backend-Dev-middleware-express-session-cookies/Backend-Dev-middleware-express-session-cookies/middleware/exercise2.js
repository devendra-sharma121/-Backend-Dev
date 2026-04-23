const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "mySecretKey";

// Generate token (test route)
app.get("/login", (req, res) => {
  const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: "1h" });
  res.json({ token, otp: "123456" }); // demo OTP
});

// MFA Middleware
const mfaMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const otp = req.headers["x-otp"];

  if (!token || !otp) {
    return res.status(401).json({ message: "Token & OTP required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    if (otp !== "123456") {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Protected route
app.get("/secure", mfaMiddleware, (req, res) => {
  res.send("MFA success!");
});

app.listen(3000, () => console.log("MFA server running"));