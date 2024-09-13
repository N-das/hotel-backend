const mongoose = require("mongoose");
// const Room = require("./room.model.js");
const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "HotelLocation" },
});

const hotelLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  rooms: [roomSchema],
});

module.exports = mongoose.model("HotelLocation", hotelLocationSchema);
