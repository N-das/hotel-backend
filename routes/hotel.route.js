const express = require("express");
const Hotel = require("../models/hotel.model.js");
const router = express.Router();

router.post("/hotels", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).send(hotels);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hotel) {
      return res.status(404).send();
    }
    res.send(hotel);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).send();
    }
    res.send(hotel);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
