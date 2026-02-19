const express = require("express");
const app = express();

app.set("view engine", "ejs");

// form data read karne ke liye
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index2");
});

// Form submit hone ke baad
app.post("/greet", (req, res) => {
    const username = req.body.username;
    res.render("result", { name: username });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
