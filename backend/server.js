const express = require("express");
const entries = require("./data/entries");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/entries", (req, res) => {
  res.json(entries);
});

app.get("/api/entries/:id", (req, res) => {
  const entry = entries.find((e) => e._id === req.params.id);
  res.send(entry);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port - ${PORT}`));
