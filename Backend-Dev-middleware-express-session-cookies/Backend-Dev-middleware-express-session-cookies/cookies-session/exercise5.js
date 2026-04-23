const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: "cartSecret",
  resave: false,
  saveUninitialized: true
}));

// Add to cart
app.post("/add", (req, res) => {
  const item = req.body.item;

  if (req.session.user) {
    req.session.cart = req.session.cart || [];
    req.session.cart.push(item);
    return res.send("Added to session cart");
  } else {
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    cart.push(item);
    res.cookie("cart", JSON.stringify(cart));
    return res.send("Added to cookie cart");
  }
});

// Login → migrate cart
app.post("/login", (req, res) => {
  req.session.user = { id: 1 };

  let cookieCart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  req.session.cart = [...(req.session.cart || []), ...cookieCart];

  res.clearCookie("cart");

  res.send("Logged in & cart migrated");
});

// View cart
app.get("/cart", (req, res) => {
  if (req.session.user) {
    return res.json(req.session.cart || []);
  } else {
    return res.json(req.cookies.cart ? JSON.parse(req.cookies.cart) : []);
  }
});

app.listen(3000, () => console.log("Cart system running"));