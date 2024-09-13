const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "HotelLocation" },
});

module.exports = mongoose.model("Room", roomSchema);
