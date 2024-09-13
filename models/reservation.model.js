const mongoose = require("mongoose");
const Room = require("./room.model.js");
const Guest = require("./guest.model.js");

const reservationSchema = new mongoose.Schema({
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  status: {
    type: String,
    enum: ["CONFIRMED", "CANCELLED", "PENDING"],
    default: "PENDING",
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
