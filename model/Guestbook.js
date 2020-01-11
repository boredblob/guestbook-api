const mongoose = require("mongoose");

const guestbookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  message: {
    type: String,
    max: 500
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Guestbook", guestbookSchema);