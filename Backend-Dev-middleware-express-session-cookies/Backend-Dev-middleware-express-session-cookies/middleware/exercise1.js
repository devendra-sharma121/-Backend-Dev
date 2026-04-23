const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Create log file stream
const logStream = fs.createWriteStream(
  path.join(__dirname, "requests.log"),
  { flags: "a" }
);

// Middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = `${new Date().toISOString()} | ${req.method} ${req.url} | ${res.statusCode} | ${Date.now() - start}ms\n`;
    logStream.write(log);
  });

  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello Logger!");
});

app.listen(3000, () => console.log("Server running on port 3000"));