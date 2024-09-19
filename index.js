const express = require("express");
const db = require("./db.js");
const app = express();
const personRoutes = require("./routes/person");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World this is learning backend");
});
app.use("/", personRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`connect to port ${PORT}`);
});
