const Entry = require("../models/entryModel");

const asyncHandler = require("express-async-handler");

const getEntries = asyncHandler(async (req, res) => {
  const entry = await Entry.find({ user: req.user._id });
  res.json(entry);
});

const createEntry = asyncHandler(async (req, res) => {
  const { title, entryContent, mood, date } = req.body;
  if (!title || !entryContent || !mood || !date) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  } else {
    const entry = new Entry({
      user: req.user._id,
      title,
      entryContent,
      mood,
      date,
    });
    const createdEntry = await entry.save();
    res.status(201).json(createdEntry);
  }
});

const getEntryById = asyncHandler(async (req, res, next) => {
  const entry = await Entry.findById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ message: "Entry not found" });
  }
});

const updateEntryById = asyncHandler(async (req, res, next) => {
  const { title, entryContent, mood, date } = req.body;

  const entry = await Entry.findById(req.params.id);

  if (entry) {
    if (req.user._id.toString() !== entry.user.toString()) {
      res.status(401);
      throw new Error("You cannot perform this action!");
    } else {
      entry.title = title;
      entry.entryContent = entryContent;
      entry.mood = mood;
      entry.date = date;

      const updatedEntry = await entry.save();
      res.json(updatedEntry);
    }
  } else {
    res.status(404);
    throw new Error("Entry not found!");
  }
});

const deleteEntryById = asyncHandler(async (req, res, next) => {
  const entry = await Entry.findById(req.params.id);
  if (entry) {
    if (req.user._id.toString() !== entry.user.toString()) {
      res.status(401);
      throw new Error("You cannot perform this action!");
    } else {
      const user = entry.user.toString();
      await entry.deleteOne({ _id: req.params.id });
      res.json({ message: "Entry Removed" });
    }
  } else {
    res.status(404);
    throw new Error("Entry not found!");
  }
});

module.exports = {
  getEntries,
  createEntry,
  getEntryById,
  updateEntryById,
  deleteEntryById,
};
