const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  pass: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Login", LoginSchema);
