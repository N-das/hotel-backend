const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 10,
  },
  type: {
    type: String,
    enum: ["Guest", "Employee"],
    default: "Guest",
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    validate(value) {
      if (value.includes("password") || value.includes("Password")) {
        throw new Error("add more sensitive password");
      }
    },
  },
});

guestSchema.statics.findByCredentials = async (email, password) => {
  const guest = await Guest.findOne({ email });
  if (!guest) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, guest.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }
  return guest;
};

guestSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

guestSchema.methods.generateAuthToken = async function () {
  const guest = this;
  const token = jwt.sign({ _id: guest._id }, "qwertyuiop");

  console.log(token);
  return token;
};

const Guest = mongoose.model("usertypes", guestSchema);
module.exports = Guest;
