const express = require("express");
const Guest = require("../models/guest.model.js");
const router = express.Router();
const auth = require("../middleware/auth.js");

router.post("/signup", async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Guest.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/guests", auth, async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).send(guests);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/guests/:id", auth, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).send("Guest not found");
    }
    res.status(200).send(guest);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/guests/:id", auth, async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!guest) {
      return res.status(404).send("Guest not found");
    }
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/guests/:id", auth, async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) {
      return res.status(404).send("Guest not found");
    }
    res.status(200).send(guest);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
