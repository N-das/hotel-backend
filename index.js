const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Hotel = require("./models/hotel.model.js");
const HotelLocation = require("./models/location.model.js");
const Room = require("./models/room.model.js");
const Reservation = require("./models/reservation.model.js");
const Guest = require("./models/guest.model.js");
require("./db/mongoose.js");
const app = express();
app.use(express.json());
const hotelRoute = require("./routes/hotel.route.js");
const guestRoute = require("./routes/guest.route.js");
const hotelLocation = require("./routes/location.route.js");
const roomRoute = require("./routes/room.route.js");
const reservationRoute = require("./routes/reservation.route.js");

app.use(hotelRoute);
app.use(guestRoute);
app.use(hotelLocation);
app.use(roomRoute);
app.use(reservationRoute);
// Define similar routes for HotelLocation, Room, Reservation, and Guest

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
