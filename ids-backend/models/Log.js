const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  ip_proto: Number,
  frame_len: Number,
  prediction: String,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Log", LogSchema);
