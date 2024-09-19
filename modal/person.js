const mongoose = require("mongoose");
const personSchma = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  work: {
    require: true,
    type: String,
    enum: ["Waiter", "Manager", "Accountant"],
  },
  Mobile: {
    type: String,
    require: true,
  },
});
const user = mongoose.model("person", personSchma);
module.exports = user;
