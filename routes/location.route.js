const express = require("express");
const router = express.Router();
const HotelLocation = require("../models/location.model.js");

router.post("/hotel-locations", async (req, res) => {
  try {
    const hotelLocation = new HotelLocation(req.body);
    await hotelLocation.save();
    res.status(201).send(hotelLocation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/locations/:locationId/add-rooms", async (req, res) => {
  const { locationId } = req.params;
  const { rooms } = req.body;
  try {
    const hotelLocation = await HotelLocation.findById(locationId);
    if (!hotelLocation) {
      return res.status(404).json({ message: "HotelLocation not found" });
    }

    hotelLocation.rooms.push(...rooms);
    await hotelLocation.save();
    res.status(201).json({
      message: "Rooms added to HotelLocation successfully",
      hotelLocation,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/hotel-locations", async (req, res) => {
  try {
    const hotelLocations = await HotelLocation.find();
    res.status(200).send(hotelLocations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/hotel-locations/:id", async (req, res) => {
  try {
    const hotelLocation = await HotelLocation.findById(req.params.id).populate(
      "rooms"
    );
    if (!hotelLocation) {
      return res.status(404).send("Hotel location not found");
    }
    res.status(200).send(hotelLocation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/hotel-locations/:id", async (req, res) => {
  try {
    const hotelLocation = await HotelLocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("rooms");
    if (!hotelLocation) {
      return res.status(404).send("Hotel location not found");
    }
    res.status(200).send(hotelLocation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/hotel-locations/:id", async (req, res) => {
  try {
    const hotelLocation = await HotelLocation.findByIdAndDelete(req.params.id);
    if (!hotelLocation) {
      return res.status(404).send("Hotel location not found");
    }
    res.status(200).send(hotelLocation);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
