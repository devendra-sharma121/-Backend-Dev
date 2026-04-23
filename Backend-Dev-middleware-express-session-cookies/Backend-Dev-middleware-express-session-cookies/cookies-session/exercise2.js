const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Set language
app.get("/set-lang/:lang", (req, res) => {
  res.cookie("lang", req.params.lang, { maxAge: 86400000 });
  res.send("Language set!");
});

// Home
app.get("/", (req, res) => {
  const lang = req.cookies.lang || "en";

  const messages = {
    en: "Hello",
    hi: "नमस्ते",
    fr: "Bonjour"
  };

  res.send(messages[lang]);
});

app.listen(3000, () => console.log("Language system running"));