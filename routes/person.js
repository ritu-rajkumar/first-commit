const express = require("express");
const user = require("./../modal/person");
const router = express.Router();
router
  .route("/")
  .post(async (req, res) => {
    try {
      const data = req.body;
      const newPersonData = new user(data);
      const savedData = await newPersonData.save();
      console.log("data saved successfully", savedData);
      res.status(200).json(savedData);
    } catch (err) {
      console.log("error while saving data :-", err);
      res.status(500).send({
        error: "internal server error",
      });
    }
  })
  .get(async (req, res) => {
    try {
      const data = await user.find();
      res.status(200).json(data);
    } catch (err) {
      console.log("Error while fetching data:-", err);
      res.status(500).send({
        error: "internal server error",
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const unfilteredId = req.params.id;
    const filteredId = unfilteredId.replace(":", "");
    try {
      const data = await user.findById(filteredId);
      res.status(200).json(data);
    } catch (err) {
      console.log(err, "Error occured while fetching data");
      res.status(500).send({ error: "internal server error" });
    }
  })
  .put(async (req, res) => {
    const unfilteredId = req.params.id;
    const filteredId = unfilteredId.replace(":", "");
    try {
      const updatedUser = await user.findByIdAndUpdate(filteredId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err, "Error occured while updating data");
      res.status(500).send({ error: "internal server error" });
    }
  })
  .delete((req, res) => {
    const unfilteredId = req.params.id;
    const filteredId = unfilteredId.replace(":", "");
    user
      .findByIdAndDelete(filteredId)
      .then((data) => {
        if (!data) {
          return res.status(404).send("User not found");
        }
        res.status(200).send(`user with id ${filteredId} deleted successfully`);
        console.log("data deleted successfully");
      })
      .catch((err) => {
        console.log(err, "Error occured while deleting data");
        res.status(500).send({ error: "internal server error" });
      });
  });
module.exports = router;
