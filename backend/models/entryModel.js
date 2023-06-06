const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    entryContent: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("entry", entrySchema);

module.exports = Entry;
