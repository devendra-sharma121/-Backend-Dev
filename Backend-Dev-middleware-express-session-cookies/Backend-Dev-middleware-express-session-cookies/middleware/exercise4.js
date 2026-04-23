const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/testDB");

// Schema
const schema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, default: false }
});

// Soft delete method
schema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

// Auto-filter middleware
schema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

const Item = mongoose.model("Item", schema);

// Create
app.post("/add", async (req, res) => {
  const item = await Item.create({ name: req.body.name });
  res.json(item);
});

// Soft delete
app.delete("/delete/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  await item.softDelete();
  res.send("Soft deleted");
});

// Get all (auto filtered)
app.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.listen(3000, () => console.log("Soft delete server running"));