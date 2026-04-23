const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());

app.use(session({
  secret: "adminSecret",
  resave: false,
  saveUninitialized: true
}));

// Login
app.post("/login", (req, res) => {
  const { username } = req.body;

  // Dummy roles
  const role = username === "admin" ? "admin" : "user";

  req.session.user = { username, role };
  res.send("Logged in");
});

// Auth middleware
const isAuth = (req, res, next) => {
  if (!req.session.user) return res.status(401).send("Login required");
  next();
};

// Role middleware
const isAdmin = (req, res, next) => {
  if (req.session.user.role !== "admin") {
    return res.status(403).send("Admin only");
  }
  next();
};

// Admin panel
app.get("/admin", isAuth, isAdmin, (req, res) => {
  res.send("Welcome Admin!");
});

app.listen(3000, () => console.log("Admin panel running"));