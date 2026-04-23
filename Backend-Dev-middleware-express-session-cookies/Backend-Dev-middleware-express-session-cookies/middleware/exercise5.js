const express = require("express");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

app.use(express.json());

// Security middlewares
app.use(xss());
app.use(mongoSanitize());

// Test route
app.post("/data", (req, res) => {
  res.json({
    message: "Sanitized Data",
    body: req.body
  });
});

app.listen(3000, () => console.log("Sanitization server running"));