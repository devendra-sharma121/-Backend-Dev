const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/testDB");

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  loginTime: Date,
  logoutTime: Date,
  lastActive: Date
});

// Middleware
userSchema.pre("save", function (next) {
  this.lastActive = new Date();
  next();
});

const User = mongoose.model("User", userSchema);

// Login route
app.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    user = new User({ username: req.body.username });
  }

  user.loginTime = new Date();
  user.lastActive = new Date();
  await user.save();

  res.send("User logged in");
});

// Logout route
app.post("/logout", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  user.logoutTime = new Date();
  await user.save();

  res.send("User logged out");
});

app.listen(3000, () => console.log("Activity tracker running"));