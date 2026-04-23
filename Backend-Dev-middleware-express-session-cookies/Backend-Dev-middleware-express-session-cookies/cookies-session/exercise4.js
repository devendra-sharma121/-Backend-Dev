const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
  secret: "timeoutSecret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 20000 } // 20 sec session
}));

app.get("/", (req, res) => {
  res.send(`
    <h1>Session Active</h1>
    <script>
      setTimeout(() => {
        alert(" Your session is about to expire!");
      }, 15000); // warn at 15 sec
    </script>
  `);
});

app.listen(3000, () => console.log("Session timeout demo running"));