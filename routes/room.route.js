const express = require("express");
const router = express.Router();
const Room = require("../models/room.model.js");

router.post("/rooms", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send("Room not found");
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
