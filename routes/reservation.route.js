const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation.model.js");

router.post("/reservations", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send("Reservation not found");
    }
    res.status(200).send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    reservation.confirmReservation();
    res.json(reservation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
