const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test-mongodb";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // Fires when the connection is successfully opened
  console.log("Connected to MongoDB");
});
module.export = db;
